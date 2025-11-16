// Slider mantığını hemen çalıştır
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;
const prevBtn = document.querySelector('.hero-nav.prev');
const nextBtn = document.querySelector('.hero-nav.next');
let autoSlideInterval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));
    
    if (slides[index]) { // Slaytın var olduğundan emin ol
        slides[index].classList.add('active');
    }
    if (indicators[index]) { // İndikatörün var olduğundan emin ol
        indicators[index].classList.add('active');
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function startAutoSlide() {
    if (totalSlides > 1) {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

startAutoSlide();

if (totalSlides > 1) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopAutoSlide();
            startAutoSlide();
        });
    });
} else {
    if(prevBtn) prevBtn.style.display = 'none';
    if(nextBtn) nextBtn.style.display = 'none';
    const indicatorsContainer = document.querySelector('.hero-indicators');
    if(indicatorsContainer) indicatorsContainer.style.display = 'none';
}

// Smooth scrolling (Kaydırma)
document.querySelectorAll('a[href^="Site.html#"], a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        
        const href = this.getAttribute('href');
        const targetId = href.split('#').pop();
        
        if (!href.includes('#') || !document.getElementById(targetId)) {
            return; 
        }

        e.preventDefault();
        const target = document.getElementById(targetId);
        
        if (target) {
            const headerOffset = 110; 
            const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Proje kartları için Intersection Observer (Animasyon)
function initProjectAnimations() {
    const projectItems = document.querySelectorAll('.portfolio-item, .project-card, .service-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // CSS'inizin beklediği ".show" sınıfını ekliyoruz.
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    projectItems.forEach(item => {
        observer.observe(item);
    });
}

// Animasyonları çalıştırmak için doğru DOM yükleme kontrolü
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectAnimations);
} else {
    initProjectAnimations();
}