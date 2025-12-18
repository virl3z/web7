document.addEventListener('DOMContentLoaded', function() {
    // Массив изображений с Pixabay (бесплатные, без ограничений)
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
    let itemsPerView = 3; // По умолчанию для десктопов
    let totalItems = images.length;
    let totalPages = 0;
    
    // Инициализация галереи
    function initGallery() {
        // Определяем сколько изображений показывать в зависимости от ширины экрана
        updateItemsPerView();
        
        // Очищаем галерею перед созданием
        galleryTrack.innerHTML = '';
        
        // Создаем изображения
        images.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${image.url}" alt="${image.title}" 
                     loading="lazy"
                     onerror="this.onerror=null; this.src='https://cdn.pixabay.com/photo/2018/01/04/15/51/404-error-3060993_1280.jpg'">
                <p>${image.title}</p>
            `;
            galleryTrack.appendChild(item);
        });
        
        // Рассчитываем общее количество страниц
        totalPages = Math.ceil(totalItems / itemsPerView);
        totalPagesSpan.textContent = totalPages;
        
        // Создаем точки пейджера
        createPagerDots();
        
        // Обновляем состояние кнопок
        updateNavButtons();
        
        // Показываем первую страницу
        goToPage(0);
    }
    
    // Обновляем количество видимых элементов в зависимости от ширины экрана
    function updateItemsPerView() {
        const width = window.innerWidth;
        let oldItemsPerView = itemsPerView;
        
        if (width <= 768) {
            itemsPerView = 1; // Для мобильных
        } else if (width <= 992) {
            itemsPerView = 2; // Для планшетов
        } else {
            itemsPerView = 3; // Для десктопов
        }
        
        // Пересчитываем количество страниц при изменении размера окна
        totalPages = Math.ceil(totalItems / itemsPerView);
        totalPagesSpan.textContent = totalPages;
        
        // Пересоздаем точки пейджера только если изменилось количество страниц
        if (oldItemsPerView !== itemsPerView) {
            createPagerDots();
        }
    }
    
    // Создаем точки пейджера
    function createPagerDots() {
        pagerDots.innerHTML = '';
        
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = 'pager-dot';
            dot.setAttribute('data-page', i);
            if (i === currentPosition) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', () => {
                goToPage(i);
            });
            
            dot.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.3)';
            });
            
            dot.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'scale(1)';
                }
            });
            
            pagerDots.appendChild(dot);
        }
    }
    
    // Переход на конкретную страницу
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
        
        // Обновляем активную точку пейджера
        updatePagerDots();
        
        // Обновляем номер текущей страницы
        currentPageSpan.textContent = currentPosition + 1;
        
        // Обновляем состояние кнопок навигации
        updateNavButtons();
    }
    
    // Обновляем активную точку пейджера
    function updatePagerDots() {
        const dots = document.querySelectorAll('.pager-dot');
        dots.forEach((dot, index) => {
            if (index === currentPosition) {
                dot.classList.add('active');
                dot.style.transform = 'scale(1.3)';
            } else {
                dot.classList.remove('active');
                dot.style.transform = 'scale(1)';
            }
        });
    }
    
    // Обновляем состояние кнопок навигации
    function updateNavButtons() {
        prevBtn.disabled = currentPosition === 0;
        nextBtn.disabled = currentPosition === totalPages - 1;
        
        // Добавляем/убираем стили для неактивных кнопок
        if (prevBtn.disabled) {
            prevBtn.style.opacity = '0.5';
            prevBtn.style.cursor = 'not-allowed';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
        }
        
        if (nextBtn.disabled) {
            nextBtn.style.opacity = '0.5';
            nextBtn.style.cursor = 'not-allowed';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
        }
    }
    
    // Следующая страница
    function nextPage() {
        if (currentPosition < totalPages - 1) {
            goToPage(currentPosition + 1);
        }
    }
    
    // Предыдущая страница
    function prevPage() {
        if (currentPosition > 0) {
            goToPage(currentPosition - 1);
        }
    }
    
    // Добавляем анимацию при клике на кнопки
    function addButtonAnimation(button) {
        button.style.transition = 'transform 0.1s';
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);
    }
    
    // Обработчики событий для кнопок
    prevBtn.addEventListener('click', function() {
        addButtonAnimation(this);
        prevPage();
    });
    
    nextBtn.addEventListener('click', function() {
        addButtonAnimation(this);
        nextPage();
    });
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        updateItemsPerView();
        goToPage(currentPosition);
    });
    
    // Добавляем поддержку клавиатуры
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            prevPage();
        } else if (event.key === 'ArrowRight') {
            nextPage();
        }
    });
    
    // Добавляем свайпы для мобильных устройств
    let touchStartX = 0;
    let touchEndX = 0;
    
    galleryTrack.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
    }, {passive: true});
    
    galleryTrack.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Свайп влево - следующая страница
                nextPage();
            } else {
                // Свайп вправо - предыдущая страница
                prevPage();
            }
        }
    }
    
    // Инициализируем галерею
    initGallery();
});
