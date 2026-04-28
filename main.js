// Nav scroll effect
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 40);
  }, { passive: true });
}

const heroSlides = Array.from(document.querySelectorAll('.hero__slide'));
const heroDots = Array.from(document.querySelectorAll('[data-hero-slide]'));

if (heroSlides.length > 1 && heroDots.length === heroSlides.length) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeSlide = 0;
  let carouselTimer = null;

  const setHeroSlide = (index) => {
    activeSlide = (index + heroSlides.length) % heroSlides.length;

    heroSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle('hero__slide--active', slideIndex === activeSlide);
    });

    heroDots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeSlide;
      dot.classList.toggle('hero__dot--active', isActive);
      dot.setAttribute('aria-pressed', String(isActive));
    });
  };

  const stopCarousel = () => {
    if (carouselTimer) {
      window.clearInterval(carouselTimer);
      carouselTimer = null;
    }
  };

  const startCarousel = () => {
    stopCarousel();
    if (!reducedMotion.matches) {
      carouselTimer = window.setInterval(() => {
        setHeroSlide(activeSlide + 1);
      }, 7200);
    }
  };

  heroDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      setHeroSlide(Number(dot.dataset.heroSlide));
      startCarousel();
    });
  });

  reducedMotion.addEventListener('change', startCarousel);
  setHeroSlide(0);
  startCarousel();
}
