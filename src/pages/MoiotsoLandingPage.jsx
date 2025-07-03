import { useEffect, useState } from 'react';
import Hero from '../components/landing/Hero/Hero';
import DisplayHeader from '../components/landing/DisplayHeader/DisplayHeader';
import MoiotsoFeatureCards from '../components/landing/MoiotsoFeatureCards/MoiotsoFeatureCards';
import ServicesSection from '../components/landing/ServicesSection/ServicesSection';
import TechnologiesSection from '../components/landing/TechnologiesSection/TechnologiesSection';
import PlasmaWaveV2 from '../components/landing/PlasmaWave/PlasmaWaveV2';

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

  return (
    <section className="landing-wrapper">
      {/* Opcional: si tienes el <title> aquí, muévelo al <head> */}
      {/* <title>Moiotso - Digital Agency</title> */}

      {/* Hero Section with PlasmaWave Background */}
      <div className="hero-section">
        <PlasmaWaveV2 yOffset={-300} xOffset={100} rotationDeg={-30} />
        <DisplayHeader activeItem="home" />
        <Hero />
      </div>

      {/* Features Section */}
      <MoiotsoFeatureCards />

      {/* Services Section */}
      <ServicesSection />

      {/* Scroll Text Section */}
      <ScrollTextSection />

       {/* Technologies Section */}
      <TechnologiesSection />
    </section>
  );
};

export default MoiotsoLandingPage;
