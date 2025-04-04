import React, { useState } from 'react';
import './SkillsSection.css';

interface Skill {
  name: string;
  icon: string;
}

interface SoftSkill {
  name: string;
  description: string;
  icon: string;
}

type CategoryKey = 'frontend' | 'backend' | 'databases' | 'programming' | 'cybersecurity' | 'design';
type Categories = Record<CategoryKey, Skill[]>;

const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('frontend');
  const [isPaused, setIsPaused] = useState(false);

  const categories: Categories = {
    frontend: [
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
      { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
      { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
    ],
    backend: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
      { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
    ],
    databases: [
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg' },
    ],
    programming: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
      { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
    ],
    cybersecurity: [
      { name: 'Kali Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kalilinux/kalilinux-original.svg' },
      { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
      { name: 'Bash', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
      { name: 'OWASP', icon: 'https://raw.githubusercontent.com/OWASP/www-community/master/assets/images/owasp_logo.svg' },
      { name: 'Metasploit', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/metasploit.svg' },
      { name: 'Wireshark', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/wireshark.svg' },
      { name: 'Burp Suite', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/burpsuite.svg' },
      { name: 'Nmap', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nmap.svg' },
      { name: 'John the Ripper', icon: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/john-the-ripper.svg' },
    ],
    design: [
      { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'Photoshop', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
    ],
  };

  const categoryLabels: Record<CategoryKey, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    databases: 'Bases de Datos',
    programming: 'Lenguajes',
    cybersecurity: 'Seguridad',
    design: 'Diseño',
  };

  const softSkills: SoftSkill[] = [
    { name: 'Trabajo en Equipo', description: 'Colaboración efectiva en proyectos grupales.', icon: 'https://cdn-icons-png.flaticon.com/512/3062/3062634.png' },
    { name: 'Comunicación', description: 'Habilidad para expresar ideas claramente.', icon: 'https://cdn-icons-png.flaticon.com/512/893/893257.png' },
    { name: 'Resolución de Problemas', description: 'Enfoque analítico para superar desafíos.', icon: 'https://cdn-icons-png.flaticon.com/512/2422/2422672.png' },
    { name: 'Adaptabilidad', description: 'Capacidad para ajustarme a cambios rápidos.', icon: 'https://cdn-icons-png.flaticon.com/512/1087/1087085.png' },
    { name: 'Creatividad', description: 'Pensamiento innovador para soluciones únicas.', icon: 'https://cdn-icons-png.flaticon.com/512/3048/3048393.png' },
  ];

  // Duplicamos las habilidades para el loop infinito
  const loopedSoftSkills = [...softSkills, ...softSkills];

  return (
    <section className="skills-section" id="skills">
      <div className="skills-overlay"></div>
      <div className="skills-particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="skills-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="skills-content">
        <h2 className="skills-title">
          <span>Mis Habilidades</span>
        </h2>

        <div className="skills-main-container">
          <div className="skills-container">
            <div className="skills-menu">
              {(Object.keys(categories) as CategoryKey[]).map((category) => (
                <button
                  key={category}
                  className={`menu-item ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                  aria-label={`Mostrar habilidades de ${categoryLabels[category]}`}
                >
                  {categoryLabels[category]}
                </button>
              ))}
            </div>

            <div className="skills-panel">
              <h3 className="skills-category-title">{categoryLabels[activeCategory]}</h3>
              <div className="skills-items">
                {categories[activeCategory].map((skill) => (
                  <div key={skill.name} className="skill-item" title={skill.name}>
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="skill-icon"
                      loading="lazy"
                      onError={(e) => (e.currentTarget.src = '/fallback-icon.png')} // Fallback
                    />
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="soft-skills-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="soft-skills-wrapper">
              <h3 className="soft-skills-main-title">Habilidades Blandas</h3>
              <div className="soft-skills-carousel">
                <div className={`soft-skills-track ${isPaused ? 'paused' : ''}`}>
                  {loopedSoftSkills.map((skill, index) => (
                    <div key={`${skill.name}-${index}`} className="soft-skill-item">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="soft-skill-icon"
                        loading="lazy"
                      />
                      <div className="soft-skill-info">
                        <h4 className="soft-skill-name">{skill.name}</h4>
                        <p className="soft-skill-description">{skill.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;