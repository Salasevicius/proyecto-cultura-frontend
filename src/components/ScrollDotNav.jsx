import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const ScrollDotNav = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const observerOptions = {
      root: null,
      // Radar de detección: actúa cuando el elemento está entre el 20% y el 50% de la pantalla
      rootMargin: '-20% 0px -50% 0px',
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
      duration: 1.8, 
      scrollTo: { y: targetY, autoKill: false },
      ease: "power4.inOut" 
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