import React from "react";
import "./CallToActionSection.css";
import CardSwap, { Card } from '../../../content/Components/CardSwap/CardSwap';

const CallToActionSection = () => (
  <section className="call-to-action-section card-stack-demo-section">
    <div className="card-stack-demo-container">
      <div className="card-stack-demo-left">
        <h2 className="card-stack-demo-title">Ready to <br />Accelerate Your Software <br />Development?</h2>
        <div className="cta-btn-glow-wrap">
          <button className="landing-button">
            <span>Book a call!</span>
            <div className="button-arrow-circle">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
        </div>
      </div>
      <div className="card-stack-demo-right">
        <CardSwap width={540} height={320} cardDistance={32} verticalDistance={35} skewAmount={0}>
          <Card customClass="card-stack-demo-card" style={{ background: '#2d2d2d', color: '#fff', border: 'none', boxShadow: '0 8px 32px rgba(18,12,28,0.10)' }}>
            <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
              <div className="card-stack-demo-tab">Vetted Team</div>
              <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#4ec46e', borderRadius: '0 0 20px 20px'}}>
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40 12L64 22V38C64 54 40 68 40 68C40 68 16 54 16 38V22L40 12Z" fill="#fff" fillOpacity="0.18" stroke="#fff" strokeWidth="4"/>
                  <path d="M32 40L38 46L50 34" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </Card>
          <Card customClass="card-stack-demo-card" style={{ background: '#232323', color: '#fff', border: 'none', boxShadow: '0 8px 32px rgba(18,12,28,0.10)' }}>
            <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
              <div className="card-stack-demo-tab">Custom Plans</div>
              <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #a259ff 0%, #6a82fb 100%)', borderRadius: '0 0 20px 20px'}}>
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="40" cy="40" r="36" stroke="#fff" strokeWidth="4" fill="none"/>
                  <path d="M40 25v15l12 7" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="40" cy="40" r="6" fill="#fff"/>
                </svg>
              </div>
            </div>
          </Card>
          <Card customClass="card-stack-demo-card" style={{ background: '#18181b', color: '#fff', border: 'none', boxShadow: '0 8px 32px rgba(18,12,28,0.10)' }}>
            <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
              <div className="card-stack-demo-tab">Expert Support</div>
              <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', borderRadius: '0 0 20px 20px'}}>
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="18" y="28" width="44" height="24" rx="8" stroke="#fff" strokeWidth="4" fill="none"/>
                  <circle cx="28" cy="40" r="4" fill="#fff"/>
                  <rect x="36" y="36" width="20" height="8" rx="4" fill="#fff"/>
                </svg>
              </div>
            </div>
          </Card>
        </CardSwap>
      </div>
    </div>
  </section>
);

export default CallToActionSection;