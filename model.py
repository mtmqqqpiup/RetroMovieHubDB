import dotenv
import pyodbc
import os
from dotenv import load_dotenv

# Đọc file .env
load_dotenv()

def get_db_connection():
    conn_str = (
        f"Driver={{{os.getenv('DB_DRIVER')}}};"
        f"Server={os.getenv('DB_SERVER')};"
        f"Database={os.getenv('DB_NAME')};"
        f"Trusted_Connection={os.getenv('DB_TRUSTED_CONNECTION')};"
    )
    return pyodbc.connect(conn_str)

def get_top_10_newest_movies():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    query = """
        SELECT TOP 10 MovieID, MovieName, ReleaseDate 
        FROM Movies 
        WHERE ReleaseDate IS NOT NULL
        ORDER BY ReleaseDate DESC
    """
    
    cursor.execute(query)
    
    movies = []
    for row in cursor.fetchall():
        movies.append({
            "MovieID": row.MovieID,
            "Title": row.MovieName,
            "ReleaseDate": row.ReleaseDate.strftime('%d-%m-%Y') if row.ReleaseDate else None
        })
        
    cursor.close()
    conn.close()
    return movies

def get_movie_by_title(query_text):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    sql = """
        SELECT TOP 1 MovieID, MovieName, ReleaseDate
        FROM Movies
        WHERE MovieName LIKE ?
        ORDER BY ReleaseDate DESC
    """
    cursor.execute(sql, '%' + query_text + '%')
    row = cursor.fetchone()
    if not row:
        cursor.close()
        conn.close()
        return None

    movie_id = row.MovieID
    cursor.execute("SELECT GenreID FROM Movies_Genres WHERE MovieID = ?", movie_id)
    genres = [genre_row.GenreID for genre_row in cursor.fetchall()]

    movie = {
        "MovieID": movie_id,
        "Title": row.MovieName,
        "ReleaseDate": row.ReleaseDate.strftime('%d-%m-%Y') if row.ReleaseDate else None,
        "GenreIDs": genres
    }

    cursor.close()
    conn.close()
    return movie

def get_recommendations_by_genres(movie_id, min_shared_genres=2, limit=10):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        limit_value = int(limit)
    except (TypeError, ValueError):
        limit_value = 10
    limit_value = max(1, min(limit_value, 50))

    sql = f"""
        SELECT TOP {limit_value} m.MovieID, m.MovieName, m.ReleaseDate, COUNT(*) AS SharedGenres
        FROM Movies_Genres mg1
        JOIN Movies_Genres mg2 ON mg1.GenreID = mg2.GenreID
        JOIN Movies m ON m.MovieID = mg2.MovieID
        WHERE mg1.MovieID = ? AND mg2.MovieID != ?
        GROUP BY m.MovieID, m.MovieName, m.ReleaseDate
        HAVING COUNT(*) >= ?
        ORDER BY SharedGenres DESC, m.ReleaseDate DESC
    """

    cursor.execute(sql, movie_id, movie_id, min_shared_genres)
    results = []
    for row in cursor.fetchall():
        results.append({
            "MovieID": row.MovieID,
            "Title": row.MovieName,
            "ReleaseDate": row.ReleaseDate.strftime('%d-%m-%Y') if row.ReleaseDate else None,
            "SharedGenres": row.SharedGenres
        })

    cursor.close()
    conn.close()
    return results