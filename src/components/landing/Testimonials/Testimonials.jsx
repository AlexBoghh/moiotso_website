import React, { useEffect } from 'react';
import gsap from 'gsap';
import './Testimonials.css';

const Testimonials = () => {
  useEffect(() => {
    // Font loading
    const font = new FontFace(
      'Bandeins-Strange',
      'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/61488/BandeinsStrangeVariableGX.ttf)'
    );
    font.load().then(function(loadedFont) {
      document.fonts.add(loadedFont);
    });

    // GSAP animation logic
    const container = document.querySelector('.container');
    const cuboid = document.querySelectorAll('.hi__cuboid');
    const hiWords = document.querySelectorAll('.hi__word');
    let winW = window.innerWidth;
    let winH = window.innerHeight;
    let pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };

    function setWinDimensions() {
      winW = window.innerWidth;
      winH = window.innerHeight;
    }

    function calcOffset(xPos, yPos) {
      let dX = 2 * (xPos - winW / 2) / winW;
      let dY = -2 * (yPos - winH / 2) / winH;
      return [dX, dY];
    }

    function followPointer(pX, pY) {
      let nPos = calcOffset(pX, pY);
      let nX = nPos[0];
      let nY = nPos[1];
      let positiveX = Math.sqrt(nX * nX);
      let positiveY = Math.sqrt(nY * nY);
      let deltaS = 450 * positiveX;
      let deltaW = 600 * positiveY;
      gsap.to(hiWords, {
        fontStretch: `${550 - deltaS}%`,
        fontWeight: 800 - deltaW,
        duration: 2
      });
    }

    function init() {
      setWinDimensions();
      gsap.set(container, { autoAlpha: 1 });
      gsap.timeline({ delay: 0.5 })
        .from('.hi__location--lat', {
          x: 100,
          autoAlpha: 0,
          ease: 'power4',
          duration: 1
        })
        .from('.hi__location--long', {
          x: -100,
          autoAlpha: 0,
          ease: 'power4',
          duration: 1
        }, 0)
        .from(cuboid, {
          y: winH,
          duration: 3,
          stagger: 0.14,
          ease: 'elastic(0.4,0.3)'
        }, 0);
      gsap.to(cuboid, {
        rotateX: -360,
        duration: 8,
        repeat: -1,
        ease: 'none'
      });
      gsap.fromTo(cuboid, {
        rotateY: 8,
        rotate: -10
      }, {
        rotateY: -8,
        rotate: 10,
        duration: 2.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
    }

    window.addEventListener('mousemove', function (event) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      followPointer(pointer.x, pointer.y);
    });
    window.addEventListener('touchmove', function (event) {
      pointer.x = event.touches[0].clientX;
      pointer.y = event.touches[0].clientY;
      followPointer(pointer.x, pointer.y);
    });
    window.addEventListener('touchstart', function (event) {
      pointer.x = event.touches[0].clientX;
      pointer.y = event.touches[0].clientY;
      followPointer(pointer.x, pointer.y);
    });
    window.addEventListener('resize', setWinDimensions);
    init();
    return () => {
      window.removeEventListener('mousemove', followPointer);
      window.removeEventListener('touchmove', followPointer);
      window.removeEventListener('touchstart', followPointer);
      window.removeEventListener('resize', setWinDimensions);
    };
  }, []);

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="hi">
          <div className="hi__cuboid">
            <div className="face face--front"><p className="hi__word">Get</p></div>
            <div className="face face--back"><p className="hi__word">Get</p></div>
            <div className="face face--top"><p className="hi__word">Get</p></div>
            <div className="face face--bottom"><p className="hi__word">Get</p></div>
          </div>
          <div className="hi__cuboid">
            <div className="face face--front"><p className="hi__word">In</p></div>
            <div className="face face--back"><p className="hi__word">In</p></div>
            <div className="face face--top"><p className="hi__word">In</p></div>
            <div className="face face--bottom"><p className="hi__word">In</p></div>
          </div>
          <div className="hi__cuboid">
            <div className="face face--front"><p className="hi__word">Touch</p></div>
            <div className="face face--back"><p className="hi__word">Touch</p></div>
            <div className="face face--top"><p className="hi__word">Touch</p></div>
            <div className="face face--bottom"><p className="hi__word">Touch</p></div>
          </div>
        </div>
        <div className="hi__base">
          <div className="hi__base-plate"></div>
          <p className="hi__location hi__location--lat">53.3454° N</p>
          <p className="hi__location hi__location--long">-6.3070° E</p>
        </div>
      </div>
      <div className="collection">
       
      </div>
  
    </section>
  );
};

export default Testimonials;
