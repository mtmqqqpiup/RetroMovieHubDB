from dotenv import load_dotenv
import os
import requests
from flask import Flask, jsonify, render_template, request, send_from_directory
from model import get_top_10_newest_movies, get_movie_by_title, get_recommendations_by_genres

load_dotenv()
app = Flask(__name__)

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
POSTER_FOLDER = os.getenv("POSTER_FOLDER", r'C:\Users\quanm\RetroHubMovies\posters')

@app.route('/ngoai/posters/<filename>')
def serve_external_posters(filename):
    return send_from_directory(POSTER_FOLDER, filename)

def get_tmdb_poster(movie_title):
    try:
        url = "https://api.themoviedb.org/3/search/movie"
        params = {"api_key": TMDB_API_KEY, "query": movie_title, "language": "vi-VN"}
        response = requests.get(url, params=params, timeout=5)
        response.raise_for_status()
        data = response.json()

        results = data.get('results')
        if results and isinstance(results, list):
            poster_path = results[0].get('poster_path')
            if poster_path:
                return f"https://image.tmdb.org/t/p/w500{poster_path}"
    except Exception as e:
        print("TMDB error:", e)

    return "/static/images/logo.png"

def get_poster_url(movie_id, title):
    local_filename = f"{movie_id}.jpg"
    local_file_path = os.path.join(POSTER_FOLDER, local_filename)

    if os.path.exists(local_file_path):
        return f"/ngoai/posters/{local_filename}"

    if TMDB_API_KEY:
        return get_tmdb_poster(title)

    return "/static/images/logo.png"

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/api/latest', methods=['GET'])
def api_newest_movies():
    try:
        db_movies = get_top_10_newest_movies()
    except Exception as exc:
        print(f"Lỗi khi lấy phim mới nhất: {exc}")
        return jsonify([])

    formatted_movies = []

    for movie in db_movies:
        movie_id = movie.get('MovieID')
        title = movie.get('Title') or 'Phim mới'
        release_date = movie.get('ReleaseDate') or 'Đang cập nhật'
        poster_url = get_poster_url(movie_id, title)

        formatted_movies.append({
            "id": movie_id,
            "title": title,
            "poster_url": poster_url,
            "release_date": release_date
        })

    return jsonify(formatted_movies)

@app.route('/api/search', methods=['GET'])
def api_search_movies():
    query_text = request.args.get('query', '').strip()
    if not query_text:
        return jsonify({"movie": None, "suggestions": []})

    try:
        movie = get_movie_by_title(query_text)
    except Exception as exc:
        print(f"Lỗi khi tìm phim: {exc}")
        return jsonify({"movie": None, "suggestions": []})

    if not movie:
        return jsonify({"movie": None, "suggestions": []})

    try:
        suggestions = get_recommendations_by_genres(movie['MovieID'], min_shared_genres=1, limit=50)
    except Exception as exc:
        print(f"Lỗi khi lấy gợi ý cùng thể loại: {exc}")
        suggestions = []

    formatted_movie = {
        "id": movie['MovieID'],
        "title": movie['Title'],
        "release_date": movie['ReleaseDate'],
        "genres": movie['GenreIDs'],
        "poster_url": get_poster_url(movie['MovieID'], movie['Title'])
    }

    formatted_suggestions = []
    for suggestion in suggestions:
        formatted_suggestions.append({
            "id": suggestion['MovieID'],
            "title": suggestion['Title'],
            "poster_url": get_poster_url(suggestion['MovieID'], suggestion['Title']),
            "release_date": suggestion['ReleaseDate'],
            "shared_genres": suggestion['SharedGenres']
        })

    try:
        db_latest = get_top_10_newest_movies()
    except Exception as exc:
        print(f"Lỗi khi lấy phim mới nhất: {exc}")
        db_latest = []

    formatted_latest = []
    for m in db_latest:
        formatted_latest.append({
            "id": m.get('MovieID'),
            "title": m.get('Title'),
            "release_date": m.get('ReleaseDate'),
            "poster_url": get_poster_url(m.get('MovieID'), m.get('Title'))
        })

    return jsonify({"movie": formatted_movie, "suggestions": formatted_suggestions, "latest": formatted_latest})

@app.route('/movie/<int:movie_id>', methods=['GET'])
def movie_page(movie_id):
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)