import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PinTransitionSection.css';
gsap.registerPlugin(ScrollTrigger);

const SimpleHorizontalPanels = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const panels = gsap.utils.toArray('.simple-panel');
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 0.5,
        end: () => `+=${window.innerWidth * 0.8}`,
      },
    });

    // Pin panel 1 so panel 2 scrolls over it
    const pinPanel1 = ScrollTrigger.create({
      trigger: panels[0],
      pin: true,
      start: 'left left',
      end: () => `+=${window.innerWidth}`,
      pinSpacing: false,
      anticipatePin: 1,
      zIndex: 2,
    });

    // Pin the last panel so the next section scrolls over it
    const lastPanel = panels[panels.length - 1];
    const pinLast = ScrollTrigger.create({
      trigger: lastPanel,
      pin: true,
      start: 'left left',
      endTrigger: containerRef.current.nextElementSibling,
      end: 'top top',
      pinSpacing: false,
      anticipatePin: 1,
      zIndex: 2,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="simple-container">
        <section className="simple-panel bg1">
          <span className="panel-title">
            Our Process : Simple, Seamless, Streamlined &rarr;
          </span>
          <span className="panel-subtitle">
            We keep communication open and clear, so you’re informed and confident every step of the way.
          </span>
        </section>
        <section className="simple-panel bg2">
          <span className="panel-title">1. Book a Discovery Call</span>
          <span className="panel-subtitle">Tell us about your business and project needs. We respond within 24 hours.</span>
        </section>
        <section className="simple-panel bg3">
          <span className="panel-title">2. Discuss Solution & Team Structure</span>
          <span className="panel-subtitle">We align on project specs, then select and onboard the right team. Project plan delivered within 2 weeks.</span>
        </section>
        <section className="simple-panel bg4">
          <span className="panel-title">3. Get Started & Track Progress</span>
          <span className="panel-subtitle">We begin work immediately and keep you updated, adjusting as needed.</span>
        </section>
      </div>
    </>
  );
};

const PinTransitionSection = () => (
  <SimpleHorizontalPanels />
);

export default PinTransitionSection;