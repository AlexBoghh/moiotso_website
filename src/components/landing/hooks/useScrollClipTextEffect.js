import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function useScrollClipTextEffect() {
  useEffect(() => {
    // Wait for DOM paint to ensure .text elements are present
    setTimeout(() => {
      const textElements = gsap.utils.toArray('.scroll-clip-effect-container .text');
      const triggers = [];
      textElements.forEach(text => {
        // Reset background size for repeatable effect
        gsap.set(text, { backgroundSize: '0% 100%' });
        const trigger = ScrollTrigger.create({
          trigger: text,
          start: 'center 80%',
          end: 'center 20%',
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(text, { backgroundSize: `${progress * 100}% 100%` });
          },
        });
        triggers.push(trigger);
      });
    }, 0);
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}
