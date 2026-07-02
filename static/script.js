const translations = {
    vi: {
        currentLang: 'Tiếng Việt',
        pageTitle: 'Retro Movie Hub',
        headerLogoAlt: 'Logo của Retro Movie Hub',
        searchPlaceholder: 'Nhập tên phim...',
        movieTheater: 'Phim Chiếu Rạp',
        series: 'Phim Bộ',
        movieSingle: 'Phim Lẻ',
        genre: 'Thể Loại',
        country: 'Quốc Gia',
        login: 'Đăng nhập',
        noRecommendations: 'Không tìm thấy phim hoặc không có gợi ý',
        watchNow: 'XEM NGAY',
        genresPrefix: 'Thể loại: ',
        langEnglish: 'English',
        langKorean: 'Tiếng Hàn',
        langJapanese: 'Tiếng Nhật',
        langChinese: 'Tiếng Trung',
        langVietnamese: 'Tiếng Việt',
        NewestMovies: 'Phim mới nhất',
        ListTop10: 'Top 10 phim cập nhật gần đây, mượt mà trên mọi thiết bị.',
        ShowAll: 'Xem tất cả',
    },
    en: {
        currentLang: 'English',
        pageTitle: 'Retro Movie Hub',
        headerLogoAlt: 'Retro Movie Hub Logo',
        searchPlaceholder: 'Enter movie name...',
        movieTheater: 'Theatrical Movie',
        series: 'Series',
        movieSingle: 'Movie',
        genre: 'Category',
        country: 'Country',
        login: 'Login',
        noRecommendations: 'No movie found or no recommendations',
        watchNow: 'WATCH NOW',
        genresPrefix: 'Genres: ',
        langEnglish: 'English',
        langKorean: 'Korean',
        langJapanese: 'Japanese',
        langChinese: 'Chinese',
        langVietnamese: 'Vietnamese',
        NewestMovies: 'Newest Movies',
        ListTop10: 'Top 10 recently updated movies, smooth performance on all devices.',
        ShowAll: 'Show All',
    },
    ko: {
        currentLang: 'Tiếng Hàn',
        pageTitle: 'Retro Movie Hub',
        headerLogoAlt: 'Retro Movie Hub 로고',
        searchPlaceholder: '영화 제목을 입력하세요...',
        movieTheater: '상영 중',
        series: '시리즈',
        movieSingle: '영화',
        genre: '장르',
        country: '국가',
        login: '로그인',
        noRecommendations: '영화를 찾을 수 없거나 추천이 없습니다',
        watchNow: '지금 보기',
        genresPrefix: '장르: ',
        langEnglish: '영어',
        langKorean: '한국어',
        langJapanese: '일본어',
        langChinese: '중국어',
        langVietnamese: '베트남어',
        NewestMovies: '최신 영화',
        ListTop10: '최근 업데이트된 영화 TOP 10, 모든 기기에서 부드러운 재생.',
        ShowAll: '모두 보기',
    },
    ja: {
        currentLang: 'Tiếng Nhật',
        pageTitle: 'Retro Movie Hub',
        headerLogoAlt: 'Retro Movie Hub ロゴ',
        searchPlaceholder: '映画タイトルを入力してください...',
        movieTheater: '上映中',
        series: 'シリーズ',
        movieSingle: '映画',
        genre: 'ジャンル',
        country: '国',
        login: 'ログイン',
        noRecommendations: '映画が見つからないか、おすすめがありません',
        watchNow: '今すぐ見る',
        genresPrefix: 'ジャンル: ',
        langEnglish: '英語',
        langKorean: '韓国語',
        langJapanese: '日本語',
        langChinese: '中国語',
        langVietnamese: 'ベトナム語',
        NewestMovies: '최신 영화',
        ListTop10: '最近更新された映画トップ10。すべてのデバイスでスムーズに動作します。',
        ShowAll: 'すべて表示',
    },
    zh: {
        currentLang: 'Tiếng Trung',
        pageTitle: 'Retro Movie Hub',
        headerLogoAlt: 'Retro Movie Hub 标志',
        searchPlaceholder: '请输入电影名称...',
        movieTheater: '正在上映',
        series: '系列',
        movieSingle: '电影',
        genre: '类型',
        country: '国家',
        login: '登录',
        noRecommendations: '未找到电影或没有推荐',
        watchNow: '立即观看',
        genresPrefix: '类型: ',
        langEnglish: '英文',
        langKorean: '韩文',
        langJapanese: '日文',
        langChinese: '中文',
        langVietnamese: '越南文',
        NewestMovies: '最新电影',
        ListTop10: '最近更新的前10部电影在所有设备上流畅播放。',
        ShowAll: '查看全部',
    }
};

