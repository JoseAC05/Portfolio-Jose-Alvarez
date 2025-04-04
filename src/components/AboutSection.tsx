import React, { useEffect, useRef, useState } from 'react';
import './AboutSection.css';
import certificateImage from '../assets/Certificado_HackingEtico.webp';

const AboutSection: React.FC = () => {
  const certRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (certRef.current) {
        const hue = Math.floor(Math.random() * 60) + 180;
        certRef.current.style.boxShadow = `0 0 15px hsla(${hue}, 100%, 50%, 0.7)`;
      }
    }, 3000); // Cambié a 3s para menos distracción

    return () => clearInterval(interval);
  }, []);

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="about-section" id="about">
      <div className="about-overlay"></div>
      <div className="about-particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="about-particle"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`, // Reduje a 10s para mejor rendimiento
            }}
          />
        ))}
      </div>

      <div className="about-content">
        <h2 className="about-title">
          <span>Sobre Mí</span>
        </h2>

        <div className="about-grid">
          {/* Texto ajustado */}
          <div className="text-content">
            <div className="bio-content">
              <h3 className="bio-subtitle">Desarrollador Full Stack</h3>
              <p className="bio-text">
                Autodidacta en desarrollo y seguridad, disfruto creando aplicaciones con React y Node.js mientras exploro cómo proteger sistemas con herramientas como Nmap. Mi camino empezó con un curso básico y hoy incluye certificaciones como Hacking Ético. Cuando no estoy codificando, me pierdo en videojuegos retro.
              </p>
              <button className="projects-button" onClick={handleScrollToProjects}>
                Ver Mis Proyectos
                <span className="button-icon">→</span>
              </button>
            </div>
          </div>

          {/* Certificado con modal */}
          <div className="certificate-wrapper" ref={certRef}>
            <h3 className="achievement-title">Último Logro</h3>
            <div className="certificate-container">
              <img
                src={certificateImage}
                alt="Certificado de Hacking Ético"
                className="certificate-image"
                loading="lazy"
                style={{
                  width: '80%', // Reducido para balance
                  height: 'auto',
                  display: 'block',
                  margin: '0 auto',
                }}
              />
              <p className="certificate-date">Marzo 2025</p> {/* Ajustado a fecha actual */}
              <button
                className="view-certificate"
                onClick={() => setIsModalOpen(true)}
              >
                Ver Certificado Completo
              </button>
            </div>
          </div>
        </div>

        {/* Modal para certificado */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <img
                src={certificateImage}
                alt="Certificado de Hacking Ético"
                style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
              />
              <button
                className="modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;