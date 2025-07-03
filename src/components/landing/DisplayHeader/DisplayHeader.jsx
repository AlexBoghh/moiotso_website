import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Logo } from '../../common/Misc/SVGComponents';
import { useStars } from '../../../hooks/useStars';
import star from '../../../assets/common/star.svg';
import './DisplayHeader.css';

const DisplayHeader = ({ activeItem }) => {
  const navRef = useRef(null);
  const starCountRef = useRef(null);
  const stars = useStars();

  useEffect(() => {
    if (stars && starCountRef.current) {
      gsap.fromTo(starCountRef.current,
        {
          scale: 0,
          width: 0,
          opacity: 0
        },
        {
          scale: 1,
          width: "100px",
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1)"
        }
      );
    }
  }, [stars]);

  return (
    <header className="header">
      <div className='header-container'>
        <Link to="/" className="logo">
          Moiotso
        </Link>

        <div className="nav-cta-group">
          <nav className="landing-nav-items" ref={navRef}>
            <Link className={`nav-link ${activeItem === 'home' && 'active-link'}`} to="/">Home</Link>
            <Link className='nav-link' to="#">Get in Touch</Link>
            <Link className={`nav-link ${activeItem === 'showcase' && 'active-link'}`} to="#">Testimonials</Link>
          </nav>

        
        </div>
      </div>
    </header>
  );
};

export default DisplayHeader;