import React, { useEffect, useRef } from "react";
import ScrollVelocity from "../../content/TextAnimations/ScrollVelocity/ScrollVelocity";
import "../../content/TextAnimations/ScrollVelocity/ScrollVelocity.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techsRow1 = [
  "Python", "JavaScript", "Java", "Node.js", "React", "Vue.js", "Angular", ".NET", "C#", "C++", "Swift", "Kotlin", "Go"
];
const techsRow2 = [
  "Ruby on Rails", "PHP", "SQL", "NoSQL", "TypeScript", "Flutter", "Dart", "HTML", "CSS", "SASS", "Bootstrap", "Tailwind CSS", "Express.js", "Laravel"
];

const ScrollVelocityShowcaseSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Example: Pin the section while in view
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: true,
      start: 'top center',
      end: 'bottom 100px',
      markers: false
    });
    return () => {
      st.kill();
      ScrollTrigger.getById('STOP-SCROLL')?.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="scroll-velocity-showcase-section">
      <ScrollVelocity
        texts={[techsRow1.join(" · ")]}
        velocity={100}
        className="scroll-velocity-text"
        numCopies={4}
        parallaxClassName="parallax"
        scrollerClassName="scroller"
      />
      <ScrollVelocity
        texts={[techsRow2.join(" · ")]}
        velocity={-100}
        className="scroll-velocity-text"
        numCopies={4}
        parallaxClassName="parallax"
        scrollerClassName="scroller"
      />
    </section>
  );
};

export default ScrollVelocityShowcaseSection;
