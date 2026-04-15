import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const requestRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const outlinePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Don't render on touch devices
    if (window.matchMedia('(max-width: 1024px)').matches) return;
    if ('ontouchstart' in window) return;

    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    // Smooth follow for outline
    const animate = () => {
      const { x, y } = mousePos.current;
      const ox = outlinePos.current.x;
      const oy = outlinePos.current.y;
      
      outlinePos.current.x += (x - ox) * 0.12;
      outlinePos.current.y += (y - oy) * 0.12;

      outline.style.left = `${outlinePos.current.x}px`;
      outline.style.top = `${outlinePos.current.y}px`;

      requestRef.current = requestAnimationFrame(animate);
    };

    // Hover detection for interactive elements
    const onMouseEnter = () => {
      document.body.classList.add('cursor-hover');
    };
    const onMouseLeave = () => {
      document.body.classList.remove('cursor-hover');
    };

    const addHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, .glass-panel, .faq-summary, input, textarea, details');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });
      return interactives;
    };

    document.addEventListener('mousemove', onMouseMove);
    requestRef.current = requestAnimationFrame(animate);
    
    // Delay to allow React to render all elements
    const timeout = setTimeout(() => {
      addHoverListeners();
    }, 1000);

    // Re-add listeners periodically for dynamic content
    const interval = setInterval(() => {
      addHoverListeners();
    }, 3000);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      clearTimeout(timeout);
      clearInterval(interval);
      document.body.classList.remove('cursor-hover');
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={outlineRef} className="cursor-outline" />
    </>
  );
}
