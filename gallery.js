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
    let itemsPerView = getItemsPerView();
    const totalImages = images.length;
    
    function getItemsPerView() {
        const width = window.innerWidth;
        if (width <= 768) return 1;
        if (width <= 992) return 2;
        return 3;
    }
    
    function initGallery() {
        galleryTrack.innerHTML = '';
        
        for (let i = 0; i < totalImages; i++) {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${images[i].url}" alt="${images[i].title}">
                <p>${images[i].title}</p>
            `;
            galleryTrack.appendChild(item);
        }
        
        updateTotalPages();
        createPagerDots();
        goToPage(0);
    }
    
    function updateTotalPages() {
        const totalPages = Math.ceil(totalImages / itemsPerView);
        totalPagesSpan.textContent = totalPages;
        return totalPages;
    }
    
    function createPagerDots() {
        pagerDots.innerHTML = '';
        const totalPages = updateTotalPages();
        
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('div');
            dot.className = 'pager-dot';
            if (i === currentPage) dot.classList.add('active');
            
            dot.addEventListener('click', () => goToPage(i));
            pagerDots.appendChild(dot);
        }
    }
    
    function goToPage(pageIndex) {
        const totalPages = updateTotalPages();
        if (pageIndex < 0) pageIndex = 0;
        if (pageIndex >= totalPages) pageIndex = totalPages - 1;
        
        currentPage = pageIndex;
        const itemWidth = 100 / itemsPerView;
        const offset = currentPage * itemWidth;
        
        galleryTrack.style.transform = `translateX(-${offset}%)`;
        currentPageSpan.textContent = currentPage + 1;
        updatePagerDots();
        updateNavButtons();
    }
    
    function updatePagerDots() {
        document.querySelectorAll('.pager-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentPage);
        });
    }
    
    function updateNavButtons() {
        const totalPages = updateTotalPages();
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
        
        prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
        nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
    }
    
    function nextPage() {
        const totalPages = updateTotalPages();
        if (currentPage < totalPages - 1) goToPage(currentPage + 1);
    }
    
    function prevPage() {
        if (currentPage > 0) goToPage(currentPage - 1);
    }
    
    prevBtn.addEventListener('click', prevPage);
    nextBtn.addEventListener('click', nextPage);
    
    window.addEventListener('resize', function() {
        const newItemsPerView = getItemsPerView();
        if (newItemsPerView !== itemsPerView) {
            itemsPerView = newItemsPerView;
            createPagerDots();
            const totalPages = updateTotalPages();
            if (currentPage >= totalPages) currentPage = totalPages - 1;
            goToPage(currentPage);
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') prevPage();
        if (e.key === 'ArrowRight') nextPage();
    });
    
    initGallery();
});
