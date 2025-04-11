import ScrollReveal from 'scrollreveal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

console.log("Script carregado com sucesso!"); // Log para depuração

// GSAP: Animação de cabeçalho
gsap.from('.header', {
  duration: 1.5,
  opacity: 0,
  y: -50,
  ease: 'power2.out',
});

// GSAP: Animação dos cards
gsap.from('.card', {
  scrollTrigger: {
    trigger: '.card',
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
  },
  opacity: 0,
  y: 50,
  duration: 1,
  ease: 'power2.out',
  stagger: 0.2,
});

// ScrollReveal: Configuração para seções
ScrollReveal().reveal('.section', {
  duration: 1000,
  origin: 'bottom',
  distance: '50px',
  reset: false,
});
