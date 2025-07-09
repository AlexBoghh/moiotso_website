import { useEffect, useState } from 'react';
import Hero from '../components/landing/Hero/Hero';
import DisplayHeader from '../components/landing/DisplayHeader/DisplayHeader';
import MoiotsoFeatureCards from '../components/landing/MoiotsoFeatureCards/MoiotsoFeatureCards';
import ServicesSection from '../components/landing/ServicesSection/ServicesSection';
import PlasmaWaveV2 from '../components/landing/PlasmaWave/PlasmaWaveV2';
import CallToActionSection from '../components/landing/CallToActionSection/CallToActionSection';
import Threads from '../content/Backgrounds/Threads/Threads';
import ScrollVelocityShowcaseSection from '../components/landing/ScrollVelocityShowcaseSection';
import PinTransitionSection from '../components/landing/PinTransitionSection';
import TextEffects from '../components/landing/TextEffects/TextEffects';
import CardsScroll from '../components/landing/ITSolutions/CardsScroll';


// 1) global + header
import '../components/landing/DisplayHeader/DisplayHeader.css';
import '../css/landing.css';




// 4) landing-page overrides
import './MoiotsoLandingPage.css';

import ScrollTextSection from '@/components/landing/ScrollTextSection/ScrollTextSection';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger, SplitType);

const MoiotsoLandingPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

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

  useEffect(() => {
    // Pin scroll-text section
    const scrollTextTrigger = ScrollTrigger.create({
      trigger: "#scroll-text",
      start: "top top",
      end: "bottom 150px",
      pin: "#scroll-text"
    });
    
    return () => {
      scrollTextTrigger.kill();
    };
  }, []);

  return (
    <section className="landing-wrapper">
      {/* Hero Section with Threads Background */}
      <div className="hero-section">
        <div className="plasma-wave-container">
          <Threads color={[1,1,1]} amplitude={2} distance={0} enableMouseInteraction={true}  />
        </div>
        <DisplayHeader activeItem="home" />
        <Hero />
      </div>

      {/* Features Section */}
      <MoiotsoFeatureCards id="features" />

      {/* Services Section */}
      <CardsScroll />;

      {/* Scroll Text Section */}
      <ScrollTextSection id="scroll-text" />

      {/* Technology Section */}
      <ScrollVelocityShowcaseSection id="technologies" />

      {/* NEW: Pin Transition Section */}
      <PinTransitionSection onPinEnd={() => setShowCTA(true)} />

      {/* Call to Action Section */}
      {showCTA && <CallToActionSection id="call-to-action" />}


      {/* NEW: Text Effects Section */}
      <div>
        <TextEffects />
      </div>
    </section>
  );
};

export default MoiotsoLandingPage;