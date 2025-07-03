import React from 'react';
import { gsap } from 'gsap';

import './FlowingMenu.css';

function FlowingMenu({ items = [], onItemClick }) {
  return (
    <div className="menu-wrap">
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} onItemClick={onItemClick} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, image, hoverText, videoSrc, onItemClick }) {
  const itemRef = React.useRef(null);
  const marqueeRef = React.useRef(null);
  const marqueeInnerRef = React.useRef(null);
  const linkRef = React.useRef(null);
  const [isHovered, setIsHovered] = React.useState(false);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const distMetric = (x, y, x2, y2) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const handleMouseEnter = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    setIsHovered(true);
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap.timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    setIsHovered(false);
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap.timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  // Function to highlight names in hover text
  const highlightNames = (text) => {
    if (!text) return text;
    
    // Pattern to match names (word followed by 's) - updated to handle both ' and '
    const namePattern = /(\w+['']s)/g;
    
    // Split text by the pattern and map to JSX elements
    const parts = [];
    let lastIndex = 0;
    let match;
    
    // Reset regex state
    namePattern.lastIndex = 0;
    
    while ((match = namePattern.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      
      // Add the highlighted name
      parts.push(
        <span key={`name-${match.index}`} className="highlighted-name">
          {match[1]}
        </span>
      );
      
      lastIndex = match.index + match[1].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    
    return parts.length > 1 ? parts : text;
  };

  const repeatedMarqueeContent = Array.from({ length: 8 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span>
        {isHovered && hoverText ? highlightNames(hoverText) : text}
      </span>
      <div
        className="marquee__img"
        style={{ backgroundImage: `url(${image})` }}
      />
    </React.Fragment>
  ));

  const handleClick = (e) => {
    e.preventDefault();
    if (onItemClick) {
      onItemClick({ link, text, image, hoverText, videoSrc });
    }
  };

  return (
    <div className="menu__item" ref={itemRef}>
      <a
        className="menu__item-link"
        href={link}
        ref={linkRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {isHovered && hoverText ? highlightNames(hoverText) : text}
      </a>
      <div className="marquee" ref={marqueeRef}>
        <div className="marquee__inner-wrap" ref={marqueeInnerRef}>
          <div className="marquee__inner" aria-hidden="true">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;
