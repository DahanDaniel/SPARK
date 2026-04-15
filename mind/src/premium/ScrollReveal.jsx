import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook that sets up GSAP ScrollTrigger animations for elements with
 * `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale` classes.
 * Also animates `.stagger-children` containers.
 * 
 * Call once at the top level of AppPremium.
 */
export function useScrollReveal() {
  const hasInit = useRef(false);

  useEffect(() => {
    if (hasInit.current) return;
    hasInit.current = true;

    // Small delay to ensure DOM is fully rendered
    const timeout = setTimeout(() => {
      // Basic reveals
      gsap.utils.toArray('.reveal').forEach(el => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });

      // Left reveals
      gsap.utils.toArray('.reveal-left').forEach(el => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        });
      });

      // Right reveals
      gsap.utils.toArray('.reveal-right').forEach(el => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        });
      });

      // Scale reveals
      gsap.utils.toArray('.reveal-scale').forEach(el => {
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        });
      });

      // Stagger children
      gsap.utils.toArray('.stagger-children').forEach(container => {
        const children = container.children;
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
          },
        });
      });

      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
}

/**
 * Animate hero heading with letter-by-letter reveal.
 * Pass a ref to the heading element.
 */
export function useHeroTextReveal(headingRef) {
  useEffect(() => {
    if (!headingRef.current) return;

    const timeout = setTimeout(() => {
      const el = headingRef.current;
      if (!el) return;

      // Get the existing HTML, split text nodes into spans
      const html = el.innerHTML;
      // We'll animate the whole heading with a staggered appearance
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: 'power4.out',
        }
      );

      // Animate the gradient text separately with a slight delay
      const gradientSpan = el.querySelector('.text-gradient');
      if (gradientSpan) {
        gsap.fromTo(
          gradientSpan,
          { opacity: 0, y: 30, scale: 0.95 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 1,
            delay: 0.4,
            ease: 'power3.out',
          }
        );
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [headingRef]);
}

/**
 * Parallax effect for gradient orbs in hero section.
 * Makes elements move at different speeds on scroll.
 */
export function useParallaxOrbs() {
  useEffect(() => {
    const orbs = document.querySelectorAll('.hero-gradient-orb');
    if (!orbs.length) return;

    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 0.3;
      gsap.to(orb, {
        y: () => window.innerHeight * speed * 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
}

/**
 * Animate nav background on scroll
 */
export function useNavScroll() {
  useEffect(() => {
    const nav = document.querySelector('.nav-premium');
    if (!nav) return;

    const onScroll = () => {
      if (window.scrollY > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}
