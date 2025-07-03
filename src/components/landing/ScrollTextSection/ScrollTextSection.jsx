import React, { useEffect, useRef, useState } from 'react';


const ScrollAnimation = () => {
  // Estilos CSS embebidos
  const cssStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
    
    @property --hue {
      initial-value: 0;
      syntax: '<number>';
      inherits: false;
    }
    @property --chroma {
      initial-value: 0;
      syntax: '<number>';
      inherits: true;
    }

    .scroll-animation-container {
      --font-size-min: 14;
      --font-size-max: 20;
      --font-ratio-min: 1.1;
      --font-ratio-max: 1.33;
      --font-width-min: 375;
      --font-width-max: 1500;
      --start: 0;
      --end: 360;
      --lightness: 65%;
      --base-chroma: 0.3;
      
      width: 100%;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: transparent;
      font-family: 'Geist', 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif, system-ui;
      position: relative;
      color-scheme: light dark;
    }

    .scroll-animation-container[data-theme='light'] {
      color-scheme: light only;
      --lightness: 65%;
    }

    .scroll-animation-container[data-theme='dark'] {
      color-scheme: dark only;
      --lightness: 75%;
    }

    @media (prefers-color-scheme: dark) {
      .scroll-animation-container {
        --lightness: 75%;
      }
    }

   

    .scroll-animation-container[data-sync-scrollbar='true'] {
      scrollbar-color: oklch(var(--lightness) var(--chroma) var(--hue)) #0000;
    }

    .scroll-animation-container[data-debug='true'] li {
      outline: 0.05em dashed currentColor;
    }

    .scroll-animation-container[data-debug='true'] h2,
    .scroll-animation-container[data-debug='true'] li:last-of-type {
      outline: 0.05em dashed canvasText;
    }

    .scroll-animation-container[data-snap='true'] {
      scroll-snap-type: y proximity;
    }

    .scroll-animation-container[data-snap='true'] li {
      scroll-snap-align: center;
    }

    .scroll-animation-container ul {
      --step: calc((var(--end) - var(--start)) / (var(--count) - 1));
      font-weight: 600;
      padding-inline: 0;
      margin: 0;
      list-style-type: none;
    }

    .scroll-animation-container li:not(:last-of-type) {
      color: oklch(var(--lightness) var(--base-chroma) calc(var(--start) + (var(--step) * var(--i))));
    }

    .scroll-animation-container h2,
    .scroll-animation-container li:last-of-type {
      background: linear-gradient(canvasText 50%, color-mix(in oklch, canvas, canvasText 25%));
      background-clip: text;
      color: transparent;
    }

    .scroll-animation-container .fluid {
      --fluid-min: calc(var(--font-size-min) * pow(var(--font-ratio-min), var(--font-level, 0)));
      --fluid-max: calc(var(--font-size-max) * pow(var(--font-ratio-max), var(--font-level, 0)));
      --fluid-preferred: calc((var(--fluid-max) - var(--fluid-min)) / (var(--font-width-max) - var(--font-width-min)));
      --fluid-type: clamp(
        (var(--fluid-min) / 16) * 1rem,
        ((var(--fluid-min) / 16) * 1rem) - (((var(--fluid-preferred) * var(--font-width-min)) / 16) * 1rem) + (var(--fluid-preferred) * var(--variable-unit, 100vi)),
        (var(--fluid-max) / 16) * 1rem
      );
      font-size: var(--fluid-type);
    }

    @supports (animation-timeline: scroll()) and (animation-range: 0% 100%) {
      .scroll-animation-container[data-sync-scrollbar='true'][data-animate='true'] {
        timeline-scope: --list;
        scrollbar-color: oklch(var(--lightness) var(--chroma, 0) var(--hue)) #0000;
        animation-name: change, chroma-on, chroma-off;
        animation-fill-mode: both;
        animation-timing-function: linear;
        animation-range: entry 50% exit 50%, entry 40% entry 50%, exit 30% exit 40%;
        animation-timeline: --list;
      }
      
      .scroll-animation-container[data-sync-scrollbar='true'][data-animate='true'] ul {
        view-timeline: --list;
      }

      .scroll-animation-container[data-animate='true'] li {
        opacity: 0.2;
        animation-name: brighten;
        animation-fill-mode: both;
        animation-timing-function: linear;
        animation-range: cover calc(50% - 1lh) calc(50% + 1lh);
        animation-timeline: view();
      }

      .scroll-animation-container[data-animate='true'] li:first-of-type {
        --start-opacity: 1;
      }
      
      .scroll-animation-container[data-animate='true'] li:last-of-type {
        --brightness: 1;
        --end-opacity: 1;
      }

      @keyframes change {
        to { --hue: var(--end); }
      }
      @keyframes chroma-on {
        to { --chroma: 0.3; }
      }
      @keyframes chroma-off {
        to { --chroma: 0; }
      }
      @keyframes brighten {
        0% { opacity: var(--start-opacity, 0.2); }
        50% { opacity: 1; filter: brightness(var(--brightness, 1.2)); }
        100% { opacity: var(--end-opacity, 0.2); }
      }
      @keyframes gradientShift {
        0%, 100% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
      }

      @keyframes fuzzyText {
        0% {
          filter: blur(0px);
          text-shadow: 0 0 0px currentColor;
        }
        25% {
          filter: blur(1px);
          text-shadow: 0 0 5px currentColor, 0 0 10px currentColor;
        }
        50% {
          filter: blur(2px);
          text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
        }
        75% {
          filter: blur(1px);
          text-shadow: 0 0 5px currentColor, 0 0 10px currentColor;
        }
        100% {
          filter: blur(0px);
          text-shadow: 0 0 0px currentColor;
        }
      }
    }

    .fuzzy-text {
      animation: fuzzyText 3s ease-in-out infinite;
      position: relative;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
  `;

  const [config, setConfig] = useState({
    theme: 'dark',
    animate: true,
    snap: true,
    start: Math.floor(Math.random() * 101),
    end: Math.floor(Math.random() * 101) + 900,
    scroll: true,
    debug: false,
  });

  const [showControls, setShowControls] = useState(false);
  const itemsRef = useRef([]);
  const scrollerScrubRef = useRef(null);
  const dimmerScrubRef = useRef(null);
  const chromaEntryRef = useRef(null);
  const chromaExitRef = useRef(null);
  const gsapRef = useRef(null);
  const ScrollTriggerRef = useRef(null);

  useEffect(() => {
    // Cargar GSAP dinámicamente
    const loadGSAP = async () => {
      try {
        const gsapModule = await import('https://cdn.skypack.dev/gsap@3.12.0');
        const ScrollTriggerModule = await import('https://cdn.skypack.dev/gsap@3.12.0/ScrollTrigger');
        
        gsapRef.current = gsapModule.default;
        ScrollTriggerRef.current = ScrollTriggerModule.default;
        
        // Inicializar después de cargar GSAP
        initializeAnimations();
      } catch (error) {
        console.error('Error loading GSAP:', error);
      }
    };

    loadGSAP();
    
    return () => {
      // Cleanup
      if (scrollerScrubRef.current) scrollerScrubRef.current.kill();
      if (dimmerScrubRef.current) dimmerScrubRef.current.kill();
      if (chromaEntryRef.current) chromaEntryRef.current.kill();
      if (chromaExitRef.current) chromaExitRef.current.kill();
    };
  }, []);

  const initializeAnimations = () => {
    const gsap = gsapRef.current;
    const ScrollTrigger = ScrollTriggerRef.current;
    
    if (!gsap || !ScrollTrigger) return;

    // Solo inicializar si no hay soporte nativo de CSS
    if (!CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)')) {
      gsap.registerPlugin(ScrollTrigger);

      const items = itemsRef.current.filter(Boolean);
      
      gsap.set(items, { opacity: (i) => (i !== 0 ? 0.2 : 1) });

      const dimmer = gsap
        .timeline()
        .to(items.slice(1), {
          opacity: 1,
          stagger: 0.5,
        })
        .to(
          items.slice(0, items.length - 1),
          {
            opacity: 0.2,
            stagger: 0.5,
          },
          0
        );

      dimmerScrubRef.current = ScrollTrigger.create({
        trigger: items[0],
        endTrigger: items[items.length - 1],
        start: 'center center',
        end: 'center center',
        animation: dimmer,
        scrub: 0.2,
      });

      const scroller = gsap.timeline().fromTo(
        document.documentElement,
        {
          '--hue': config.start,
        },
        {
          '--hue': config.end,
          ease: 'none',
        }
      );

      scrollerScrubRef.current = ScrollTrigger.create({
        trigger: items[0],
        endTrigger: items[items.length - 1],
        start: 'center center',
        end: 'center center',
        animation: scroller,
        scrub: 0.2,
      });

      chromaEntryRef.current = gsap.fromTo(
        document.documentElement,
        {
          '--chroma': 0,
        },
        {
          '--chroma': 0.3,
          ease: 'none',
          scrollTrigger: {
            scrub: 0.2,
            trigger: items[0],
            start: 'center center+=40',
            end: 'center center',
          },
        }
      );

      chromaExitRef.current = gsap.fromTo(
        document.documentElement,
        {
          '--chroma': 0.3,
        },
        {
          '--chroma': 0,
          ease: 'none',
          scrollTrigger: {
            scrub: 0.2,
            trigger: items[items.length - 2],
            start: 'center center',
            end: 'center center-=40',
          },
        }
      );
    }

    updateStyles();
  };

  const updateStyles = () => {
    const root = document.documentElement;
    root.dataset.theme = config.theme;
    root.dataset.syncScrollbar = config.scroll;
    root.dataset.animate = config.animate;
    root.dataset.snap = config.snap;
    root.dataset.debug = config.debug;
    root.style.setProperty('--start', config.start);
    root.style.setProperty('--hue', config.start);
    root.style.setProperty('--end', config.end);

    const gsap = gsapRef.current;
    const items = itemsRef.current.filter(Boolean);

    if (gsap && items.length > 0) {
      if (!config.animate) {
        chromaEntryRef.current?.scrollTrigger?.disable(true, false);
        chromaExitRef.current?.scrollTrigger?.disable(true, false);
        dimmerScrubRef.current?.disable(true, false);
        scrollerScrubRef.current?.disable(true, false);
        gsap.set(items, { opacity: 1 });
        gsap.set(document.documentElement, { '--chroma': 0 });
      } else {
        gsap.set(items, { opacity: (i) => (i !== 0 ? 0.2 : 1) });
        dimmerScrubRef.current?.enable(true, true);
        scrollerScrubRef.current?.enable(true, true);
        chromaEntryRef.current?.scrollTrigger?.enable(true, true);
        chromaExitRef.current?.scrollTrigger?.enable(true, true);
      }
    }
  };

  useEffect(() => {
    updateStyles();
  }, [config]);

  const handleConfigChange = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const words = [
    'design.', 'develop.', 'solve.', 'build.', 'brand.', 'debug.',
    'collaborate.', 'create.', 'inspire.', 'optimize.', 'innovate.', 'test.', 'market.', 'analyze.',
    'scale.', 'innovate', 'connect.', 'do it.'
  ];

  // Estilos inline
  const controlPanelStyles = {
    panel: {
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      zIndex: 1000,
      background: 'color-mix(in oklch, canvas, canvasText 5%)',
      border: '1px solid color-mix(in oklch, canvas, canvasText 20%)',
      borderRadius: '8px',
      padding: '1rem',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      maxWidth: '280px',
      boxSizing: 'border-box'
    },
    toggle: {
      background: 'none',
      border: 'none',
      color: 'canvasText',
      cursor: 'pointer',
      fontSize: '1rem',
      padding: '0.5rem',
      borderRadius: '4px',
      transition: 'background 0.2s'
    },
    controls: {
      marginTop: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    group: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      fontSize: '0.9rem',
      color: 'canvasText',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem'
    },
    range: {
      width: '100%'
    },
    select: {
      padding: '0.25rem',
      borderRadius: '4px',
      border: '1px solid color-mix(in oklch, canvas, canvasText 20%)',
      background: 'canvas',
      color: 'canvasText'
    },
    checkbox: {
      width: 'auto',
      marginRight: '0.5rem'
    }
  };

  const titleStyles = {
    textWrap: 'pretty',
    lineHeight: '0.8',
    margin: 0,
    background: 'linear-gradient(canvasText 60%, color-mix(in oklch, canvas, canvasText))',
    backgroundClip: 'text',
    color: 'transparent'
  };

  // New header styles matching testimonials section
  const headerSectionStyles = {
    textAlign: 'center',
    marginBottom: '4rem',
    paddingTop: '2rem'
  };

  const headerTitleStyles = {
    fontSize: '4rem',
    fontWeight: 600,
    letterSpacing: '-2px',
    color: '#fff',
    marginBottom: '.2rem',
    background: 'linear-gradient(135deg, #fff 0%, #8660fa 20%, #a855f7 40%, #8400ff 60%, #a855f7 80%, #fff 100%)',
    backgroundSize: '200% 200%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textAlign: 'center',
    animation: 'gradientShift 4s ease-in-out infinite',
    display: 'inline-block',
    whiteSpace: 'nowrap'
  };

  const headerSubtitleStyles = {
    fontSize: '1.2rem',
    color: '#ffffffb7',
    textShadow: '0 0 2px rgba(255, 255, 255, 0.1), 0 0 4px rgba(255, 255, 255, 0.3), 0 0 8px rgba(255, 255, 255, 0.4), 0 0 136px rgba(132, 0, 255, 0.9)',
    fontWeight: 400,
    margin: 0,
    textAlign: 'center'
  };

  const mainStyles = {
    width: '100%'
  };

  const contentStyles = {
    display: 'flex',
    lineHeight: '1.25',
    width: '100%',
    justifyContent: 'center',
    paddingBottom: '150px',
    alignItems: 'flex-start'
  };

  const stickyTitleStyles = {
    position: 'sticky',
    top: 'calc(50% - 0.5lh)',
    fontSize: 'inherit',
    margin: 0,
    display: 'inline-block',
    height: 'fit-content',
    fontWeight: 600,
  };

  const endSectionStyles = {
    minHeight: '100vh',
    display: 'flex',
    placeItems: 'center',
    width: '100%',
    justifyContent: 'center',
    paddingBottom: '100px',
  };

  const footerStyles = {
    paddingBlock: '2rem',
    opacity: 0.5,
    textAlign: 'center'
  };

  return (
    <div className="scroll-animation-container" 
         data-theme={config.theme}
         data-sync-scrollbar={config.scroll}
         data-animate={config.animate}
         data-snap={config.snap}
         data-debug={config.debug}
         style={{
           '--start': config.start,
           '--hue': config.start,
           '--end': config.end
         }}>
      
      <style>{cssStyles}</style>

    
      
      <main style={mainStyles}>
        <section className="content fluid" style={{ '--font-level': 6, ...contentStyles }}>
          <h2 style={stickyTitleStyles}>
            <span aria-hidden="true">we can&nbsp;</span>
            <span className="sr-only">we can ship things.</span>
          </h2>
          
          <ul aria-hidden="true" style={{ '--count': words.length }}>
            {words.map((word, index) => (
              <li
                key={index}
                ref={(el) => (itemsRef.current[index] = el)}
                style={{ '--i': index }}
                className={index === words.length - 1 ? 'fuzzy-text' : ''}
              >
                {word}
              </li>
            ))}
          </ul>
        </section>
        
      
      </main>
      

    </div>
  );
};

export default ScrollAnimation;