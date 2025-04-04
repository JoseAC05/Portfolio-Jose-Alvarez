import React, { useEffect, useRef } from 'react';
import './HeroSection.css';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  delay: number;
}

const HeroSection: React.FC = () => {
  const particlesContainerRef = useRef<HTMLDivElement>(null);

  // Función para crear partículas con un efecto más natural
  const createParticles = () => {
    if (!particlesContainerRef.current) return;
    
    const container = particlesContainerRef.current;
    container.innerHTML = '';
    
    // Aumentado el número de partículas para un efecto más rico
    const particles = 50;
    
    for (let i = 0; i < particles; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Posiciones más distribuidas para crear profundidad
      const posX = Math.random() * 100;
      const posY = Math.random() * 100 + 50;
      
      // Variación en tamaños para crear sensación de profundidad
      const size = Math.random() * 3 + 0.5;
      
      // Mayor variación en duración para movimiento más natural
      const duration = Math.random() * 15 + 10;
      
      // Delay negativo para que algunas partículas ya estén en movimiento
      const delay = Math.random() * -30;
      
      // Opacidad variable para dar más profundidad
      const opacity = Math.random() * 0.6 + 0.4;
      
      particle.style.cssText = `
        left: ${posX}%;
        top: ${posY}%;
        width: ${size}px;
        height: ${size}px;
        opacity: ${opacity};
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
      `;
      
      container.appendChild(particle);
    }
  };

  useEffect(() => {
    createParticles();
    
    // Recrear partículas cuando cambie el tamaño de la ventana
    const handleResize = () => {
      createParticles();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="hero-section">
      <div className="space-overlay"></div>
      <div className="particles-container" ref={particlesContainerRef}></div>
      
      {/* Efectos de luz mejorados con posiciones más estratégicas */}
      <div className="glow-effect" style={{ top: '20%', left: '10%' }}></div>
      <div className="glow-effect" style={{ bottom: '30%', right: '15%' }}></div>
      <div className="floating-orb" style={{ top: '40%', left: '20%' }}></div>
      <div className="floating-orb" style={{ bottom: '20%', right: '25%', animationDelay: '-10s' }}></div>
      
      <div className="hero-content">
        <h1 className="hero-title">
          <span>Jose Alvarez Cubero</span>
        </h1>
        
        <p className="hero-subtitle">
          Desarrollador Full Stack especializado en React, Node.js y TypeScript. 
          Creo soluciones digitales escalables con código limpio y arquitecturas robustas.
        </p>
        
        <div className="button-container">
          <a 
            href="#contact" 
            className="hero-button primary-button"
            aria-label="Contactar a Jose Alvarez"
          >
            <svg 
              viewBox="0 0 24 24" 
              width="20" 
              height="20" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              style={{ marginRight: '10px' }}
            >
              <path d="M21 16.5V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-1.5M12 3v12m-4-4l4 4 4-4"></path>
            </svg>
            Contáctame
          </a>
          
          <a 
            href="/cv.pdf" 
            className="hero-button secondary-button"
            download
            aria-label="Descargar CV de Jose Alvarez"
          >
            <svg 
              viewBox="0 0 24 24" 
              width="20" 
              height="20" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              style={{ marginRight: '10px' }}
            >
              <path d="M12 2v10m-4-4l4 4 4-4M4 16h16v4H4z"></path>
            </svg>
            Descargar CV
          </a>
        </div>
      </div>
      
      <div className="scroll-indicator">
        Scroll
      </div>
    </section>
  );
};

export default HeroSection;