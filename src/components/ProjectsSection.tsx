import React, { useState, useEffect } from 'react';
import './ProjectsSection.css';

// Importar imágenes desde ../assets/
import Xcolabora from '../assets/Xcolabora.webp';
import Horizon_Realty from '../assets/Horizon_Realty.png';
import OxSecurity from '../assets/0xSecurity.png';
import reconocimiento_facial from '../assets/reconocimiento_facial.png';
import escaneo_P from '../assets/escaneo_P.webp';
import Spyware_controlado from '../assets/Spyware_controlado.png';

// Definir interfaces
interface Project {
  title: string;
  description: string;
  image: string;
  technologies: { name: string; icon?: string }[];
  githubLink: string;
  liveLink?: string;
  status?: 'completed' | 'development';
  category?: string;
}

interface ProjectFilterProps {
  categories: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

// Componente para filtros
const ProjectFilters: React.FC<ProjectFilterProps> = ({ categories, activeFilter, setActiveFilter }) => {
  return (
    <div className="projects-filters">
      <button
        className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
        onClick={() => setActiveFilter('all')}
      >
        Todos
      </button>
      {categories.map((category) => (
        <button
          key={category} // Usar category como key para evitar duplicados
          className={`filter-button ${activeFilter === category ? 'active' : ''}`}
          onClick={() => setActiveFilter(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  // Estado
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [showMoreCount, setShowMoreCount] = useState(6);
  const [isLoading, setIsLoading] = useState(true);

  // Lista completa de proyectos
  const projects: Project[] = [
    {
      title: 'Portfolio Personal',
      description: 'Un sitio web dinámico para mostrar mis habilidades y proyectos profesionales.',
      image: Xcolabora,
      technologies: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      ],
      githubLink: 'https://github.com/username/portfolio',
      liveLink: 'https://portfolio.example.com',
      status: 'completed',
      category: 'Frontend',
    },
    {
      title: 'E-Commerce App',
      description: 'Tienda online con carrito de compras y pasarela de pago integrada.',
      image: Horizon_Realty,
      technologies: [
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      ],
      githubLink: 'https://github.com/username/ecommerce',
      liveLink: 'https://ecommerce.example.com',
      status: 'completed',
      category: 'Frontend',
    },
    {
      title: 'Task Manager',
      description: 'Aplicación para gestionar tareas con autenticación de usuarios y notificaciones.',
      image: OxSecurity,
      technologies: [
        { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      ],
      githubLink: 'https://github.com/username/task-manager',
      status: 'development',
      category: 'Backend',
    },
    {
      title: 'Weather App',
      description: 'App para consultar el clima en tiempo real usando APIs meteorológicas.',
      image: reconocimiento_facial,
      technologies: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'API REST', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
      ],
      githubLink: 'https://github.com/username/weather-app',
      liveLink: 'https://weather.example.com',
      status: 'completed',
      category: 'Frontend',
    },
    {
      title: 'Chat Realtime',
      description: 'Aplicación de chat en tiempo real con WebSockets y encriptación punto a punto.',
      image: escaneo_P,
      technologies: [
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Socket.io', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg' },
        { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
      ],
      githubLink: 'https://github.com/username/chat-realtime',
      status: 'development',
      category: 'Fullstack',
    },
    {
      title: 'Blog Personal',
      description: 'Plataforma de blogging con sistema de comentarios y panel de administración.',
      image: Spyware_controlado,
      technologies: [
        { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
        { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
        { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
      ],
      githubLink: 'https://github.com/username/blog',
      liveLink: 'https://blog.example.com',
      status: 'completed',
      category: 'Backend',
    },
  ];

  // Extraer categorías únicas
  const categories = Array.from(new Set(projects.map((project) => project.category).filter(Boolean))) as string[];

  // Efecto para filtrar proyectos
  useEffect(() => {
    setIsLoading(true);
    const filtered = activeFilter === 'all' ? projects : projects.filter((project) => project.category === activeFilter);
    setFilteredProjects(filtered);
    setVisibleProjects(filtered.slice(0, showMoreCount));
    setIsLoading(false);
  }, [activeFilter, showMoreCount]);

  // Cargar más proyectos
  const loadMoreProjects = () => {
    setShowMoreCount((prevCount) => Math.min(prevCount + 3, filteredProjects.length));
  };

  // Generar partículas
  const generateParticles = () => {
    return Array.from({ length: 15 }, (_, i) => (
      <div
        key={`particle-${i}`}
        className="projects-particle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 6 + 2}px`,
          height: `${Math.random() * 6 + 2}px`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${Math.random() * 15 + 10}s`,
        }}
      />
    ));
  };

  return (
    <section className="projects-section" id="projects">
      <div className="projects-overlay" />
      <div className="grid-lines" />
      <div className="projects-particles-container">{generateParticles()}</div>

      <div className="projects-content">
        <div className="projects-title-container">
          <h2 className="projects-title">
            <span>Mis Proyectos</span>
          </h2>
          <div className="projects-title-line" />
        </div>

        <p className="projects-subtitle">
          Explora mi colección de proyectos recientes que destacan mis habilidades en desarrollo web y tecnologías actuales.
        </p>

        <ProjectFilters categories={categories} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        <div className="projects-grid">
          {isLoading ? (
            Array.from({ length: 6 }, (_, index) => (
              <div
                key={`skeleton-${index}`}
                className="project-card loading"
                style={{ '--animation-order': index } as React.CSSProperties}
              >
                <div className="project-image-container">
                  <div className="project-image" />
                </div>
                <div className="project-info">
                  <div className="project-title" style={{ width: '70%', height: '24px', background: 'rgba(255,255,255,0.1)' }} />
                  <div className="project-description" style={{ width: '100%', height: '60px', background: 'rgba(255,255,255,0.1)' }} />
                </div>
              </div>
            ))
          ) : (
            visibleProjects.map((project, index) => (
              <div
                key={`${project.title}-${index}`} // Key más único
                className="project-card"
                style={{ '--animation-order': index } as React.CSSProperties}
              >
                {project.status && (
                  <div className={`project-status status-${project.status}`}>
                    {project.status === 'completed' ? 'Completado' : 'En desarrollo'}
                  </div>
                )}
                <div className="project-image-container">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                    loading="lazy"
                    onError={(e) => {
                      console.error(`Error loading image for ${project.title}: ${project.image}`);
                      e.currentTarget.src = '/fallback-image.png';
                    }}
                  />
                </div>
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={`${tech.name}-${techIndex}`} className="tech-tag">
                        {tech.icon && <img src={tech.icon} alt={tech.name} className="tech-icon" />}
                        {tech.name}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-button project-link-live"
                        aria-label={`Ver demo de ${project.title}`}
                      >
                        <span className="button-tooltip">Ver demo</span>
                        <svg
                          className="globe-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      </a>
                    )}
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-button"
                      aria-label={`Ver código de ${project.title} en GitHub`}
                    >
                      <span className="button-tooltip">Ver código</span>
                      <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                        alt="GitHub"
                        className="github-icon"
                      />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {!isLoading && visibleProjects.length < filteredProjects.length && (
          <div className="view-more-container">
            <button className="view-more-button" onClick={loadMoreProjects}>
              Ver Más Proyectos
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;