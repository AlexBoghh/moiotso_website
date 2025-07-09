// Install GSAP before using:
// npm install gsap

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './TextEffects.module.css';

gsap.registerPlugin(ScrollTrigger);

const TextEffects = () => {
  const textRefs = useRef([]);
  textRefs.current = [];

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  useEffect(() => {
    textRefs.current.forEach((text) => {
      gsap.to(text, {
        backgroundSize: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: text,
          start: 'center 80%',
          end: 'center 20%',
          scrub: true,
        },
      });
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.text} ref={addToRefs}>
        BUILDING <span>IMPACT</span>
      </h1>
      <h1 className={styles.text} ref={addToRefs}>
        DESIGN <span>THAT INSPIRES</span>
      </h1>
      <h1 className={styles.text} ref={addToRefs}>
        CODE <span>THAT PERFORMS</span>
      </h1>
      <h1 className={styles.text} ref={addToRefs}>
        IDEAS <span>INTO REALITY</span>
      </h1>
      <h1 className={styles.text} ref={addToRefs}>
        LET’S <span>CREATE TOGETHER</span>
      </h1>
    </div>
  );
};

export default TextEffects;

/*
  Rename your CSS file from TextEffects.css to TextEffects.module.css
  and copy the original styles into it. This scopes the styles
  locally to this component via CSS Modules, preventing interference
  with other parts of your project.
*/
