import React, { useState, FormEvent, ChangeEvent } from 'react';
import emailjs from '@emailjs/browser';
import './ContactSection.css';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [touched, setTouched] = useState<Record<string, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  React.useEffect(() => {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El formato de email no es válido';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es requerido';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'El nombre es requerido';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'El formato de email no es válido';
        }
        break;
      case 'subject':
        if (!value.trim()) error = 'El asunto es requerido';
        break;
      case 'message':
        if (!value.trim()) {
          error = 'El mensaje es requerido';
        } else if (value.trim().length < 10) {
          error = 'El mensaje debe tener al menos 10 caracteres';
        }
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const allTouched = Object.keys(formData).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {});
    setTouched(allTouched);
    
    const isValid = validateForm();
    
    if (isValid) {
      setIsSubmitting(true);
      setSubmitStatus('idle');
      
      try {
        const result = await emailjs.send(
          'service_u88l78s',
          'template_j06lkqk',
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            reply_to: formData.email
          }
        );

        if (result.text === 'OK') {
          setSubmitStatus('success');
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
          setTouched({
            name: false,
            email: false,
            subject: false,
            message: false
          });
          setErrors({});
          
          setTimeout(() => {
            setSubmitStatus('idle');
          }, 5000);
        }
      } catch (error) {
        console.error('Error sending email:', error);
        setSubmitStatus('error');
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-overlay"></div>
      
      <div className="contact-content">
        <div className="contact-header">
          <h2 className="contact-title">Contáctame</h2>
          <p className="contact-subtitle">
            ¿Tienes un proyecto en mente? Escríbeme y hablemos de cómo puedo ayudarte.
          </p>
        </div>
        
        <div className="contact-container">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name" className={touched.name && errors.name ? 'error' : ''}>
                Nombre {touched.name && errors.name && <span className="error-text">({errors.name})</span>}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.name && errors.name ? 'error-input' : ''}
                placeholder="Tu nombre"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className={touched.email && errors.email ? 'error' : ''}>
                Email {touched.email && errors.email && <span className="error-text">({errors.email})</span>}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.email && errors.email ? 'error-input' : ''}
                placeholder="tu.email@ejemplo.com"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject" className={touched.subject && errors.subject ? 'error' : ''}>
                Asunto {touched.subject && errors.subject && <span className="error-text">({errors.subject})</span>}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.subject && errors.subject ? 'error-input' : ''}
                placeholder="Asunto de tu mensaje"
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className={touched.message && errors.message ? 'error' : ''}>
                Mensaje {touched.message && errors.message && <span className="error-text">({errors.message})</span>}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.message && errors.message ? 'error-input' : ''}
                placeholder="Escribe tu mensaje aquí..."
                rows={6}
                required
                disabled={isSubmitting}
              ></textarea>
            </div>
            
            <button
              type="submit"
              className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading-spinner">Enviando...</span>
              ) : (
                <>
                  <span>Enviar mensaje</span>
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </>
              )}
            </button>
            
            {submitStatus === 'success' && (
              <div className="success-message">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>¡Mensaje enviado con éxito! Te responderé lo antes posible.</span>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="error-message">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;