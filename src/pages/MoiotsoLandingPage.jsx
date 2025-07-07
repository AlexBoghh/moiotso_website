import { useEffect, useState } from 'react';
import Hero from '../components/landing/Hero/Hero';
import DisplayHeader from '../components/landing/DisplayHeader/DisplayHeader';
import MoiotsoFeatureCards from '../components/landing/MoiotsoFeatureCards/MoiotsoFeatureCards';
import ServicesSection from '../components/landing/ServicesSection/ServicesSection';
import PlasmaWaveV2 from '../components/landing/PlasmaWave/PlasmaWaveV2';
import CallToActionSection from '../components/landing/CallToActionSection/CallToActionSection';
import Threads from '../content/Backgrounds/Threads/Threads';


// 1) Importamos primero el CSS del header y el global
import '../components/landing/DisplayHeader/DisplayHeader.css';
import '../css/landing.css';

// 2) Después cargamos el CSS de ScrollTextSection
import '@/components/landing/ScrollTextSection/ScrollTextSection.css';

// 3) Y finalmente nuestros overrides en la landing
import './MoiotsoLandingPage.css';

import ScrollTextSection from '@/components/landing/ScrollTextSection/ScrollTextSection';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type'; // Asegúrate de tenerla instalada

gsap.registerPlugin(ScrollTrigger, SplitType);

const MoiotsoLandingPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

    // *** Nuevo efecto para la sección ServicesSection con desplazamiento horizontal ***
  useEffect(() => {
    if (!isMobile) {
      const section = document.querySelector('.services-section');
      const track = document.querySelector('.services-track');
      if (!(section && track)) return;
      // Calcular el ancho total de desplazamiento horizontal
      const totalScrollWidth = track.scrollWidth;
      const viewportWidth = section.offsetWidth;
      const scrollDistance = totalScrollWidth - viewportWidth;
      // Configurar animación de desplazamiento horizontal con ScrollTrigger
      let ctx = gsap.context(() => {
        const scrollTween = gsap.to(track, {
          x: -scrollDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=' + scrollDistance,
            scrub: true,
            pin: true,
            anticipatePin: 1
          }
        });
        // Animar cada tarjeta de servicio al entrar en la vista
        gsap.utils.toArray('.service-card').forEach((card, i) => {
          gsap.from(card, {
            opacity: 0,
            y: 50,
            x: i % 2 === 0 ? -50 : 50,  // alternar dirección inicial
            scrollTrigger: {
              trigger: card,
              start: 'left center',
              containerAnimation: scrollTween
            }
          });
        });
      }, section);
      return () => ctx.revert();
    }
  }, [isMobile]);

  return (
    <section className="landing-wrapper">
      {/* Opcional: si tienes el <title> aquí, muévelo al <head> */}
      {/* <title>Moiotso - Digital Agency</title> */}

      {/* Hero Section with Threads Background */}
      <div className="hero-section">
        <div className="plasma-wave-container">
          <Threads color={[1,1,1]} amplitude={2} distance={0} enableMouseInteraction={true}  />
        </div>
        <DisplayHeader activeItem="home" />
        <Hero />
      </div>

      {/* Features Section */}
      <MoiotsoFeatureCards />

      {/* Services Section */}
      <ServicesSection />

      {/* Scroll Text Section */}
      <ScrollTextSection />

      {/* Call to Action Section */}
      <CallToActionSection />
    </section>
  );
};

export default MoiotsoLandingPage;
