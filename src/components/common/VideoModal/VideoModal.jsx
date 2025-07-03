import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import './VideoModal.css';

const VideoModal = ({ isOpen, onClose, videoSrc, title }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Animate modal in
      gsap.timeline()
        .set(modalRef.current, { display: 'flex' })
        .fromTo(backdropRef.current, 
          { opacity: 0 }, 
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        )
        .fromTo(contentRef.current, 
          { scale: 0.8, opacity: 0, y: 50 }, 
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }, 
          0.1
        );

      // Play video when modal opens
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(console.error);
      }
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Animate modal out
      if (modalRef.current) {
        gsap.timeline()
          .to(contentRef.current, 
            { scale: 0.8, opacity: 0, y: 50, duration: 0.3, ease: 'power2.in' }
          )
          .to(backdropRef.current, 
            { opacity: 0, duration: 0.2, ease: 'power2.in' }, 
            0.1
          )
          .set(modalRef.current, { display: 'none' });
      }

      // Stop and reset video when modal closes
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        videoRef.current.load(); // Reset video to initial state
      }
    }

    return () => {
      document.body.style.overflow = '';
      // Cleanup: ensure video is stopped if component unmounts
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  const handleCloseClick = () => {
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="video-modal" 
      ref={modalRef}
      style={{ display: 'none' }}
    >
      <div 
        className="video-modal__backdrop" 
        ref={backdropRef}
        onClick={handleBackdropClick}
      >
        <div className="video-modal__content" ref={contentRef}>
          <button 
            className="video-modal__close" 
            onClick={handleCloseClick}
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path 
                d="M18 6L6 18M6 6l12 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
          
          {title && <h3 className="video-modal__title">{title}</h3>}
          
          <div className="video-modal__video-container">
            <video
              ref={videoRef}
              className="video-modal__video"
              controls
              preload="metadata"
              playsInline
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default VideoModal;
