document.addEventListener('DOMContentLoaded', function() {
    // Используем placeholder.com - всегда работает
    const images = [
        {
            url: 'https://via.placeholder.com/800x600/4A90E2/FFFFFF?text=Горный+пейзаж',
            title: 'Горный пейзаж'
        },
        {
            url: 'https://via.placeholder.com/800x600/50E3C2/FFFFFF?text=Лесное+озеро',
            title: 'Лесное озеро'
        },
        {
            url: 'https://via.placeholder.com/800x600/9013FE/FFFFFF?text=Морской+закат',
            title: 'Морской закат'
        },
        {
            url: 'https://via.placeholder.com/800x600/F5A623/FFFFFF?text=Пустынный+оазис',
            title: 'Пустынный оазис'
        },
        {
            url: 'https://via.placeholder.com/800x600/7ED321/FFFFFF?text=Тропический+лес',
            title: 'Тропический лес'
        },
        {
            url: 'https://via.placeholder.com/800x600/BD10E0/FFFFFF?text=Северное+сияние',
            title: 'Северное сияние'
        },
        {
            url: 'https://via.placeholder.com/800x600/417505/FFFFFF?text=Долина+цветов',
            title: 'Долина цветов'
        },
        {
            url: 'https://via.placeholder.com/800x600/D0021B/FFFFFF?text=Вулканический+кратер',
            title: 'Вулканический кратер'
        }
    ];
    
    // Элементы DOM
    const galleryTrack = document.querySelector('.gallery-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const currentPageSpan = document.querySelector('.current-page');
    const totalPagesSpan = document.querySelector('.total-pages');
    const pagerDots = document.querySelector('.pager-dots');
    
    // Настройки
    let currentPage = 0;
    let itemsPerView = getItemsPerView();
    
    // Функция для определения количества видимых изображений
    function getItemsPerView() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        if (width <= 992) return 2;
        return 3;
    }
    
    // Инициализация галереи
    function initGallery() {
        // Очищаем трек
        galleryTrack.innerHTML = '';
        
        // Создаем 8 изображений
        for (let i = 0; i < 8; i++) {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            
            if (images[i]) {
                item.innerHTML = `
                    <img src="${images[i].url}" alt="${images[i].title}">
                    <p>${images[i].title}</p>
                `;
            }
            
            galleryTrack.appendChild(item);
        }
        
        // Рассчитываем количество страниц
        const totalPages = Math.ceil(8 / itemsPerView);
        totalPagesSpan.textContent = totalPages;
        
        // Создаем точки пейджера
        createPagerDots(totalPages);
        
        // Показываем первую страницу
        goToPage(0);
    }
    
    // Создание точек пейджера
    function createPagerDots(totalPages) {
        pagerDots.innerHTML = '';
        
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = 'pager-dot';
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToPage(i);
            });
            
            pagerDots.appendChild(dot);
        }
    }
    
    // Переход на страницу
    function goToPage(pageIndex) {
        const totalPages = Math.ceil(8 / itemsPerView);
        
        // Проверяем границы
        if (pageIndex < 0) pageIndex = 0;
        if (pageIndex >= totalPages) pageIndex = totalPages - 1;
        
        currentPage = pageIndex;
        
        // Рассчитываем смещение
        const itemWidth = 100 / itemsPerView;
        const offset = currentPage * itemWidth;
        
        // Применяем трансформацию
        galleryTrack.style.transform = `translateX(-${offset}%)`;
        
        // Обновляем номер страницы
        currentPageSpan.textContent = currentPage + 1;
        
        // Обновляем точки пейджера
        updatePagerDots();
        
        // Обновляем кнопки
        updateNavButtons();
    }
    
    // Обновление точек пейджера
    function updatePagerDots() {
        const dots = document.querySelectorAll('.pager-dot');
        dots.forEach((dot, index) => {
            if (index === currentPage) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Обновление кнопок навигации
    function updateNavButtons() {
        const totalPages = Math.ceil(8 / itemsPerView);
        
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
        
        prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
        prevBtn.style.cursor = prevBtn.disabled ? 'not-allowed' : 'pointer';
        
        nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
        nextBtn.style.cursor = nextBtn.disabled ? 'not-allowed' : 'pointer';
    }
    
    // Следующая страница
    function nextPage() {
        const totalPages = Math.ceil(8 / itemsPerView);
        if (currentPage < totalPages - 1) {
            goToPage(currentPage + 1);
        }
    }
    
    // Предыдущая страница
    function prevPage() {
        if (currentPage > 0) {
            goToPage(currentPage - 1);
        }
    }
    
    // Обработчики событий
    prevBtn.addEventListener('click', prevPage);
    nextBtn.addEventListener('click', nextPage);
    
    // Изменение размера окна
    window.addEventListener('resize', function() {
        const newItemsPerView = getItemsPerView();
        
        if (newItemsPerView !== itemsPerView) {
            itemsPerView = newItemsPerView;
            
            // Пересоздаем пейджер с новым количеством страниц
            const totalPages = Math.ceil(8 / itemsPerView);
            totalPagesSpan.textContent = totalPages;
            createPagerDots(totalPages);
            
            // Корректируем текущую страницу
            if (currentPage >= totalPages) {
                currentPage = totalPages - 1;
            }
            
            goToPage(currentPage);
        }
    });
    
    // Поддержка клавиатуры
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            prevPage();
        } else if (event.key === 'ArrowRight') {
            nextPage();
        }
    });
    
    // Инициализация
    initGallery();
});