function translatePage(langCode) {
    const strings = translations[langCode] || translations.vi;

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key in strings) {
            element.innerText = strings[key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (key in strings) {
            element.setAttribute('placeholder', strings[key]);
        }
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
        const key = element.getAttribute('data-i18n-alt');
        if (key in strings) {
            element.setAttribute('alt', strings[key]);
        }
    });

    document.title = strings.pageTitle;

    const display = document.getElementById('display-lang');
    if (display) {
        display.innerText = strings.currentLang;
    }

    document.querySelectorAll('.lang-dropdown li').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key && key in strings) {
            element.innerText = strings[key];
        }
    });
}

/*----------------------------HEADER SELECTION----------------------------*/

window.onload = function() {
    let savedLang = localStorage.getItem('preferredLang');
    let initialLang = savedLang || document.documentElement.lang || 'vi';
    setLanguage(initialLang);

    const languageSelector = document.querySelector('.language-selector');
    const langDropdown = document.querySelector('.lang-dropdown');
    const category = document.querySelector('.Category');
    const categoryDropdown = document.querySelector('.Category-dropdown');
    let hideTimeout;

    if (languageSelector && langDropdown) {
        languageSelector.addEventListener('mouseenter', function() {
            clearTimeout(hideTimeout);
            langDropdown.style.opacity = '1';
            langDropdown.style.visibility = 'visible';
            langDropdown.style.animation = 'slideDown 0.3s ease';
        });

        languageSelector.addEventListener('mouseleave', function() {
            hideTimeout = setTimeout(function() {
                langDropdown.style.opacity = '0';
                langDropdown.style.visibility = 'hidden';
                langDropdown.style.animation = '';
            }, 100);
        });

        langDropdown.addEventListener('mouseenter', function() {
            clearTimeout(hideTimeout);
        });

        langDropdown.addEventListener('mouseleave', function() {
            hideTimeout = setTimeout(function() {
                langDropdown.style.opacity = '0';
                langDropdown.style.visibility = 'hidden';
                langDropdown.style.animation = '';
            }, 100);
        });
    }

    if (category && categoryDropdown) {
        category.addEventListener('mouseenter', function() {
            clearTimeout(hideTimeout);
            categoryDropdown.style.opacity = '1';
            categoryDropdown.style.visibility = 'visible';
            categoryDropdown.style.animation = 'slideDown 0.3s ease';
        });

        category.addEventListener('mouseleave', function() {
            hideTimeout = setTimeout(function() {
                categoryDropdown.style.opacity = '0';
                categoryDropdown.style.visibility = 'hidden';
                categoryDropdown.style.animation = '';
            }, 100);
        });

        categoryDropdown.addEventListener('mouseenter', function() {
            clearTimeout(hideTimeout);
        });

        categoryDropdown.addEventListener('mouseleave', function() {
            hideTimeout = setTimeout(function() {
                categoryDropdown.style.opacity = '0';
                categoryDropdown.style.visibility = 'hidden';
                categoryDropdown.style.animation = '';
            }, 100);
        });
    }
};

function setLanguage(langCode) {
    let normalizedLang = translations[langCode] ? langCode : 'vi';
    document.documentElement.lang = normalizedLang;
    translatePage(normalizedLang);
    localStorage.setItem('preferredLang', normalizedLang);
}

/*---------------------------------------TOP-10-MOVIES--------------------------------------- */
let movies = [];

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function showEmptyState(message) {
    const container = document.getElementById("movieContainer");
    if (!container) return;

    container.innerHTML = `
        <div class="movie-empty-state">
            <i class="fa-solid fa-film"></i>
            <p>${escapeHtml(message)}</p>
        </div>
    `;
}

function showSearchSummary(message) {
    const summary = document.getElementById('searchSummary');
    if (!summary) return;
    summary.textContent = message;
}

