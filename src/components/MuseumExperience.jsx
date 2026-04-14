import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, Float, Sparkles, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { HorseHead } from "./Horsehead"
import './MuseumExperience.css'

export default function MuseumExperience() {
  return (
    /* Eliminamos cualquier estilo en línea de altura aquí para que mande el CSS */
    <div className="museum-wrapper">
      <div className="museum-sticky-container">
        <Canvas shadows camera={{ position: [0, 0, 6], fov: 25 }}>
          <color attach="background" args={['#050505']} />
          
          <spotLight position={[15, 15, 15]} angle={0.15} penumbra={1} intensity={3} castShadow />
          <rectAreaLight position={[-10, 0, 5]} width={20} height={20} intensity={2} color="#d2b48c" />

          <Suspense fallback={null}>
            <ScrollControls pages={3} damping={0.12}>
              
              <Float speed={1.5} rotationIntensity={0.2}>
                <HorseHead scale={1.8} />
              </Float>

              <Sparkles count={300} scale={15} size={2} speed={0.2} opacity={0.2} color="#d2b48c" />
              <Environment preset="night" />

              <EffectComposer>
                <Bloom luminanceThreshold={1} intensity={1.5} mipmapBlur />
                <Vignette eskil={false} offset={0.1} darkness={1.2} />
                <Noise opacity={0.05} />
              </EffectComposer>

              <Scroll html>
                <div className="museum-container">
                  <section className="museum-section">
                    <div className="section-content">
                      <span className="museum-subtitle">01 — Orígenes</span>
                      <h1 className="museum-title">Cronología de la<span className="solid">Historia de Rosario</span></h1>
                      <div className="museum-text-block">
                        <p className="museum-paragraph">Rosario no se construyó solo con planos. Se forjó en la visión de artistas.</p>
                      </div>
                    </div>
                  </section>

                  <section className="museum-section">
                    <div className="section-content section-right">
                      <span className="museum-subtitle">02 — Visión</span>
                      <h1 className="museum-title">Gran Archivo<span className="solid">Histórico Digital</span></h1>
                      <div className="museum-text-block">
                        <p className="museum-paragraph">Explora el archivo histórico más ambicioso de la región.</p>
                      </div>
                    </div>
                  </section>

                  <section className="museum-section">
                    <div className="section-content section-center">
                      <span className="museum-subtitle">03 — Memoria</span>
                      <h1 className="museum-title">Enciclopedia<span className="solid">de Rosario</span></h1>
                      <div className="museum-text-block" style={{ border: 'none', margin: '2rem auto' }}>
                        <p className="museum-paragraph">Donde el pasado y la tecnología convergen.</p>
                        <button className="museum-btn">Iniciar Recorrido</button>
                      </div>
                    </div>
                  </section>
                </div>
              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}