import React, { useState, useEffect } from 'react';
import CertificadoHackingEtico from '../assets/Certificado_HackingEtico.webp';
import IntroductionCybersecurity from '../assets/IntroductionCybersecurity.webp';
import CCNACerti from '../assets/CCNA-certificate.webp';
import './CertificatesSection.css';

// Define types for certificate data
interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  skills: string[];
  image: string;
  category: string;
}

// Sample certificate data
const certificatesData: Certificate[] = [
  {
    id: "cert1",
    name: "Ethical Hacker",
    issuer: "Networking Academy",
    date: "Dec 15, 2024",
    skills: ["Exploit Applications", "Exploiting Networks", "IoT Security", "Pentestintools", "Reporting", "Social Engineering", "Vulnerability Assessment", "Vulnerability Scanning"],
    image: CertificadoHackingEtico,
    category: "Ciberseguridad"
  },
  {
    id: "cert2",
    name: "Frontend",
    issuer: "Networking Academy",
    date: "Aug 17, 2023",
    skills: ["Exploit Applications", "Exploiting Networks", "IoT Security", "Pentestintools", "Reporting", "Social Engineering", "Vulnerability Assessment", "Vulnerability Scanning"],
    image: CertificadoHackingEtico,
    category: "Frontend"
  },
  {
    id: "cert3",
    name: "CCNA1 V7",
    issuer: "Networking Academy",
    date: "Dec 15, 2024",
    skills: ["IP Subnetting", "IPv4 And IPv6", "Ethernet", "IP connectivity", "Addressing", "Network ", "Fundamentals", "IP services","Switching","Security Fundamentals"],
    image: CCNACerti,
    category: "CCNA"
  },
  {
    id: "cert4",
    name: "Introduction to Cybersecurity",
    issuer: "Networking Academy",
    date: "Mar 09, 2023",
    skills: ["Network Vulnerabilities", "Cyber Best Practices", "Cybersecurity,", "Privacy And Data Confidentiality", "Threat Detection"],
    image: IntroductionCybersecurity,
    category: "Ciberseguridad"
  },
  
  // ... resto de los certificados ...
];

const CertificatesSection: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>(certificatesData);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [expandedCertId, setExpandedCertId] = useState<string | null>(null); // Nuevo estado para controlar expansión

  // Categories for filter buttons
  const categories = [
    { id: "all", name: "All Certificates" },
    { id: "Frontend", name: "Frontend" },
    { id: "Ciberseguridad", name: "Ciberseguridad" },
    { id: "CCNA", name: "CCNA" },
  ];

  // Filter certificates based on active filter
  useEffect(() => {
    if (activeFilter === "all") {
      setCertificates(certificatesData);
    } else {
      const filtered = certificatesData.filter(cert => cert.category === activeFilter);
      setCertificates(filtered);
    }
  }, [activeFilter]);

  // Handle certificate click to expand/collapse skills
  const handleCardClick = (certificate: Certificate) => (e: React.MouseEvent) => {
    // Evitar que el clic en las habilidades abra el modal inmediatamente
    e.stopPropagation();
    setExpandedCertId(expandedCertId === certificate.id ? null : certificate.id);
  };

  // Handle certificate click to open modal
  const handleCertificateClick = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close certificate modal
  const handleCloseModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Close modal when clicking outside
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Create particle elements for background effect
  const renderParticles = () => {
    const particles = [];
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 4 + 1;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = Math.random() * 5 + 8;
      const opacity = Math.random() * 0.7 + 0.3;
      
      particles.push(
        <div 
          key={i}
          className="certificates-particle"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            opacity: opacity,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    return particles;
  };

  const displayedCertificates = showAll ? certificates : certificates.slice(0, 6);

  return (
    <section className="certificates-section" id="certificates">
      <div className="certificates-overlay"></div>
      <div className="certificates-particles-container">{renderParticles()}</div>
      <div className="certificates-grid-lines"></div>
      
      <div className="certificates-content">
        <div className="certificates-title-container">
          <h2 className="certificates-title"><span>Certificates</span></h2>
        </div>
        
        <p className="certificates-subtitle">
          These certifications represent my commitment to continuous learning and skill development in various tech domains.
        </p>
        
        <div className="certificates-filters">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`certificate-filter-button ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="certificates-container">
          {displayedCertificates.map((certificate, index) => {
            const isExpanded = expandedCertId === certificate.id;
            const visibleSkills = isExpanded ? certificate.skills : certificate.skills.slice(0, 3); // Mostrar 3 skills por defecto

            return (
              <div 
                key={certificate.id} 
                className="certificate-card"
                style={{ '--animation-order': index } as React.CSSProperties}
                onClick={() => handleCertificateClick(certificate)}
              >
                <h3 className="certificate-name">{certificate.name}</h3>
                <p className="certificate-issuer">{certificate.issuer}</p>
                
                <div className="certificate-info">
                  <div className="certificate-date">
                    <svg className="info-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M3 8H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M3.5 4.5H20.5C21.0523 4.5 21.5 4.94772 21.5 5.5V19.5C21.5 20.0523 21.0523 20.5 20.5 20.5H3.5C2.94772 20.5 2.5 20.0523 2.5 19.5V5.5C2.5 4.94772 2.94772 4.5 3.5 4.5Z" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    {certificate.date}
                  </div>
                  <div className="certificate-credential">
                    <svg className="info-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15C14.5 15 16.5 12.8 16.5 10C16.5 7.2 14.5 5 12 5C9.5 5 7.5 7.2 7.5 10C7.5 12.8 9.5 15 12 15Z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M5 20C5 17.5 8.1 15.5 12 15.5C15.9 15.5 19 17.5 19 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>

                <div className="certificate-thumbnail">
                  <img 
                    src={certificate.image} 
                    alt={`${certificate.name} certificate thumbnail`}
                  />
                </div>
                
                <div className="certificate-skills" onClick={handleCardClick(certificate)}>
                  {visibleSkills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                  {!isExpanded && certificate.skills.length > 3 && (
                    <span className="skill-tag more-skills">+{certificate.skills.length - 3} more</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {certificates.length > 6 && !showAll && (
          <div className="certificates-view-more">
            <button 
              className="certificates-view-more-button"
              onClick={() => setShowAll(true)}
            >
              View More Certificates
            </button>
          </div>
        )}
        
        {showAll && certificates.length > 6 && (
          <div className="certificates-view-more">
            <button 
              className="certificates-view-more-button"
              onClick={() => setShowAll(false)}
            >
              Show Less
            </button>
          </div>
        )}
      </div>
      
      <div 
        className={`certificate-modal ${modalOpen ? 'active' : ''}`}
        onClick={handleOutsideClick}
      >
        {selectedCertificate && (
          <div className="certificate-modal-content">
            <button className="certificate-modal-close" onClick={handleCloseModal}>×</button>
            <img 
              src={selectedCertificate.image} 
              alt={`${selectedCertificate.name} certificate`}
              className="certificate-modal-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/certificates/certificate-placeholder.jpg";
              }}
            />
            <div className="certificate-modal-details">
              <h3 className="certificate-modal-title">{selectedCertificate.name}</h3>
              <p className="certificate-modal-issuer">{selectedCertificate.issuer}</p>
              <div className="certificate-modal-meta">
                <span>Issued: {selectedCertificate.date}</span>
              </div>
              <div className="certificate-skills">
                {selectedCertificate.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificatesSection;