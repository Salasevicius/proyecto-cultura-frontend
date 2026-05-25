import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './EnzoBordabehereArticle.css';

gsap.registerPlugin(ScrollTrigger);

export default function EnzoBordabehereArticle() {
  const containerRef = useRef();
  const scrollerRef = useRef();
  const announcerRef = useRef();
  const audioRef = useRef(null);
  const navigate = useNavigate();

  // 1. GESTIÓN DE AUDIO Y SMOOTH SCROLL (LENIS)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    // Sincronización estricta de fotogramas entre Lenis y el Ticker de GSAP
    const updateLenisTimeline = (time) => {
      lenis.raf(time * 1000);
    };

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(updateLenisTimeline);
    gsap.ticker.lagSmoothing(0);

    // Configuración del búfer de audio base
    const audio = new Audio('/disparo.mp3');
    audio.preload = "auto";
    audio.volume = 0.8;
    audioRef.current = audio;

    const unlockAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }).catch(e => console.log("Audio ready"));
      }
      window.removeEventListener('click', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);

    return () => {
      lenis.destroy();
      window.removeEventListener('click', unlockAudio);
      gsap.ticker.remove(updateLenisTimeline);
    };
  }, []);

  useLayoutEffect(() => {
    const cursor = document.querySelector(".custom-cursor");
    const moveCursor = (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.6, ease: "power3.out" });
    };

    let ctx = gsap.context(() => {
      const playShot = () => {
        if (audioRef.current) {
          // 1. Clonamos el nodo base para permitir ráfagas de disparos superpuestas
          const shotClone = audioRef.current.cloneNode();
          shotClone.volume = 0.6;
          
          // 2. Ejecutamos la reproducción protegiendo el flujo ante bloqueos del navegador
          shotClone.play().catch((err) => {
            console.warn("Disparo bloqueado o interrumpido:", err);
          });

          // 3. Mecanismo de recolección de basura (Garbage Collection) explícito
          shotClone.onended = () => {
            shotClone.pause();
            shotClone.src = "";     // Corta la descarga y limpia el buffer
            shotClone.load();       // Fuerza el reseteo del elemento multimedia
            shotClone.remove();     // Lo remueve por completo de la memoria del DOM
          };
        }
      };

      window.addEventListener("mousemove", moveCursor);

      const announceAct = (number, title) => {
        const actTl = gsap.timeline();
        
        actTl
          // 1. Reset total del estado (Limpieza de actos previos)
          .set(".enzo-act-announcer", { display: "flex", opacity: 0, filter: "blur(0px)", scale: 1 })
          .set([".announcer-number", ".announcer-text"], { opacity: 0, y: 30 })
          .set(".announcer-line", { scaleX: 0 })
          // 2. Inyectar contenido
          .set(".announcer-number", { textContent: number })
          .set(".announcer-text", { textContent: title })
          // 3. Aparición (Fade In)
          .to(".enzo-act-announcer", { opacity: 1, duration: 1.5, ease: "power2.inOut" })
          // 4. Animación de los textos
          .to(".announcer-number", { y: 0, opacity: 1, duration: 1.2, ease: "expo.out" }, "-=0.5")
          .to(".announcer-text", { y: 0, opacity: 1, duration: 1.2, ease: "expo.out" }, "-=1")
          .to(".announcer-line", { scaleX: 1, duration: 1.5, ease: "power4.inOut" }, "-=1")
          // 5. Salida Cinematográfica
          .to(".enzo-act-announcer", { 
              opacity: 0, 
              scale: 1.1, 
              filter: "blur(20px)", 
              duration: 1.5, 
              ease: "power2.in" 
          }, "+=1.5") 
          // 6. Cierre técnico: Escondemos el div para que no interfiera con el mouse/scroll
          .set(".enzo-act-announcer", { display: "none" });
          
        return actTl;
      };

      // --- INTERCEPTOR DE ENTORNOS SIMÉTRICOS (MATCHMEDIA) ---
      let mm = gsap.matchMedia();
      let tl;

      // 💻 UNIVERSO DESKTOP: Mantiene la experiencia inmersiva e intacta
      mm.add("(min-width: 769px)", () => {
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150000",
            pin: true,
            scrub: 1.2,
          }
        });

        // --- 0. INTRO MONUMENTAL ---
        tl.addLabel("intro")
          .from(".monumental-title .line-1", { z: -1000, opacity: 0, filter: "blur(40px)", scale: 0.8, duration: 4 }, "intro")
          .from(".monumental-title .line-2", { z: 1000, opacity: 0, filter: "blur(40px)", scale: 1.2, duration: 4 }, "intro+=0.3")
          .from(".line-divider", { scaleX: 0, transformOrigin: "center", duration: 2, ease: "expo.inOut" }, "intro+=1.5")
          .to(".hero-title-container", { x: "random(-2, 2)", y: "random(-2, 2)", duration: 0.1, repeat: 10, yoyo: true }, "+=0.5")
          .to(".enzo-hero-intro", { opacity: 0, scale: 2, filter: "blur(30px)", duration: 5, ease: "power2.in" }, "+=1")
          .set(".enzo-hero-intro", { display: "none" });

        // --- ACTO 1 (ESTRUCTURA ORIGINAL CON TELONES) ---
        tl.add(announceAct("I", "EL ESCENARIO"))
          .addLabel("acto1")
          .to(".step-1", { opacity: 1, duration: 2 }, "acto1")
          .to(".step-1 h1 span", { y: 0, duration: 2, ease: "expo.out" }, "acto1+=0.5")
          .to(".img-frame-1", { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 3, ease: "power4.inOut" }, "acto1")
          .to(".img-frame-1 img", { y: "15%", duration: 4, ease: "none" }, "acto1")
          .addLabel("telones_acto1")
          .to(".card-literary-1", { yPercent: -100, duration: 4, ease: "power2.inOut" }, "telones_acto1")
          .to(".card-literary-2", { yPercent: -100, duration: 4, ease: "power2.inOut" }, "telones_acto1+=2")
          .to(".card-multimedia", { yPercent: -100, duration: 4, ease: "power2.inOut" }, "telones_acto1+=4")
          .to({}, { duration: 2 }) 
          .to(".step-1", { opacity: 0, y: -100, duration: 2, ease: "power1.in" })
          .set(".step-1", { display: "none" });

        // --- ACTO 2: EL CONFLICTO Y EL RIEL HORIZONTAL ---
        tl.add(announceAct("II", "EL CONFLICTO"))
          .addLabel("acto2")
          .to(".step-2", { opacity: 1, duration: 2 }, "acto2")
          .to(".step-2 h1 span", { y: 0, duration: 2, ease: "expo.out" }, "acto2+=0.5")
          .to(".img-frame-2", { clipPath: "inset(0% 0% 0% 0%)", duration: 3, ease: "power4.inOut" }, "acto2")
          .to(".enzo-legend-floating", { opacity: 1, y: 10, duration: 2, ease: "power2.out" }, "acto2+=1.2")
          .fromTo(".enzo-imperial-seal", 
            { opacity: 0, x: 600, rotation: 45, scale: 2 }, 
            { opacity: 1, x: 0, rotation: -15, scale: 1, duration: 1.2, ease: "back.out(1.2)" }, "acto2+=2.2")
          .to(".img-frame-2 img", { y: "15%", duration: 4, ease: "none" }, "acto2")
          .addLabel("acto2_horizontal")
          .to(".horizontal-track", { xPercent: -50, duration: 8, ease: "power2.inOut" }, "+=1")
          .addLabel("acto2_archivo")
          .to(".horizontal-track", { opacity: 0.15, filter: "blur(20px)", scale: 0.9, duration: 3 }, "acto2_archivo")
          .fromTo(".document-overlay-layer", { y: "110%", x: 80, rotation: 12 }, { y: "0%", x: 0, rotation: -3, duration: 5, ease: "power3.out" }, "acto2_archivo+=0.5")
          .to(".paper-sheet", { boxShadow: "-25px 25px 100px rgba(0,0,0,0.8)", duration: 2 }, "-=2")
          .to({}, { duration: 2 })
          .to(".document-overlay-layer", { y: "-130%", rotation: -8, opacity: 0, duration: 4, ease: "power4.in" })
          .to(".step-2", { opacity: 0, y: -100, duration: 2 }, "-=1")
          .set(".step-2", { display: "none" });

        // --- ACTO 3: EL FISCAL ---
        tl.add(announceAct("III", "EL FISCAL"))
          .addLabel("acto3")
          .to(".step-3", { opacity: 1, duration: 2 }, "acto3")
          .from(".central-avatar", { scale: 0.7, opacity: 0, rotation: -15, duration: 3, ease: "expo.out" }, "acto3")
          .from(".left-side", { x: -80, opacity: 0, duration: 2 }, "acto3+=0.5")
          .from(".right-side", { x: 80, opacity: 0, duration: 2 }, "acto3+=0.8")
          .to(".step-3 h1 span", { y: 0, duration: 2, ease: "expo.out" }, "acto3+=1")
          .from(".enzo-placa-anim", { y: 200, scale: 1.4, opacity: 0, duration: 2.5, ease: "power4.out" }, "acto3+=1.8")
          .to(".placa-content-inner", { opacity: 1, duration: 1.5, ease: "power2.inOut" }, "acto3+=3.5")
          .addLabel("transicion_factica")
          .set(".step-3-factive", { yPercent: 100, opacity: 1, visibility: "visible", zIndex: 100 })
          .to(".step-3", { yPercent: -100, duration: 6, ease: "power2.inOut" }, "+=4")
          .to(".step-3-factive", { yPercent: 0, duration: 6, ease: "power2.inOut" }, "<")
          .to({}, { duration: 2 }) 
          .to(".step-3-factive", { opacity: 0, filter: "blur(15px)", scale: 1.05, duration: 2, ease: "power2.in" });

        // --- ACTO 4 ---
        tl.add(announceAct("IV", "EL ACECHO"))
          .addLabel("acto4")
          .to(".step-4", { opacity: 1, duration: 2 }, "acto4")
          .to(".step-4 h1 span", { y: 0, duration: 2, ease: "expo.out" }, "acto4+=0.5")
          .to(".img-frame-4", { clipPath: "inset(0% 0% 0% 0%)", duration: 3, ease: "power4.inOut" }, "acto4")
          .to(".img-frame-4 img", { y: "15%", duration: 4, ease: "none" }, "acto4")
          .to(".step-4, .img-frame-4", { opacity: 0, filter: "blur(20px)", duration: 3 }, "+=4");

        // --- ACTO 5 ---
        tl.add(announceAct("V", "EL SACRIFICIO"))
          .addLabel("crimen")
          .to(".enzo-bg-overlay", { filter: "grayscale(100%) brightness(0.1) contrast(3)", duration: 2 }, "crimen")
          .call(playShot)
          .to(".flash-impact", { opacity: 1, duration: 0.05 })
          .to(containerRef.current, { x: "random(-20, 20)", y: "random(-10, 10)", rotation: "random(-1, 1)", duration: 0.05, repeat: 5, yoyo: true }, "-=0.05")
          .to(".flash-impact", { opacity: 0.3, duration: 0.5 })
          .call(playShot, null, "+=0.4")
          .to(".flash-impact", { opacity: 1, duration: 0.05 })
          .to(containerRef.current, { x: "random(-30, 30)", y: "random(-15, 15)", rotation: "random(-2, 2)", duration: 0.04, repeat: 8, yoyo: true }, "-=0.05")
          .to(".flash-impact", { opacity: 0.4, duration: 0.8 })
          .call(playShot, null, "+=0.6")
          .to(".flash-impact", { backgroundColor: "rgba(180, 0, 0, 0.5)", opacity: 1, duration: 0.05 })
          .to(containerRef.current, { x: "random(-40, 40)", y: "random(-20, 20)", scale: 1.03, duration: 0.04, repeat: 12, yoyo: true }, "-=0.05")
          .add(() => {
            const title = document.querySelector(".blood-title");
            if (title && !title.querySelector('.blood-container')) {
              const bloodCont = document.createElement("div");
              bloodCont.className = "blood-container";
              title.appendChild(bloodCont);
              for (let i = 0; i < 8; i++) {
                const drop = document.createElement("div");
                drop.className = "blood-drop";
                drop.style.left = `${10 + (i * 12)}%`; 
                bloodCont.appendChild(drop);
                gsap.to(drop, { opacity: 1, y: 280, scaleY: 25, scaleX: 0.6, duration: 4 + Math.random() * 2, ease: "power2.in", delay: Math.random() * 1 });
              }
            }
          }, "crimen+=1.2")
          .to(".flash-impact", { opacity: 0, duration: 6, ease: "power2.inOut" }, "+=0.2")
          .to(".step-5", { opacity: 1, filter: "blur(0px)", duration: 4 }, "-=5.5")
          .to(".step-5 h1 span", { y: 0, duration: 3 }, "-=5")
          .to(".img-frame-5", { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, scale: 1, duration: 5 }, "-=6")
          .to(".step-5, .img-frame-5", { opacity: 0, y: 50, filter: "blur(10px)", duration: 3 }, "+=2");

        // --- ACTO 6 ---
        tl.add(announceAct("VI", "EL OCASO"))
          .addLabel("ocaso")
          .to(".step-6", { opacity: 1, duration: 3 }, "ocaso")
          .to(".step-6 h1 span", { y: 0, duration: 2.5 }, "ocaso+=0.5")
          .to(".img-frame-6", { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 4 }, "ocaso")
          .to(".img-frame-6 img", { scale: 1.2, filter: "grayscale(100%)", duration: 6 }, "ocaso")
          .to(".step-6, .img-frame-6", { opacity: 0, y: 30, duration: 3 }, "+=3");

        // --- ACTO 7 ---
        tl.add(announceAct("VII", "EL DUELO"))
          .addLabel("duelo")
          .to(".step-7", { opacity: 1, duration: 3 }, "duelo")
          .to(".step-7 h1 span", { y: 0, duration: 2.5 }, "duelo+=0.5")
          .to(".img-frame-7", { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, scale: 0.9, duration: 4 }, "duelo")
          .to(".step-7, .img-frame-7", { opacity: 0, filter: "blur(15px)", duration: 4 }, "+=3");

        // --- ACTO 8 ---
        tl.add(announceAct("VIII", "LA MEMORIA"))
          .addLabel("final")
          .to(".indigo-bg-overlay", { filter: "grayscale(100%) brightness(0.01)", duration: 5 }, "final")
          .to(".step-8", { opacity: 1, duration: 4 }, "final+=1")
          .to(".step-8 h1 span", { y: 0, duration: 4 }, "final+=2")
          .to(".img-frame-8", { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 6 }, "final")
          .to(".img-frame-8 img", { scale: 1.05, filter: "grayscale(100%) brightness(0.4)", duration: 10 }, "final");
      });

      // 📱 UNIVERSO MOBILE: Rendimiento optimizado sin perder la lógica dramática de las transiciones
      mm.add("(max-width: 768px)", () => {
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=16000", 
            pin: true,
            scrub: 0.6,
          }
        });

        // --- 0. INTRO MONUMENTAL MOBILE ---
        tl.addLabel("intro")
          .from(".monumental-title .line-1", { opacity: 0, y: -30, duration: 3 }, "intro")
          .from(".monumental-title .line-2", { opacity: 0, y: 30, duration: 3 }, "intro+=0.3")
          .to(".enzo-hero-intro", { opacity: 0, duration: 3, ease: "power2.in" }, "+=1")
          .set(".enzo-hero-intro", { display: "none" });

        // --- ACTO 1 MOBILE ---
        tl.add(announceAct("I", "EL ESCENARIO"))
          .to(".step-1", { opacity: 1, duration: 2 })
          .to(".step-1 h1 span", { y: 0, duration: 1.5 })
          .to(".card-literary-1", { yPercent: -100, duration: 3 })
          .to(".card-literary-2", { yPercent: -100, duration: 3 })
          .to(".card-multimedia", { yPercent: -100, duration: 3 })
          .to(".step-1", { opacity: 0, duration: 1.5 })
          .set(".step-1", { display: "none" });

        // --- ACTO 2 MOBILE ---
        tl.add(announceAct("II", "EL CONFLICTO"))
          .to(".step-2", { opacity: 1, duration: 2 })
          .to(".step-2 h1 span", { y: 0, duration: 1.5 })
          .to(".horizontal-track", { xPercent: -66.66, duration: 8, ease: "power1.inOut" }, "+=1") 
          .to(".horizontal-track", { opacity: 0.2, duration: 2 })
          .fromTo(".document-overlay-layer", { y: "110%" }, { y: "0%", duration: 4, ease: "power2.out" })
          .to({}, { duration: 2 })
          .to(".document-overlay-layer", { y: "-110%", opacity: 0, duration: 3 })
          .to(".step-2", { opacity: 0, duration: 1.5 })
          .set(".step-2", { display: "none" });

        // --- ACTO 3 MOBILE ---
        tl.add(announceAct("III", "EL FISCAL"))
          .to(".step-3", { opacity: 1, duration: 2 })
          .to(".step-3 h1 span", { y: 0, duration: 1.5 })
          .set(".step-3-factive", { yPercent: 100, opacity: 1, visibility: "visible", zIndex: 100 })
          .to(".step-3", { yPercent: -100, duration: 4, ease: "power2.inOut" }, "+=2")
          .to(".step-3-factive", { yPercent: 0, duration: 4, ease: "power2.inOut" }, "<")
          .to({}, { duration: 2 })
          .to(".step-3-factive", { opacity: 0, duration: 1.5 });

        // --- ACTO 4 MOBILE ---
        tl.add(announceAct("IV", "EL ACECHO"))
          .to(".step-4", { opacity: 1, duration: 2 })
          .to(".step-4 h1 span", { y: 0, duration: 1.5 })
          .to(".step-4", { opacity: 0, duration: 1.5 }, "+=2");

        // --- ACTO 5 MOBILE ---
        tl.add(announceAct("V", "EL SACRIFICIO"))
          .to(".enzo-bg-overlay", { filter: "brightness(0.1)", duration: 1 })
          .call(playShot)
          .to(".flash-impact", { opacity: 1, duration: 0.05 })
          .to(".flash-impact", { opacity: 0, duration: 0.4 })
          .to(".step-5", { opacity: 1, duration: 2 })
          .to(".step-5 h1 span", { y: 0, duration: 1.5 })
          .to(".step-5", { opacity: 0, duration: 1.5 }, "+=2");

        // --- ACTO 6 MOBILE ---
        tl.add(announceAct("VI", "EL OCASO"))
          .to(".step-6", { opacity: 1, duration: 2 })
          .to(".step-6 h1 span", { y: 0, duration: 1.5 })
          .to(".step-6", { opacity: 0, duration: 1.5 }, "+=2");

        // --- ACTO 7 MOBILE ---
        tl.add(announceAct("VII", "EL DUELO"))
          .to(".step-7", { opacity: 1, duration: 2 })
          .to(".step-7 h1 span", { y: 0, duration: 1.5 })
          .to(".step-7", { opacity: 0, duration: 1.5 }, "+=2");

        // --- ACTO 8 MOBILE ---
        tl.add(announceAct("VIII", "LA MEMORIA"))
          .to(".step-8", { opacity: 1, duration: 2 })
          .to(".step-8 h1 span", { y: 0, duration: 2 });
      });

      // Efecto de paralaje: Exclusivo para Desktop para proteger los FPS del hilo móvil
      if (window.innerWidth > 768) {
        gsap.to(".img-frame", { y: (i) => (i % 2 === 0 ? -30 : 30), ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom bottom", scrub: true } });
      }
    }, containerRef);

    return () => { 
      ctx.revert(); 
      window.removeEventListener("mousemove", moveCursor); 
    };
  }, []);
  
  return (
    <div ref={containerRef} className="enzo-full-wrapper">
      {/* CAPA ANUNCIADORA DE ACTOS */}
      <div className="enzo-act-announcer" ref={announcerRef}>
        <div className="announcer-content">
          <span className="announcer-number"></span>
          <h2 className="announcer-text"></h2>
          <div className="announcer-line"></div>
        </div>
      </div>

      <div className="enzo-bg-overlay"></div>
      <div className="enzo-vignette"></div>
      <div className="flash-impact"></div>
      <button className="enzo-back-btn" onClick={() => navigate(-1)}><ArrowLeft size={20} /> <span>Volver</span></button>
      <div className="enzo-watermark-bg">1935</div>
      <div ref={scrollerRef} className="enzo-scrolly-content">

        <section className="enzo-hero-intro">
          <div className="hero-title-container">
            <h1 className="monumental-title">
              <span className="line-1">ROCA • RUNCIMAN</span>
              <span className="line-divider"></span>
              <span className="line-2">DE LA TORRE <small>&</small> BORDABEHERE</span>
            </h1>
            <div className="hero-subtitle">UNA CRÓNICA SANGRIENTA EN EL SENADO</div>
          </div>
        </section>

        <section className="enzo-step step-1 layout-full-height">
          <div className="step-text-content">
            <span className="enzo-accent-title">I. EL ESCENARIO</span>
            <h1><span>LA DÉCADA DEL OPROBIO</span></h1>
            <p className="lead-text">Argentina, 1935. Bajo el cielo de plomo de la "Década Infame", la República es un teatro de sombras.</p>
            <p>El fraude patriótico y la corrupción institucionalizada marcaban el pulso de un país donde la voluntad popular era un mero trámite ignorado. Las urnas no eran más que recipientes de una democracia de cartón piedra, mientras en los pasillos de un Senado alfombrado de soberbia se tejían acuerdos espurios que hipotecaban el futuro de la nación. Bajo las luminarias de cristal, el aire se espesaba con la frialdad de quienes entendían la política como un mecanismo de administración de privilegios dinásticos.</p>
          </div>
          <div className="img-frame img-frame-1"><img src="/senado.webp" alt="Senado" /></div>

          {/* CONTENEDOR DE TELONES (Se mantiene fiel a tu estructura) */}
  <div className="act1-curtains-container">
    <article className="curtain-card card-literary-1">
      <div className="curtain-inner">
        <h2 className="curtain-title">El clima de Época</h2>
        <div className="curtain-body">
          <p>La Argentina de los años 30 era un péndulo oscilando entre la opulencia de la oligarquía ganadera y el murmullo creciente de una masa trabajadora aún sin cauce. El trauma del primer golpe de Estado en 1930 había inaugurado una era de desconfianza profunda, donde el desalojo violento del orden constitucional y el asfixiante colapso de las exportaciones tras la Gran Depresión terminaron de erosionar los lazos entre el pueblo y sus instituciones. En las calles, el aire olía a hollín y a incertidumbre; en los despachos, el "fraude patriótico" se justificaba como un mal necesario para salvar a la República de sí misma frente a la amenaza de un desborde popular que la élite temía y despreciaba. Este orden conservador, blindado por el acero de las fuerzas de seguridad y el silencio de los tribunales, se preparaba para su choque más violento, mientras el eco de los intereses británicos consolidado en el pacto Roca-Runciman dictaba una soberanía de rodillas y el descontento social comenzaba a filtrar su veneno por las grietas de un sistema que ya no podía contener sus propias contradicciones.
</p>
        </div>
      </div>
    </article>

    <article className="curtain-card card-literary-2">
      <div className="curtain-inner">
        <h2 className="curtain-title">El Enclave de los Frigoríficos</h2>
        <div className="curtain-body">
          <p>Mientras el país se hundía en la dependencia, el puerto de Buenos Aires y los frigoríficos anglo-americanos operaban como Estados dentro del Estado. No eran solo empresas; eran los arquitectos de un sistema de drenaje de riqueza que convertía a la ganadería argentina en una sucursal del Imperio Británico. Lisandro de la Torre no solo atacaba un negocio, estaba atacando la columna vertebral de la impunidad que sostenía a toda una clase dirigente, desafiando un entramado de sobornos y silencios que no dudaría en recurrir a la violencia para proteger sus privilegios, mientras la soberanía nacional se remataba en los despachos oficiales bajo la mirada cómplice de un régimen agonizante que observaba, con pavor, cómo el descontento popular comenzaba a desbordar los diques de su propia contención política.</p>
        </div>
      </div>
    </article>

   <article className="curtain-card card-multimedia">
  <div className="curtain-inner">
    <span className="curtain-meta">Registros Históricos</span>
    <h2 className="curtain-title">Fuentes Audiovisuales</h2>
    
    <div className="video-grid-modern">
      {/* VIDEO PRINCIPAL (HERO) */}
      <div className="video-slot main-hero-video">
        <iframe 
          className="video-element"
          src="https://www.youtube.com/embed/tvMOUR7mKLA?autoplay=1&mute=1&controls=0&loop=1&playlist=tvMOUR7mKLA&modestbranding=1&rel=0&iv_load_policy=3" 
          frameBorder="0"
          allow="autoplay; encrypted-media"
        ></iframe>
      </div>

      {/* FILA INFERIOR */}
      <div className="secondary-videos-row">
        <div className="video-slot secondary-video">
          <iframe 
            className="video-element"
            src="https://www.youtube.com/embed/jDQxhGjFWgM?autoplay=1&mute=1&controls=0&loop=1&playlist=jDQxhGjFWgM&modestbranding=1" 
            frameBorder="0"
            allow="autoplay"
          ></iframe>
        </div>

        <div className="video-slot secondary-video">
          <iframe 
            className="video-element"
            src="https://www.youtube.com/embed/GjMKPlOyYyQ?autoplay=1&mute=1&controls=0&loop=1&playlist=GjMKPlOyYyQ&modestbranding=1" 
            frameBorder="0"
            allow="autoplay"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</article>
  </div>
  </section>
        
       <section className="enzo-step step-2 layout-offset-right">
  {/* El track contiene todo lo que se mueve lateralmente */}
  <div className="horizontal-track">
    
    {/* SLIDE A: PRESENTACIÓN ORIGINAL (LA QUE YA TIENES) */}
    <div className="slide presentation-slide">
      <div className="step-2-base-content" style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-around' }}>
        <div className="img-column"> 
          <div className="img-frame img-frame-2"><img src="/runciman.webp" alt="Pacto" /></div>
          <div className="enzo-imperial-seal"><img src="/sello-britanico.webp" alt="Sello Imperial" /></div>
          <div className="enzo-legend-floating">El vicepresidente de Argentina, Julio A. Roca (h), visando el borrador del tratado en compañía de Walter Runciman, en la sala de conferencias del Ministerio de Comercio.</div>
        </div>
        <div className="step-text-content">
          <span className="enzo-accent-title">II. EL CONFLICTO</span>
          <h1><span>EL PACTO DE LA ENTREGA</span></h1>
          <p className="lead-text">El pacto Roca-Runciman no fue diplomacia; fue una capitulación económica absoluta.</p>
          <p>Los frigoríficos ingleses dictaban las reglas mientras el sector ganadero se arrodillaba ante el Imperio. Bajo el pacto Roca-Runciman, la rentabilidad británica se garantizaba asfixiando a los productores locales. Esta capitulación fue el "estatuto del coloniaje": una trama donde el Estado garantizaba la expoliación sistemática, priorizando capitales extranjeros sobre el interés nacional.</p>
        </div>
      </div>
    </div>

    {/* SLIDE B: NUEVA EXPANSIÓN HORIZONTAL (DOS COLUMNAS) */}
    <div className="slide information-slide">
      <div className="two-columns-text">
        <div className="column">
          <span className="enzo-accent-title">ANÁLISIS DE PODER</span>
          <p>
    La firma del Tratado Roca-Runciman el 1 de mayo de 1933 consolidó una asimetría comercial sin precedentes bajo la presión de la Gran Depresión y las barreras arancelarias impuestas por el Imperio Británico en la Conferencia de Ottawa de 1932. En los términos del acuerdo, el Estado argentino aceptó que el 85% de la cuota de exportación de carne enfriada (chilled beef) fuera gestionada exclusivamente a través de frigoríficos extranjeros, principalmente británicos y estadounidenses (como Swift, Armour y Anglo). Solo un marginal 15% fue reservado para frigoríficos nacionales, e incluso esa cuota debía comercializarse mediante buques y canales de distribución controlados por el Reino Unido, despojando a la Argentina de cualquier autonomía logística sobre su principal producto de exportación.
  </p>
  <p>
    Esta subordinación se profundizó mediante cláusulas financieras que afectaron directamente la soberanía monetaria. El pacto estableció que la totalidad de las divisas generadas por las exportaciones argentinas a Gran Bretaña debían ser destinadas a la importación de productos británicos, el pago de servicios de la deuda externa y el giro de utilidades de las empresas ferroviarias y de servicios públicos ingleses. En 1933, mientras Argentina poseía una cobertura de oro de casi el 45% sobre su circulación monetaria, la libre disponibilidad de esas libras quedó bloqueada por el control de cambios subordinado al Tesoro Británico. Esta "triangulación" obligó al país a financiar el déficit de la metrópoli, impidiendo la acumulación de capital interno y asfixiando cualquier intento de industrialización por sustitución de importaciones durante la década.
  </p>
        </div>
        <div className="column">
          <span className="enzo-accent-title">EL COSTO SOCIAL</span>
          <p>
    Mientras en los salones del Hotel Dorchester se celebraba la "complementariedad" económica, en nodos exportadores estratégicos como Rosario se consolidaba un modelo de enclave. El pacto ratificó la exención de derechos de aduana para materiales destinados a los ferrocarriles británicos (como el Central Argentino y el Ferrocarril del Sud), lo que destruyó cualquier posibilidad de competencia para las metalúrgicas locales. Bajo la denominada "cláusula de benevolencia", el Estado argentino se comprometió a no aumentar los impuestos internos a los productos manufacturados en el Reino Unido, congelando la estructura tributaria del país en beneficio de la industria extranjera y condenando a los talleres locales a una obsolescencia forzada por decreto.
  </p>
  <p>
    El costo de este "Estatuto del Coloniaje" recayó directamente sobre la clase trabajadora y los productores regionales. El acuerdo garantizó que las utilidades de las empresas de servicios públicos inglesas, como la Compañía Primitiva de Gas o las empresas de tranvías, fueran remitidas a Londres a tipos de cambio preferenciales, financiadas mediante tarifas elevadas y una carga impositiva indirecta sobre el consumo interno. Este blindaje jurídico a la rentabilidad británica —que incluía el control de puertos y elevadores de granos— convirtió al progreso nacional en un subproducto residual de la prosperidad del Imperio. Esta arquitectura de subordinación, documentada en las actas de 1933, sería el eje central de las denuncias de Lisandro de la Torre durante el debate de las carnes en 1935, revelando el sistema de corrupción y evasión fiscal que sustentaba el pacto.
  </p>
        </div>
      </div>
    </div>

  </div>

  {/* EXPEDIENTE (Aparece desde abajo después del movimiento horizontal) */}
  <div className="document-overlay-layer">
    <article className="intelligence-folder">
      <div className="folder-tab">EXP. N° 1935-BC-02</div>
      <div className="paper-sheet">
        <div className="paper-header">
          <span className="archive-stamp-red">DE-CLASIFICADO</span>
          <div className="metadata-grid">
            <div><strong>ASUNTO:</strong> Subordinación Económica Nacional</div>
            <div><strong>FECHA:</strong> 1° de Mayo, 1933 (Firma en Londres)</div>
            <div><strong>ESTADO:</strong> Protocolo de Entrega Vigente</div>
            <div><strong>OPERATIVO:</strong> Frigoríficos Anglo-Americanos</div>
          </div>
        </div>
        <div className="paper-body">
          <h2 className="typewriter-title">ANEXO A: LAS CLÁUSULAS INCONFESABLES</h2>
          <p className="typewriter-text">El acuerdo subordinó la soberanía argentina bajo tres ejes sistémicos que beneficiaban exclusivamente al Tesoro Británico:</p>
          <ul className="typewriter-list">
            <li><strong>EL CUPO DE LA VERGÜENZA:</strong> El 85% de la exportación de carne debía realizarse a través de frigoríficos extranjeros.</li>
            <li><strong>ESTATUTO DEL COLONIAJE:</strong> Argentina se comprometió a no aumentar aranceles a manufacturas inglesas y a otorgar "trato benévolo" a sus ferrocarriles.</li>
            <li><strong>CONTROL DE REMESAS:</strong> Prioridad absoluta para que las empresas británicas enviaran utilidades a Londres antes de cualquier necesidad local.</li>
          </ul>
          <blockquote className="historical-quote">
            "La Argentina, por su destino económico, es una parte integrante del Imperio Británico."
            <cite>— Julio A. Roca (h), Londres, 1933.</cite>
          </blockquote>
          <div className="archive-footer">
            <div className="sources-box">
              <h4>FUENTES CONSULTADAS:</h4>
              <ul>
                <li>• De la Torre, L. - "Intervenciones en el Senado (1935)".</li>
                <li>• Jauretche, A. - "El Estatuto del Coloniaje".</li>
                <li>• Ortiz, R. S. - "Política Británica en el Río de la Plata".</li>
              </ul>
            </div>
            <div className="fingerprint-seal">
              <div className="dactilar"></div>
              <span>ARCHIVO GENERAL</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</section>

        <section className="enzo-step step-3 layout-triptych">
          <div className="step-text-content side-block left-side">
            <span className="enzo-accent-title">III. EL FISCAL</span>
            <h1><span>EL RIGOR DE DE LA TORRE</span></h1>
            <p className="lead-text">Lisandro de la Torre desnudó la trama con precisión quirúrgica.</p>
            <p>Desde su banca solitaria, convertida en el último bastión de la ética pública, el senador santafesino desnudó la arquitectura del contrabando de carnes y la evasión impositiva de los frigoríficos anglo-americanos. Con la precisión de quien no teme a las represalias del poder, fue desenterrando los expedientes ocultos y poniendo nombres, apellidos y cifras a la vergüenza nacional. Su voz, un eco de integridad en un recinto habituado al susurro espurio, transformó la impunidad de los ministros en evidencia pública, demostrando que detrás del 'fraude patriótico' no había patria, sino un sofisticado mecanismo de saqueo institucionalizado.</p>
          </div>
          <div className="central-avatar">
            <div className="ornamental-frame">
              <img src="/delatorre.webp" alt="Lisandro de la Torre" />
              <div className="fileteado-overlay"></div>
            </div>
            <div className="placa-final enzo-placa-anim">
              <img src="/placa-metal.webp" className="placa-fondo-img" alt="Marco de bronce" />
            </div>
          </div>
          <div className="step-text-content side-block right-side">
            <p>El recinto se convirtió en un campo de batalla dialéctico donde la razón pura chocaba sistemáticamente contra el muro de granito del silencio oficialista. No se trataba de un mero cruce de intereses comerciales, sino del último y desesperado estertor de una aristacia ganadera que contemplaba, entre el asombro y la furia, cómo un solo hombre, pertrechado únicamente con la verdad documental, ponía en jaque el complejo andamiaje de un régimen que se creía eterno. Aquella estructura de poder, cimentada sobre el fraude y la genuflexión ante el capital extranjero, crujía bajo el peso de la evidencia técnica que brotaba de la banca de De la Torre. La atmósfera, saturada de una tensión eléctrica casi tangible y espesada por el humo de los habanos, presagiaba que la elocuencia y la palabra ya habían agotado su utilidad histórica. En el aire flotaba la premonición de un desenlace violento: la certeza de que una historia construida sobre la claudicación nacional ya no se conformaba con discursos, sino que exigía un bautismo de sangre para sellar, de manera definitiva, su propia e irreversible impunidad.</p>
          </div>
        </section>

        {/* NUEVA SECCIÓN: ESPACIO PROPIO PARA EL TEXTO FÁCTICO */}
<section className="enzo-step step-3-factive">
  <div className="two-columns-factive-content">
    <div className="column">
      <span className="enzo-accent-title">LA COMISIÓN INVESTIGADORA</span>
      <p>
            La labor de Lisandro de la Torre se centró en desarticular el complejo esquema de evasión fiscal, cartelización y transgresión cambiaria que los frigoríficos extranjeros del pool anglo-estadounidense operaban bajo el amparo político del gobierno del presidente Agustín P. Justo, en el marco del cuestionado Tratado Roca-Runciman de 1933. Al iniciarse el debate de la Comisión Investigadora del Comercio de Carnes en el Senado en septiembre de 1934, el legislador demócrata progresista logró demostrar que la empresa de capitales británicos Frigorífico Anglo (perteneciente al grupo Vestey Brothers) subfacturaba sistemáticamente sus exportaciones de carne enfriada (chilled beef). Mediante la adulteración de los manifiestos de carga y la contabilidad paralela (oculta bajo la rúbrica de «Beef C» en los archivos confiscados en el buque Norman Star), la firma declaraba valores FOB en el Puerto de Buenos Aires hasta un 30% menores a los precios reales de venta mayorista en el mercado de Smithfield, en Londres.
            Esta maniobra de precios de transferencia no solo damnificaba de forma directa al fisco argentino en concepto del recientemente creado Impuesto a los Réditos (Ley 11.682) y mediante la liquidación fraudulenta de divisas en el mercado oficial de cambios controlado por el Banco Central en formación, sino que permitía a la casa matriz británica capturar de manera espuria la renta extraordinaria de la cadena de valor.
          </p>
    </div>
    <div className="column">
      <span className="enzo-accent-title">LOS LIBROS DEL "NORMAN STAR"</span>
      <p>
            El hallazgo más contundente ocurrió durante la incautación de la documentación del buque "Norman Star". De la Torre presentó ante el Senado copias de la contabilidad doble del frigorífico Anglo, donde se detallaban los pagos de "gastos reservados" y favores a altos funcionarios de la administración de Agustín P. Justo. Los documentos demostraban una evasión superior a los 100 millones de pesos, orquestada mediante la complicidad del Ministro de Agricultura, Luis Duhau, y el Ministro de Hacienda, Federico Pinedo. Estas pruebas técnicas transformaron el debate político en una denuncia penal de facto, exponiendo la vulnerabilidad del Estado frente al capital trasnacional.
          </p>
           <div className='img-norman-star'>
              <img src="/normanstar.webp" alt="Lisandro de la Torre" />
              <div></div>
              </div>
    </div>
  </div>
</section>

        <section className="enzo-step step-4">
          <div className="img-frame img-frame-4"><img src="/recintosenado.jpeg" alt="Recinto" /></div>
          <div className="step-text-content">
            <span className="enzo-accent-title">IV. EL ACECHO</span>
            <h1><span>EL AIRE SE VUELVE PLOMO</span></h1>
            <p className="lead-text">23 de julio. El recinto es una olla a presión cargada de cinismo y humo de habanos.</p>
            <p>La tensión era palpable. Los ministros acorralados no buscaban argumentos, buscaban silenciar el grito de justicia de cualquier manera.</p>
          </div>
        </section>

        <section className="enzo-step step-5">
          <div className="step-text-content">
            <span className="enzo-accent-title">V. EL SACRIFICIO</span>
            <h1 className="blood-title"><span>TRES <span>BALAS</span> EN LA <span>ESPALDA</span></span></h1>
            <p className="lead-text">Enzo Bordabehere interpone su cuerpo en un acto de lealtad absoluta.</p>
            <p>Ramón Valdez Cora desenfunda en medio del caos. Bordabehere se cruza para proteger a su mentor, recibiendo los impactos destinados a la verdad.</p>
          </div>
          <div className="img-frame img-frame-5"><img src="/bordabehere-rosario.webp" alt="Sacrificio" /></div>
        </section>

        <section className="enzo-step step-6">
          <div className="img-frame img-frame-6"><img src="/enzo.webp" alt="Ocaso" /></div>
          <div className="step-text-content">
            <span className="enzo-accent-title">VI. EL OCASO</span>
            <h1><span>EL SILENCIO SEPULCRAL</span></h1>
            <p className="lead-text">Tras el estrépito, el vacío. Enzo cae sobre la alfombra carmesí del recinto.</p>
            <p>La sangre teñía los mármoles del Senado. El debate se detuvo abruptamente, pero el daño a la democracia ya era irreversible.</p>
          </div>
        </section>

        <section className="enzo-step step-7">
          <div className="step-text-content">
            <span className="enzo-accent-title">VII. EL DUELO</span>
            <h1><span>EL REGRESO DEL HIJO</span></h1>
            <p className="lead-text">Rosario recibe a su hijo ante un dolor colectivo inimaginable.</p>
            <p>Una multitud silenciosa despidió al mártir. El río Paraná fue testigo del regreso de un hombre cuya integridad el país no supo custodiar.</p>
          </div>
          <div className="img-frame img-frame-7"><img src="/senado.webp" alt="Regreso" /></div>
        </section>

        <section className="enzo-step step-8">
          <div className="img-frame img-frame-8"><img src="/funeralenzo.jpeg" alt="Memoria" /></div>
          <div className="step-text-content">
            <span className="enzo-accent-title">VIII. LA MEMORIA</span>
            <h1 className="final-title"><span>EL ECO DE LA DIGNIDAD</span></h1>
            <p className="lead-text">Su nombre es una advertencia latente casi un siglo después.</p>
            <p>La figura de Bordabehere sigue exigiendo la decencia que la historia nos adeuda. La libertad se paga con el sacrificio de los mejores.</p>
          </div>
        </section>
      </div>
      <div className="enzo-scroll-indicator"><span>Desliza para exhumar la memoria</span><div className="mouse-icon"></div></div>
      <div className="custom-cursor"></div>
    </div>
  );
}