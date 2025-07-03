import React, { useEffect, useRef } from 'react';
import './ServicesSection.css';
import SpotlightCard from './SpotlightCard';

const ServicesSection = () => {
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = cardsRef.current.filter(Boolean);
            cards.forEach((card, index) => {
              if (card) {
                setTimeout(() => {
                  // Apply animation class directly to the card
                  const animationClass = index % 2 === 0 ? 'animate-left' : 'animate-right';
                  card.classList.add(animationClass);
                }, index * 150); // Stagger the animations
              }
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const services = [
    {
      title: "Custom Software Development",
      description: "Solve real business problems with tailor-made, scalable solutions.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 7h5v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 12l-3-3 1.5-1.5L14 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Web Development",
      description: "Build lightning-fast websites that work beautifully on every device.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M2 8h20" stroke="currentColor" strokeWidth="2"/>
          <circle cx="6" cy="6" r="1" fill="currentColor"/>
          <circle cx="8.5" cy="6" r="1" fill="currentColor"/>
          <circle cx="11" cy="6" r="1" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: "Front-End Development",
      description: "Deliver sleek, interactive user experiences that drive engagement.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Backend Development",
      description: "Build powerful, reliable systems that keep everything running smoothly.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
          <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
          <path d="M7 11h10" stroke="currentColor" strokeWidth="2"/>
          <path d="M7 7h6" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: "Blockchain Development",
      description: "Launch secure, decentralized apps and smart contracts that unlock innovation.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 3V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 18V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M4.22 4.22L6.34 6.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M17.66 17.66L19.78 19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
    {
      title: "QA & Software Testing",
      description: "Identify issues early with manual and automated testing built in.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "AI & Machine Learning",
      description: "Automate smarter with AI tools that boost speed, accuracy, and decision-making.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Mobile App Development",
      description: "Launch secure, high-performing apps for both iOS and Android.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 18H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <section className="services-section" ref={sectionRef}>
      <div className="services-container">
        {/* Header */}
        <div className="services-header">
          <h2 className="services-title">
            All-in-One IT Solutions — From<br />
            Concept to Completion
          </h2>
          <p className="services-subtitle">
            We manage the entire process so you can stay focused on growing your business.
          </p>
        </div>

        {/* Content */}
        <div className="services-content">
          <div className="services-description">
            <p>
              Whether you're launching a new product or upgrading legacy 
              systems, our expert team delivers fast, secure, and scalable 
              solutions tailored to your needs.
            </p>
            <button className="services-cta-button">
              Get Your Custom Software Plan
            </button>
          </div>

          {/* Services Grid */}
          <div className="services-grid">
            {services.map((service, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="service-card-wrapper"
              >
                <SpotlightCard className="service-card">
                  <div className="service-icon">
                    {service.icon}
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
