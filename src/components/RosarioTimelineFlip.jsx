import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import './RosarioTimelineFlip.css';

gsap.registerPlugin(Flip);

const EFEMERIDES = [
  { id: 1, year: '1852', title: 'Ciudad de Rosario', desc: 'Declaración oficial de Rosario como ciudad.', img: 'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?q=80&w=1000' },
  { id: 2, year: '1930', title: 'La Chicago Argentina', desc: 'Auge del puerto y el comercio de granos.', img: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000' }
];

export default function RosarioTimelineFlip() {
  const [activeId, setActiveId] = useState(null);
  const containerRef = useRef();

  const toggleCard = (id) => {
    const state = Flip.getState(".flip-card, .flip-content");
    setActiveId(activeId === id ? null : id);
    
    Flip.from(state, {
      duration: 0.8,
      ease: "expo.out",
      absolute: true
    });
  };

  return (
    <section className="flip-container" ref={containerRef}>
      <h2 className="flip-section-title">CRONOLOGÍA URBANA</h2>
      <div className="flip-grid">
        {EFEMERIDES.map(item => (
          <div 
            key={item.id} 
            className={`flip-card ${activeId === item.id ? 'is-expanded' : ''}`}
            onClick={() => toggleCard(item.id)}
          >
            <div className="flip-content">
              <img src={item.img} alt={item.title} className="flip-img" />
              <div className="flip-text">
                <span className="flip-year">{item.year}</span>
                <h3>{item.title}</h3>
                {activeId === item.id && <p className="flip-desc">{item.desc}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}