import './CallToActionSection.css';
import CardSwap, { Card } from '../../../content/Components/CardSwap/CardSwap';

const CallToActionSection = () => (
  <section className="cta-section">
    <div className="cta-inner">
      <div className="cta-content">
        <h2 className="cta-title">READY TO GROW YOUR BUSINESS?</h2>
        <p className="cta-description">
          If you’re looking for the best marketing agency that delivers real results — not just clicks and impressions — you’re in the right place. Contact us to work with a results-driven digital marketing agency.
        </p>
        <div className="cta-buttons">
          <a href="#contact" className="cta-btn primary">GET FREE PROPOSAL</a>
          <a href="tel:8669084748" className="cta-btn secondary">CALL 866.908.4748</a>
        </div>
      </div>
      <div className="cta-cards">
        <CardSwap width={340} height={220} cardDistance={40} verticalDistance={40} delay={3500}>
          <Card style={{background: 'linear-gradient(135deg, #a259ff 0%, #f8cdda 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '1px'}}>Brand Awareness</Card>
          <Card style={{background: 'linear-gradient(135deg, #23408e 0%, #7b2066 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '1px'}}>Lead Generation</Card>
          <Card style={{background: 'linear-gradient(135deg, #f8cdda 0%, #a259ff 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '1px'}}>Digital Strategy</Card>
        </CardSwap>
      </div>
    </div>
  </section>
);

export default CallToActionSection;
