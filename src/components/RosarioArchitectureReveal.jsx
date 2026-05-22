import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './RosarioArchitectureReveal.css';

export default function RosarioArchitectureReveal() {
  const textRef = useRef();

  useLayoutEffect(() => {
    gsap.to(".reveal-line", {
      y: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%"
      }
    });
  }, []);

  return (
    <section className="reveal-wrapper" ref={textRef}>
      <div className="mask-container">
        <h2 className="reveal-line">PIELES DE</h2>
      </div>
      <div className="mask-container">
        <h2 className="reveal-line highlight">HORMIGÓN</h2>
      </div>
      <div className="mask-container">
        <h2 className="reveal-line">Y BRONCE</h2>
      </div>
      <p className="reveal-sub">La herencia Art-Decó del Palacio Minetti y la Estación Rosario Norte.</p>
    </section>
  );
}