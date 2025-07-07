import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpotlightCard from './SpotlightCard';
import './ServicesSection.css';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const firstRowRef = useRef(null);
  const secondRowRef = useRef(null);
  const titleRowRef = useRef(null);

  useLayoutEffect(() => {
    if (window.innerWidth > 300) {
      const sectionEl = sectionRef.current;
      const firstRow = firstRowRef.current;
      const secondRow = secondRowRef.current;
      const titleRow = titleRowRef.current;

      // Helper to get the final x to center the row in the viewport
      const getFinalX = (row) => {
        const rowRect = row.getBoundingClientRect();
        return (window.innerWidth / 2) - (rowRect.left + row.offsetWidth / 2);
      };
      // Calculate at mount
      const centerX1 = getFinalX(firstRow);
      const centerX2 = getFinalX(secondRow);
      // The scroll distance is the distance from off-screen to centered
      const scrollDist1 = Math.abs(centerX1 + window.innerWidth);
      const scrollDist2 = Math.abs(centerX2 + window.innerWidth);
      // Use the maximum scroll distance for pinning
      const maxScroll = Math.max(scrollDist1, scrollDist2);

      ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top top',
        end: () => `+=${maxScroll + window.innerHeight}`,
        pin: true,
        scrub: 0.5,
      });

      gsap.fromTo(firstRow,
        { x: -window.innerWidth },
        {
          x: centerX1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top top',
            end: () => `+=${scrollDist1}`,
            scrub: 0.5
          }
        }
      );
      gsap.fromTo(secondRow,
        { x: window.innerWidth },
        {
          x: centerX2,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top top',
            end: () => `+=${scrollDist2}`,
            scrub: 0.5
          }
        }
      );
      // Remove GSAP animation for the title; keep it centered with CSS
    }
  }, []);  // se ejecuta una vez al montar
  // Unique content for each card, distributed across both rows
  const allServices = [
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

  // Split unique cards between the two rows
  const half = Math.ceil(allServices.length / 2);
  const servicesRow1 = allServices.slice(0, half);
  const servicesRow2 = allServices.slice(half);

  return (
    <section className="services-section" ref={sectionRef}>
      <div className="services-container">
        {/* Cabecera */}
        <div className="services-header">
  
        </div>

        {/* Contenido */}
        <div className="services-content">
          {/* Título animado (sticky center) */}
          {/* Section Title (centered, visible only in section) */}
          <div className="services-title-scroll-wrapper" style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '2vw' }}>
            <h2 className="gradient-title" style={{
              fontWeight: 700,
              fontSize: 'clamp(2.5rem,7vw,5rem)',
              letterSpacing: '-0.01em',
              textAlign: 'center',
              margin: 0,
              background: 'linear-gradient(90deg, #A259FF 0%, #6A82FB 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              lineHeight: 1.1
            }}>
              All-in-one IT Solutions.
            </h2>
          </div>
          {/* Primera fila */}
          <div className="services-grid" ref={firstRowRef}>
            {servicesRow1.map((service, index) => (
              <div key={index} className="service-card-wrapper">
                <SpotlightCard className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </SpotlightCard>
              </div>
            ))}
          </div>
          {/* Segunda fila, se desplaza en dirección opuesta */}
          <div className="services-grid" ref={secondRowRef} style={{ marginTop: '3rem' }}>
            {servicesRow2.map((service, index) => (
              <div key={index} className="service-card-wrapper">
                <SpotlightCard className="service-card">
                  <div className="service-icon">{service.icon}</div>
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