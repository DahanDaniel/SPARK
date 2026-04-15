import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

/**
 * TiltCard — wraps children with a vanilla-tilt 3D tilt effect.
 * Automatically disables on mobile/touch devices.
 */
export default function TiltCard({ children, className = '', style = {}, options = {} }) {
  const tiltRef = useRef(null);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;

    // Skip on mobile
    if (window.matchMedia('(max-width: 1024px)').matches) return;
    if ('ontouchstart' in window) return;

    const defaultOptions = {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.15,
      scale: 1.02,
      perspective: 1000,
      gyroscope: false,
    };

    VanillaTilt.init(el, { ...defaultOptions, ...options });

    return () => {
      if (el.vanillaTilt) {
        el.vanillaTilt.destroy();
      }
    };
  }, [options]);

  return (
    <div ref={tiltRef} className={`tilt-card ${className}`} style={style}>
      <div className="tilt-card-inner">
        {children}
      </div>
    </div>
  );
}
