document.addEventListener('DOMContentLoaded', function() {
    // Массив изображений с Pixabay
    const images = [
        {
            url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
            title: 'Одинокое дерево на закате'
        },
        {
            url: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
            title: 'Лесная дорога осенью'
        },
        {
            url: 'https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg',
            title: 'Закат на морском берегу'
        },
        {
            url: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg',
            title: 'Горный водопад'
        },
        {
            url: 'https://cdn.pixabay.com/photo/2017/02/08/17/24/fantasy-2049567_1280.jpg',
            title: 'Волшебный ночной лес'
        },
        {
            url: 'https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg',
            title: 'Звездное небо и Млечный путь'
        },
        {
            url: 'https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704_1280.jpg',
            title: 'Тропический пляж с пальмами'
        },
        {
            url: 'https://cdn.pixabay.com/photo/2016/11/21/17/44/arches-national-park-1846759_1280.jpg',
            title: 'Пустынный каньон в США'
        }
    ];
    
    // Элементы DOM
    const galleryTrack = document.querySelector('.gallery-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const currentPageSpan = document.querySelector('.current-page');
    const totalPagesSpan = document.querySelector('.total-pages');
    const pagerDots = document.querySelector('.pager-dots');
    
    // Настройки галереи
    let currentPosition = 0;
    let itemsPerView = 3;
    let totalItems = images.length;
    let totalPages = 0;
    
    // Инициализация галереи
    function initGallery() {
        updateItemsPerView();
        
        // Очищаем галерею
        galleryTrack.innerHTML = '';
        
        // Создаем контейнеры для изображений
        for (let i = 0; i < totalItems; i++) {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            
            // Проверяем, есть ли изображение для этой позиции
            if (i < images.length) {
                const image = images[i];
                item.innerHTML = `
                    <img src="${image.url}" alt="${image.title}" loading="lazy">
                    <p>${image.title}</p>
                `;
            } else {
                // Пустой элемент для заполнения
                item.innerHTML = `
                    <div style="width: 100%; height: 300px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; border-radius: 10px;">
                        <span style="color: #999;">Нет изображения</span>
                    </div>
                    <p>Пустой слот</p>
                `;
            }
            
            galleryTrack.appendChild(item);
        }
        
        // Рассчитываем количество страниц
        calculatePages();
        createPagerDots();
        updateNavButtons();
        goToPage(0);
    }
    
    // Расчет количества страниц
    function calculatePages() {
        totalPages = Math.ceil(totalItems / itemsPerView);
        totalPagesSpan.textContent = totalPages;
    }
    
    // Обновляем количество видимых элементов
    function updateItemsPerView() {
        const width = window.innerWidth;
        
        if (width <= 768) {
            itemsPerView = 1;
        } else if (width <= 992) {
            itemsPerView = 2;
        } else {
            itemsPerView = 3;
        }
        
        // Пересчитываем страницы
        calculatePages();
        
        // Пересоздаем точки пейджера
        createPagerDots();
    }
    
    // Создаем точки пейджера
    function createPagerDots() {
        pagerDots.innerHTML = '';
        
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = 'pager-dot';
            if (i === currentPosition) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', () => {
                goToPage(i);
            });
            
            pagerDots.appendChild(dot);
        }
    }
    
    // Переход на страницу
    function goToPage(pageIndex) {
        // Проверяем границы
        if (pageIndex < 0) pageIndex = 0;
        if (pageIndex >= totalPages) pageIndex = totalPages - 1;
        
        currentPosition = pageIndex;
        
        // Рассчитываем смещение
        const itemWidth = 100 / itemsPerView;
        const offset = currentPosition * itemWidth;
        
        // Применяем трансформацию
        galleryTrack.style.transform = `translateX(-${offset}%)`;
        
        // Обновляем активную точку
        updatePagerDots();
        
        // Обновляем номер страницы
        currentPageSpan.textContent = currentPosition + 1;
        
        // Обновляем кнопки
        updateNavButtons();
    }
    
    // Обновляем точки пейджера
    function updatePagerDots() {
        const dots = document.querySelectorAll('.pager-dot');
        dots.forEach((dot, index) => {
            if (index === currentPosition) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Обновляем кнопки навигации
    function updateNavButtons() {
        prevBtn.disabled = currentPosition === 0;
        nextBtn.disabled = currentPosition === totalPages - 1;
        
        // Стили для неактивных кнопок
        prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
        prevBtn.style.cursor = prevBtn.disabled ? 'not-allowed' : 'pointer';
        
        nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
        nextBtn.style.cursor = nextBtn.disabled ? 'not-allowed' : 'pointer';
    }
    
    // Навигация
    function nextPage() {
        if (currentPosition < totalPages - 1) {
            goToPage(currentPosition + 1);
        }
    }
    
    function prevPage() {
        if (currentPosition > 0) {
            goToPage(currentPosition - 1);
        }
    }
    
    // Обработчики событий
    prevBtn.addEventListener('click', prevPage);
    nextBtn.addEventListener('click', nextPage);
    
    window.addEventListener('resize', function() {
        updateItemsPerView();
        goToPage(currentPosition);
    });
    
    // Поддержка клавиатуры
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') prevPage();
        if (event.key === 'ArrowRight') nextPage();
    });
    
    // Свайпы для мобильных
    let touchStartX = 0;
    galleryTrack.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    galleryTrack.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextPage();
            else prevPage();
        }
    }, {passive: true});
    
    // Инициализация
    initGallery();
});
