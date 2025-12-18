document.addEventListener('DOMContentLoaded', function() {
    // Массив изображений с разными тематиками
    const images = [
        {
            url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b',
            title: 'Музыкальные инструменты'
        },
        {
            url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0',
            title: 'Кофейная культура'
        },
        {
            url: 'https://images.unsplash.com/photo-1516542076529-1ea3854896f2',
            title: 'Современная архитектура'
        },
        {
            url: 'https://images.unsplash.com/photo-1536922246289-88c42f957773',
            title: 'Водный спорт'
        },
        {
            url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
            title: 'Космическое пространство'
        },
        {
            url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9',
            title: 'Японская кухня'
        },
        {
            url: 'https://images.unsplash.com/photo-1517400508447-f8dd518b86db',
            title: 'Уличное искусство'
        },
        {
            url: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00',
            title: 'Научная лаборатория'
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
        
        // Создаем изображения
        images.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${image.url}?w=800&h=600&fit=crop" alt="${image.title}">
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
        
        // Обновляем точки пейджера
        createPagerDots();
        
        // Возвращаемся на первую страницу при изменении размера
        goToPage(0);
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
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Обновляем состояние кнопок навигации
    function updateNavButtons() {
        prevBtn.disabled = currentPosition === 0;
        nextBtn.disabled = currentPosition === totalPages - 1;
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
    
    // Обработчики событий
    prevBtn.addEventListener('click', prevPage);
    nextBtn.addEventListener('click', nextPage);
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', updateItemsPerView);
    
    // Добавляем поддержку клавиатуры
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            prevPage();
        } else if (event.key === 'ArrowRight') {
            nextPage();
        }
    });
    
    // Инициализируем галерею
    initGallery();
    
    // Выводим сообщение об успешной загрузке
    console.log('Галерея успешно загружена!');
});