function ensureSearchContainer() {
    if (document.getElementById('searchResultsContainer')) {
        return;
    }

    const section = document.createElement('section');
    section.className = 'search-section is-active';
    section.id = 'searchResultsContainer';
    section.innerHTML = `
        <div class="search-result-panel is-visible">
            <div class="search-summary" id="searchSummary"></div>
            <div class="result-section">
                <p id="genres"></p>
                <div id="result" class="movie-container"></div>
            </div>
            <div class="search-suggestions" id="suggestionsContainer"></div>
        </div>
    `;

    const movieSection = document.querySelector('.movie-section');
    if (movieSection) {
        // Đổi thành beforebegin để kết quả tìm kiếm nằm TRÊN, Top 10 nằm DƯỚI
        movieSection.insertAdjacentElement('beforebegin', section);
    }
}

function toggleTop10Section(show) {
    const section = document.querySelector('.movie-section');
    if (!section) return;
    section.classList.toggle('is-visible', show);
}

function toggleSearchSection(show) {
    const container = document.getElementById('searchResultsContainer');
    if (!container) return;
    container.style.display = show ? 'block' : 'none';
}

function clearSearchResults() {
    const resultContainer = document.getElementById('result');
    const genresNode = document.getElementById('genres');
    const suggestionsContainer = document.getElementById('suggestionsContainer');
    const latestContainer = document.getElementById('searchLatestContainer'); // Thêm dòng này

    if (resultContainer) resultContainer.innerHTML = '';
    if (genresNode) genresNode.textContent = '';
    if (suggestionsContainer) suggestionsContainer.innerHTML = '';
    if (latestContainer) latestContainer.innerHTML = ''; // Thêm dòng này
}

function renderSearchResult(movie) {
    const resultContainer = document.getElementById('result');
    const genresNode = document.getElementById('genres');
    if (!resultContainer) return;

    resultContainer.innerHTML = '';
    if (genresNode) {
        genresNode.textContent = '';
    }

    if (!movie) {
        resultContainer.innerHTML = '';
        return;
    }

    const genresText = Array.isArray(movie.genres) ? `${movie.genres.length} thể loại` : 'Đang cập nhật';
    if (genresNode) {
        genresNode.textContent = `Phim tìm kiếm: ${movie.title || 'Không xác định'} • ${genresText}`;
    }

    const card = document.createElement('div');
    card.className = 'search-result-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Xem chi tiết ${movie.title || 'phim được tìm'}`);
    card.innerHTML = `
        <img class="search-result-thumb" src="${movie.poster_url || '/static/images/logo.png'}" alt="${escapeHtml(movie.title)}">
        <div class="search-result-info">
            <div class="search-result-title">${escapeHtml(movie.title || 'Phim được tìm')}</div>
            <div class="search-result-meta">Ngày phát hành: ${escapeHtml(movie.release_date || 'Đang cập nhật')}</div>
            <div class="search-result-genres">${genresText}</div>
            <button class="watch-btn" type="button">XEM PHIM</button>
        </div>
    `;

    const image = card.querySelector('img');
    if (image) {
        image.onerror = () => {
            image.src = '/static/images/logo.png';
        };
    }

    const watchBtn = card.querySelector('.watch-btn');
    if (watchBtn) {
        watchBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            openMovieDetail(movie, 0);
        });
    }

    card.addEventListener('click', () => openMovieDetail(movie, 0));
    card.addEventListener('keyup', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            openMovieDetail(movie, 0);
        }
    });

    resultContainer.appendChild(card);
}

