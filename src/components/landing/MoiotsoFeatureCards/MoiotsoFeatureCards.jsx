import { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "gsap";
import "./MoiotsoFeatureCards.css";
import CountUp from "../../../content/TextAnimations/CountUp/CountUp";
import MetaBalls from "../../../content/Animations/MetaBalls/MetaBalls";
import PixelCard from '../../../content/Components/PixelCard/PixelCard';
import ProfileCard from '../../../content/Components/ProfileCard/ProfileCard';
import FlowingMenu from '../../../content/Components/FlowingMenu/FlowingMenu';
import VideoModal from '../../common/VideoModal/VideoModal';
import FluidGlass from '../../../content/Components/FluidGlass/FluidGlassCursor';

const ParticleCard = ({ children, className = "", disableAnimations = false }) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInit = useRef(false);

  const createParticle = useCallback((x, y) => {
    const el = document.createElement("div");
    el.className = "particle";
    el.style.cssText = `
      position:absolute;width:4px;height:4px;border-radius:50%;
      background:rgba(132,0,255,1);box-shadow:0 0 6px rgba(132,0,255,.6);
      pointer-events:none;z-index:100;left:${x}px;top:${y}px;
    `;
    return el;
  }, []);

  const memoizeParticles = useCallback(() => {
    if (particlesInit.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    Array.from({ length: 12 }).forEach(() => {
      memoizedParticles.current.push(createParticle(Math.random() * width, Math.random() * height));
    });
    particlesInit.current = true;
  }, [createParticle]);

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    particlesRef.current.forEach(p =>
      gsap.to(p, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => p.parentNode && p.parentNode.removeChild(p),
      })
    );
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInit.current) memoizeParticles();

    memoizedParticles.current.forEach((particle, i) => {
      const id = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.set(clone, { scale: 0, opacity: 0 });
        gsap.to(clone, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
        gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: "power2.inOut", repeat: -1, yoyo: true });
      }, i * 100);
      timeoutsRef.current.push(id);
    });
  }, [memoizeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const handleIn = () => { isHoveredRef.current = true; animateParticles(); };
    const handleOut = () => { isHoveredRef.current = false; clearParticles(); };

    const node = cardRef.current;
    node.addEventListener("mouseenter", handleIn);
    node.addEventListener("mouseleave", handleOut);
    return () => {
      isHoveredRef.current = false;
      node.removeEventListener("mouseenter", handleIn);
      node.removeEventListener("mouseleave", handleOut);
      clearParticles();
    };
  }, [animateParticles, clearParticles, disableAnimations]);

  return (
    <div
      ref={cardRef}
      className={`${className} particle-container`}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {children}
    </div>
  );
};

