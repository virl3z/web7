document.addEventListener('DOMContentLoaded', function() {
    // Массив локальных JPEG изображений (папка называется images)
    const images = [
        {url: 'images/photo1.jpg', title: 'Пейзаж'},
        {url: 'images/photo2.jpg', title: 'Дом'},
        {url: 'images/photo3.jpg', title: 'Лес'},
        {url: 'images/photo4.jpg', title: 'Волны'},
        {url: 'images/photo5.jpg', title: 'Лодка'},
        {url: 'images/photo6.jpg', title: 'Поле'},
        {url: 'images/photo7.jpg', title: 'Большой дом'},
        {url: 'images/photo8.jpg', title: 'Дорога'}
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
    let itemsPerView = 3;
    const totalImages = images.length;
    
    // Инициализация галереи
    function initGallery() {
        // Определяем сколько изображений показывать
        updateItemsPerView();
        
        // Очищаем трек
        galleryTrack.innerHTML = '';
        
        // Создаем все 8 изображений
        for (let i = 0; i < totalImages; i++) {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.setAttribute('data-index', i);
            item.innerHTML = `
                <img src="${images[i].url}" alt="${images[i].title}">
                <p>${images[i].title}</p>
            `;
            galleryTrack.appendChild(item);
        }
        
        // Рассчитываем и показываем количество страниц
        updatePageInfo();
        
        // Создаем точки пейджера
        createPagerDots();
        
        // Показываем первую страницу
        goToPage(0);
    }
    
    // Обновление количества видимых элементов
    function updateItemsPerView() {
        const width = window.innerWidth;
        if (width <= 768) {
            itemsPerView = 1;
        } else if (width <= 992) {
            itemsPerView = 2;
        } else {
            itemsPerView = 3;
        }
    }
    
    // Обновление информации о страницах
    function updatePageInfo() {
        const totalPages = Math.ceil(totalImages / itemsPerView);
        totalPagesSpan.textContent = totalPages;
        return totalPages;
    }
    
    // Создание точек пейджера
    function createPagerDots() {
        pagerDots.innerHTML = '';
        const totalPages = updatePageInfo();
        
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = 'pager-dot';
            dot.setAttribute('data-page', i);
            
            if (i === currentPage) {
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
        const totalPages = updatePageInfo();
        
        // Проверяем границы
        if (pageIndex < 0) pageIndex = 0;
        if (pageIndex >= totalPages) pageIndex = totalPages - 1;
        
        currentPage = pageIndex;
        
        // Рассчитываем смещение
        const offset = currentPage * 100;
        
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
        const totalPages = updatePageInfo();
        
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
        
        prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
        nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
    }
    
    // Следующая страница
    function nextPage() {
        const totalPages = updatePageInfo();
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
        const oldItemsPerView = itemsPerView;
        updateItemsPerView();
        
        if (oldItemsPerView !== itemsPerView) {
            createPagerDots();
            goToPage(0);
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