function renderSuggestions(suggestions) {
    const container = document.getElementById('suggestionsContainer');
    if (!container) return;

    if (!Array.isArray(suggestions) || suggestions.length === 0) {
        container.innerHTML = `<div class="search-summary">Không có gợi ý nào phù hợp.</div>`;
        return;
    }

    container.innerHTML = '';

    suggestions.forEach((suggestion, index) => {
        const card = document.createElement('div');
        card.className = 'suggestion-card';
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Xem chi tiết ${suggestion.title}`);

        card.innerHTML = `
            <img class="suggestion-thumb" src="${suggestion.poster_url || '/static/images/logo.png'}" alt="${escapeHtml(suggestion.title)}">
            <div class="suggestion-info">
                <div class="suggestion-title">${escapeHtml(suggestion.title)}</div>
                <div class="suggestion-meta">Ngày phát hành: ${escapeHtml(suggestion.release_date || 'Đang cập nhật')}</div>
                <span class="suggestion-tag">${escapeHtml(suggestion.shared_genres)} thể loại chung</span>
            </div>
        `;

        const image = card.querySelector('img');
        if (image) {
            image.onerror = () => {
                image.src = '/static/images/logo.png';
            };
        }

        card.addEventListener('click', () => openMovieDetail(suggestion, index + 1));
        card.addEventListener('keyup', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                openMovieDetail(suggestion, index + 1);
            }
        });

        container.appendChild(card);
    });
}

function createMovieCard(movie, index) {
    const div = document.createElement("div");
    div.className = "movie-card";
    div.tabIndex = 0;
    div.setAttribute('role', 'button');
    div.setAttribute('aria-label', `Xem chi tiết ${movie.title || 'phim mới'}`);

    const title = escapeHtml(movie.title || "Phim mới");
    const releaseDate = escapeHtml(movie.release_date || "Đang cập nhật");
    const posterUrl = movie.poster_url || "/static/images/logo.png";
    const rank = index + 1;

    div.innerHTML = `
        <div class="movie-card-badge">#${rank}</div>
        <img class="movie-img" src="${posterUrl}" alt="${title}" loading="lazy">
        <div class="movie-info">
            <div class="movie-title">${title}</div>
            <div class="movie-date"><i class="fa-regular fa-calendar"></i> ${releaseDate}</div>
            <button class="watch-btn" data-i18n="watchNow">XEM PHIM</button>
        </div>
    `;

    const image = div.querySelector(".movie-img");
    if (image) {
        image.onerror = () => {
            image.src = "/static/images/logo.png";
        };
    }

    div.addEventListener('click', () => {
        openMovieDetail(movie, rank);
    });

    div.addEventListener('keyup', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            openMovieDetail(movie, rank);
        }
    });

    setTimeout(() => {
        div.classList.add("slide-in");
    }, 50);

    return div;
}

function openMovieDetail(movie, rank) {
    const modal = document.getElementById('movieDetailModal');
    if (!modal) return;

    const poster = document.getElementById('detailPoster');
    const title = document.getElementById('detailTitle');
    const rankNode = document.getElementById('detailRank');
    const meta = document.getElementById('detailMeta');
    const description = document.getElementById('detailDescription');
    const watchBtn = document.getElementById('modalWatchBtn');

    if (poster) poster.src = movie.poster_url || '/static/images/logo.png';
    if (title) title.textContent = movie.title || 'Phim mới';
    if (rankNode) rankNode.textContent = rank > 0 ? `Top #${rank}` : 'Kết quả tìm kiếm';
    if (meta) meta.textContent = `Ngày phát hành: ${movie.release_date || 'Đang cập nhật'}`;
    if (description) description.textContent = movie.overview || 'Thông tin chi tiết phim đang được cập nhật. Nhấn XEM PHIM để bắt đầu.';
    if (watchBtn) {
        if (movie.id) {
            watchBtn.onclick = () => {
                window.location.href = `/movie/${movie.id}`;
            };
        } else {
            watchBtn.onclick = () => {};
        }
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeMovieDetail() {
    const modal = document.getElementById('movieDetailModal');
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

function renderMovies() {
    const container = document.getElementById("movieContainer");
    if (!container) return;

    container.innerHTML = "";
    movies.forEach((movie, index) => container.appendChild(createMovieCard(movie, index)));
}

function scrollNewestMovies(amount) {
    const container = document.getElementById("movieContainer");
    if (!container) return;
    container.scrollBy({ left: amount, top: 0, behavior: 'smooth' });
}

function enableCarouselWheelScroll(container) {
    if (!container) return;

    // Lăn bánh xe dọc -> Cuộn ngang
    container.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        container.scrollLeft += evt.deltaY;
    }, { passive: false });

    // Kéo thả chuột để trượt (Drag-to-scroll)
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    container.addEventListener('pointerdown', (e) => {
        isDown = true;
        container.classList.add('dragging');
        startX = e.pageX || (e.touches && e.touches[0] && e.touches[0].pageX) || 0;
        scrollStart = container.scrollLeft;
        if (e.pointerId) container.setPointerCapture && container.setPointerCapture(e.pointerId);
    }, { passive: false });

    container.addEventListener('pointermove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX || (e.touches && e.touches[0] && e.touches[0].pageX) || 0;
        const walk = (x - startX) * 1.5;
        container.scrollLeft = scrollStart - walk;
    }, { passive: false });

    const endDrag = (e) => {
        isDown = false;
        container.classList.remove('dragging');
        try { if (e && e.pointerId) container.releasePointerCapture && container.releasePointerCapture(e.pointerId); } catch (err) {}
    };

    container.addEventListener('pointerup', endDrag);
    container.addEventListener('pointercancel', endDrag);
    container.addEventListener('mouseleave', endDrag);
}

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("movieContainer");
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const viewAllBtn = document.getElementById('viewAllBtn');

    if (container) {
        enableCarouselWheelScroll(container);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => scrollNewestMovies(-320));
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => scrollNewestMovies(320));
    }

    if (viewAllBtn && container) {
        viewAllBtn.addEventListener('click', () => container.scrollTo({ left: 0, behavior: 'smooth' }));
    }

    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const searchInput = document.getElementById('movie');
    const searchButton = document.getElementById('searchButton');

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeMovieDetail);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeMovieDetail);
    }

    if (searchButton && searchInput) {
        const executeSearch = () => {
            const query = searchInput.value.trim();
            if (!query) {
                clearSearchResults();
                toggleTop10Section(true);
                toggleSearchSection(false);
                showSearchSummary('');
                return;
            }

            ensureSearchContainer();
            // Hide the main top-10 section so search results show in sequence
            toggleTop10Section(false);
            toggleSearchSection(true);

            fetch(`/api/search?query=${encodeURIComponent(query)}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    if (!data.movie) {
                        renderSearchResult(null);
                        renderSuggestions([]);
                        showSearchSummary('Không tìm thấy phim phù hợp.');
                        return;
                    }

                    // 1) Hiển thị phim tìm được
                    renderSearchResult(data.movie);
                    showSearchSummary(`Phim tìm được: ${data.movie.title} - ${data.movie.release_date || 'Đang cập nhật'}`);

                    // 2) Hiển thị phim gợi ý cùng thể loại
                    renderSuggestions(data.suggestions || []);

                    // 3) GIỮ NGUYÊN KHỐI TOP 10 GỐC
                    toggleTop10Section(true); 
                })
                .catch(err => {
                    console.error('Lỗi tìm kiếm phim:', err);
                    renderSearchResult(null);
                    renderSuggestions([]);
                    showSearchSummary('Lỗi khi tìm kiếm phim. Vui lòng thử lại.');
                });
        };

        searchButton.addEventListener('click', executeSearch);
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                executeSearch();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMovieDetail();
        }
    });

    clearSearchResults();
    toggleTop10Section(true);
    toggleSearchSection(false);
    showSearchSummary('');

    fetch("/api/latest", { headers: { Accept: "application/json" } })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            movies = Array.isArray(data) ? data : [];
            if (movies.length) {
                renderMovies();
            } else {
                showEmptyState("Hiện chưa có phim mới nhất để hiển thị.");
            }
        })
        .catch(err => {
            console.error("Không thể tải phim mới nhất:", err);
            showEmptyState("Không thể tải phim mới nhất lúc này.");
        });
});

    window.addEventListener('wheel', function(e) {
        try {
            const x = e.clientX;
            const y = e.clientY;
            if (typeof x !== 'number' || typeof y !== 'number') return;
            const el = document.elementFromPoint(x, y);
            if (!el) return;
            const carousel = el.closest && el.closest('.newestmovie-container');
            if (!carousel) return;

            // debug
            console.debug('global wheel over carousel', carousel, 'delta', e.deltaY || e.deltaX || 0);
            // Prevent the page from vertical scrolling when interacting with the carousel
            e.preventDefault();
            const delta = e.deltaY || e.deltaX || 0;
            // apply a smoother factor for touchpads
            const step = Math.abs(delta) > 60 ? (delta > 0 ? 320 : -320) : (delta > 0 ? 160 : -160);
            carousel.scrollLeft += step;
        } catch (err) {
            // ignore errors
        }
    }, { passive: false });