const GlobalSpotlight = ({ gridRef, disableAnimations = false }) => {
  const spotlightRef = useRef(null);
  const isInsideSectionRef = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current) return;

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `
      position:fixed;width:800px;height:800px;border-radius:50%;pointer-events:none;
      background:radial-gradient(circle,rgba(132,0,255,.15) 0%,rgba(132,0,255,.08) 15%,
      rgba(132,0,255,.04) 25%,rgba(132,0,255,.02) 40%,rgba(132,0,255,.01) 65%,transparent 70%);
      z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const move = e => {
      if (!spotlightRef.current || !gridRef.current) return;
      const section = gridRef.current.closest(".features-section");
      const rect = section?.getBoundingClientRect();
      const inside =
        rect &&
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom;

      isInsideSectionRef.current = inside;
      const cards = gridRef.current.querySelectorAll(".feature-card");

      if (!inside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
        cards.forEach(card => card.style.setProperty("--glow-intensity", "0"));
        return;
      }

      let minDist = Infinity;
      const prox = 100, fade = 150;
      cards.forEach(card => {
        const r = card.getBoundingClientRect(),
          cx = r.left + r.width / 2,
          cy = r.top + r.height / 2,
          d = Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(r.width, r.height) / 2,
          ed = Math.max(0, d);
        minDist = Math.min(minDist, ed);

        const rx = ((e.clientX - r.left) / r.width) * 100,
          ry = ((e.clientY - r.top) / r.height) * 100;
        let glow = 0;
        if (ed <= prox) glow = 1;
        else if (ed <= fade) glow = (fade - ed) / (fade - prox);
        card.style.setProperty("--glow-x", `${rx}%`);
        card.style.setProperty("--glow-y", `${ry}%`);
        card.style.setProperty("--glow-intensity", glow);
      });

      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1, ease: "power2.out" });
      const target = minDist <= prox ? 0.8 : minDist <= fade ? ((fade - minDist) / (fade - prox)) * 0.8 : 0;
      gsap.to(spotlightRef.current, { opacity: target, duration: target > 0 ? 0.2 : 0.5, ease: "power2.out" });
    };

    const leave = () => {
      isInsideSectionRef.current = false;
      gridRef.current
        ?.querySelectorAll(".feature-card")
        .forEach(card => card.style.setProperty("--glow-intensity", "0"));
      gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations]);

  return null;
};

const MoiotsoFeatureCards = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveringTestimonials, setHoveringTestimonials] = useState(false);
  const [hoveringFlowingMenu, setHoveringFlowingMenu] = useState(false);
  const [glassPosition, setGlassPosition] = useState({ x: 0, y: 0 });
  const [videoModal, setVideoModal] = useState({ isOpen: false, videoSrc: '', title: '' });
  const gridRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Video modal handlers
  const handleFlowingMenuItemClick = (item) => {
    setVideoModal({
      isOpen: true,
      videoSrc: item.videoSrc,
      title: item.hoverText
    });
  };

  const closeVideoModal = () => {
    setVideoModal({ isOpen: false, videoSrc: '', title: '' });
  };

  // Testimonial items with video sources
  const testimonialItems = [
    {
      link: "#enterprise",
      text: "No More Wasted Money",
      hoverText: "Henry's Journey to Growth and Success",
      image: "/assets/henry.jpg",
      videoSrc: "/assets/henry_testimonial.mp4"
    },
    {
      link: "#startup",
      text: "Scaling without limits",
      hoverText: "Rob's success story",
      image: "/assets/rob.jpg",
      videoSrc: "/assets/rob_testimonial.mp4"
    },
    {
      link: "#digital",
      text: "From frustration to success",
      hoverText: "Andrew's SaaS Journey",
      image: "/assets/andrew.jpg",
      videoSrc: "/assets/andrew_testimonial.mp4"
    },
    {
      link: "#performance",
      text: "10+ Years of trust",
      hoverText: "Mike's experience",
      image: "/assets/mike.jpg",
      videoSrc: "/assets/mike_testimonial.mp4"
    }
  ];

  return (
    <div className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h3 className="features-title">Smart choices, real results.</h3>
          <p className="features-subtitle">Unlock better performance, happier users, and faster growth.</p>
        </div>

        <GlobalSpotlight gridRef={gridRef} disableAnimations={isMobile} />

        <div className="bento-grid" ref={gridRef}>
          <ParticleCard className="feature-card card1" disableAnimations={isMobile}>
            <div className="hero-pixel-card">
              <PixelCard 
                variant="blue"
                gap={8}
                speed={30}
                colors="#8660fa,#a855f7,#c084fc"
                className="full-card-pixel"
              />
            </div>
            <h2>{isMobile ? "100" : <CountUp to={100} />}%</h2>
            <h3>Clear Vision</h3>
            <p>Aligned teams. Focused goals. Faster delivery.</p>
          </ParticleCard>

          <ParticleCard className="feature-card card2" disableAnimations={isMobile}>
            <div className="hero-metaballs">
              <MetaBalls 
                color="#8660fa"
                cursorBallColor="#a855f7"
                speed={0.5}
                animationSize={25}
                ballCount={5}
                cursorBallSize={5}
                className="hero-metaballs"
              />
            </div>
            <h2>{isMobile ? "80" : <CountUp to={80} />}+</h2>
            <h3>Smart Investment</h3>
            <p>Scalable solutions that save time and drive results.</p>
          </ParticleCard>

          <ParticleCard className="feature-card card4" disableAnimations={isMobile}>
            <div className="hero-profile-card">
              <ProfileCard 
                avatarUrl="/assets/person.png"
                miniAvatarUrl="/assets/person.png"
                name="Alex Johnson"
                title="Happy Customer"
                handle="alexj"
                status="Online"
                contactText="Contact"
                showUserInfo={false}
                enableTilt={true}
                showBehindGradient={false}
                className="feature-profile-card"
              />
            </div>
            <h2>{isMobile ? "30+" : <CountUp to={30} />}</h2>
            <h3>Happy Customers</h3>
            <p>Smooth experiences that keep users coming back.</p>
          </ParticleCard>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <h3 className="testimonials-title">Real stories, real impact.</h3>
            <p className="testimonials-subtitle">See how we've transformed businesses and delivered exceptional results.</p>
          </div>
        </div>

        {/* Full Width FlowingMenu */}
        <div 
          className="flowing-menu-container"
          
        >
          <FlowingMenu 
            items={testimonialItems}
            onItemClick={handleFlowingMenuItemClick}
          />
        </div>
      </div>

      {/* Video Modal */}
      {videoModal.isOpen && (
        <VideoModal 
          isOpen={videoModal.isOpen}
          onClose={closeVideoModal}
          videoSrc={videoModal.videoSrc}
          title={videoModal.title}
        />
      )}
    </div>
  );
};

export default MoiotsoFeatureCards;
