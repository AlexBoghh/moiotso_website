import React from 'react';
import InfiniteMenu from '../../../content/Components/InfiniteMenu/InfiniteMenu';
import './TechnologiesSection.css';

const technologyItems = [
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    link: 'https://reactjs.org/',
    title: 'React',
    description: 'A JavaScript library for building user interfaces'
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    title: 'JavaScript',
    description: 'Dynamic programming language for web development'
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    link: 'https://www.typescriptlang.org/',
    title: 'TypeScript',
    description: 'Typed superset of JavaScript for better development'
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    link: 'https://nodejs.org/',
    title: 'Node.js',
    description: 'JavaScript runtime for server-side development'
  },
  {
    image: '/assets/tech-icons/python.png',
    link: 'https://www.python.org/',
    title: 'Python',
    description: 'Versatile programming language for various applications'
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    link: 'https://nextjs.org/',
    title: 'Next.js',
    description: 'Full-stack React framework for production'
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    link: 'https://tailwindcss.com/',
    title: 'Tailwind CSS',
    description: 'Utility-first CSS framework for rapid UI development'
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    link: 'https://www.mongodb.com/',
    title: 'MongoDB',
    description: 'NoSQL database for modern applications'
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    link: 'https://expressjs.com/',
    title: 'Express.js',
    description: 'Fast, unopinionated web framework for Node.js'
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    link: 'https://www.docker.com/',
    title: 'Docker',
    description: 'Platform for developing, shipping, and running applications'
  },
  {
    image: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    link: 'https://aws.amazon.com/',
    title: 'AWS',
    description: 'Comprehensive cloud computing platform'
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    link: 'https://git-scm.com/',
    title: 'Git',
    description: 'Distributed version control system'
  }
];

const TechnologiesSection = () => {
  return (
    <section className="technologies-section">
      <div className="technologies-content">
        <div className="technologies-header" style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '2rem' }}>
          <h2
            className="technologies-title"
            style={{
              fontSize: '4rem',
              fontWeight: 600,
              letterSpacing: '-2px',
              color: '#8660fa',
              marginBottom: '.2rem',
              background: 'linear-gradient(135deg, #8660fa 0%, #a855f7 40%, #8400ff 60%, #a855f7 80%, #fff 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textAlign: 'center',
              animation: 'gradientShift 4s ease-in-out infinite',
              display: 'inline-block',
              whiteSpace: 'nowrap',
            }}
          >
            Technologies We Master
          </h2>
          <p
            className="technologies-subtitle"
            style={{
              fontSize: '1.2rem',
              color: '#ffffffb7',
              textShadow:
                '0 0 2px rgba(255,255,255,0.1), 0 0 4px rgba(255,255,255,0.3), 0 0 8px rgba(255,255,255,0.4), 0 0 136px rgba(132,0,255,0.9)',
              fontWeight: 400,
              textAlign: 'center',
            }}
          >
            Explore our comprehensive tech stack through our interactive 3D showcase
          </p>
        </div>
        
        <div className="demo-container" style={{ 
          height: '600px', 
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          padding: 0,
          background: '#060010',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.05)'
        }}>
          <div style={{
            height: '600px',
            overflow: 'hidden',
            width: '100%',
            padding: 0,
            opacity: 1,
            transform: 'scale(1)',
            transition: '1s ease'
          }}>
            <InfiniteMenu items={technologyItems} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
