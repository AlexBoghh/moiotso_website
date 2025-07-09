// File: src/components/CardsScroll.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Waves from '../../../content/Backgrounds/Waves/Waves';
import styles from './CardsScroll.module.css';

gsap.registerPlugin(ScrollTrigger);

// Service cards data with associated icons
const cards = [
  { title: 'Custom Software Development', text: 'Solve real business problems with tailor-made, scalable solutions.' },
  { title: 'Web Development', text: 'Build lightning-fast websites that work beautifully on every device.'},
  { title: 'Front-End Development', text: 'Deliver sleek, interactive user experiences that drive engagement.'},
  { title: 'Backend Development', text: 'Build powerful, reliable systems that keep everything running smoothly.'},
  { title: 'Blockchain Development', text: 'Launch secure, decentralized apps and smart contracts that unlock innovation.' },
  { title: 'QA & Software Testing', text: 'Identify issues early with manual and automated testing built in.'},
  { title: 'AI & Machine Learning', text: 'Automate smarter with AI tools that boost speed, accuracy, and decision-making.'},
  { title: 'Mobile App Development', text: 'Launch secure, high-performing apps for both iOS and Android.'}
];

const cardImages = [
  '/Custom Software Development.png',
  '/Web Development.png',
  '/Front-End Development.png',
  '/Backend Development.png',
  '/Blockchain Development.png',
  '/QA & Software Testing.png',
  '/AI & Machine Learning.png',
  '/Mobile App Development.png',
];

const CardsScroll = () => {
  const wrappersRef = useRef([]);
  wrappersRef.current = [];
  const imageRefs = useRef([]);
  imageRefs.current = [];

  const setRef = el => {
    if (el && !wrappersRef.current.includes(el)) wrappersRef.current.push(el);
  };
  const setImageRef = el => {
    if (el && !imageRefs.current.includes(el)) imageRefs.current.push(el);
  };

  useEffect(() => {
    wrappersRef.current.forEach((wrapper, index) => {
      const cardEl = wrapper.querySelector(`.${styles.card}`);
      if (index === wrappersRef.current.length - 1) {
        gsap.set(cardEl, { opacity: 1, scale: 1 });
      } else {
        gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            pin: true,
            pinSpacing: false
          }
        })
        .set(cardEl, { opacity: 1, scale: 1 })
        .to(cardEl, { opacity: 0, scale: 0.6, ease: 'none' }, 0.01);
      }
    });

    // Mouse movement parallax for images
    const handleMouseMove = e => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      imageRefs.current.forEach(img => {
        if (img) {
          img.style.transform = `translateY(-50%) translateX(${x * 18}px) translateY(${y * 12}px)`;
        }
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className={styles.sectionHeaderWrapper}>
        <h2 className={styles.sectionHeader}>
          <span className={styles.gradientText}>All-in-One IT Solutions - From Concept to Completion</span>
        </h2>
        <p className={styles.sectionSubheader}>
          Discover how we deliver seamless, end-to-end technology solutions for every business challenge.
        </p>
      </div>
      <div className={styles.cardsContainer}>
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div key={i} className={styles.cardWrapper} ref={setRef}>
              <div className={styles.card}>
                {/* Card image background */}
                <img ref={setImageRef} src={cardImages[i]} alt="card visual" className={styles.cardImageBg} />
                {/* Waves background */}
                <div className={styles.wavesWrapper}>
                  <Waves 
                  lineColor="rgba(79,70,229,0.3)" 
                  waveAmpY={8} 
                  waveAmpX={16}
                  waveSpeedX={0.02}
                  waveSpeedY={0.01}
                  friction={0.9}
                  tension={0.01}
                  maxCursorMove={120}
                  xGap={12}
                  yGap={36}
                />
                </div>
                {/* Card content sits above waves */}
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{c.title}</h3>
                  <p className={styles.cardText}>{c.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CardsScroll;