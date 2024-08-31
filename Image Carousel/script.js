class ImageCarousel {
    constructor(container, images) {
        this.container = container;
        this.slideContainer = container.querySelector('.carousel-slide');
        this.images = images;
        this.currentIndex = 0;
        this.fallbackImage = 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';

        this.prevBtn = container.querySelector('.prev');
        this.nextBtn = container.querySelector('.next');
        this.indicatorsContainer = container.querySelector('.carousel-indicators');

        this.initCarousel();
        this.addEventListeners();
    }

    initCarousel() {
        this.images.forEach((src, index) => {
            const img = new Image();
            img.src = src;
            img.onerror = () => {
                img.src = this.fallbackImage;
                img.onerror = null;
            };
            this.slideContainer.appendChild(img);

            // Create indicator
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicatorsContainer.appendChild(indicator);
        });
        this.updateCarousel();
    }

    addEventListeners() {
        this.prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigate(-1);
        });
        this.nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigate(1);
        });
    }

    navigate(direction) {
        this.currentIndex = (this.currentIndex + direction + this.images.length) % this.images.length;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    updateCarousel() {
        const offset = -this.currentIndex * 100;
        this.slideContainer.style.transform = `translateX(${offset}%)`;

        // Update indicators
        const indicators = this.indicatorsContainer.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }
}

// Usage
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    const images = [
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
    ];
    new ImageCarousel(carouselContainer, images);
});