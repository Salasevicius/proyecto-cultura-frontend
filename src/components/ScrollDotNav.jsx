import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const ScrollDotNav = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -45% 0px', // Franja de detección optimizada
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id) => {
    const targetY = id === 'anchor-top' ? 0 : `#${id}`;
    
    gsap.to(window, {
      duration: 2.5, // Tiempo extendido para efecto etéreo
      scrollTo: { 
        y: targetY, 
        autoKill: true 
      },
      ease: "power4.inOut", // Curva cinemática aceleración/desaceleración lenta
      overwrite: "auto"
    });
  };

  return (
    <nav className="dot-nav-container">
      {sections.map((sec) => (
        <button
          key={sec.id}
          className={`dot-nav-item ${activeSection === sec.id ? 'active' : ''}`}
          onClick={() => scrollTo(sec.id)}
        >
          <div className="dot-nav-circle"></div>
        </button>
      ))}
    </nav>
  );
};

export default ScrollDotNav;