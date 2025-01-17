import React, { useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { annotate } from 'rough-notation';
import { useInView } from 'react-intersection-observer';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
} from 'chart.js';

import GraphSection from '../components/GraphSection';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title);

const Navbar: React.FC = () => (
  <nav className="bg-white fixed top-0 left-0 w-full shadow-md z-10">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <div className="text-2xl font-bold text-indigo-600">Fyndget</div>
      <ul className="flex space-x-4">
        <li><a href="#features" className="text-gray-700 hover:text-indigo-600">Features</a></li>
        <li><a href="#graph" className="text-gray-700 hover:text-indigo-600">Graph</a></li>
        <li><a href="#contact" className="text-gray-700 hover:text-indigo-600">Contact</a></li>
      </ul>
    </div>
  </nav>
);

const HeroSection: React.FC = () => {
  const animation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 220, friction: 80 },
  });

  const taglineAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(-20px)' },
    to: { opacity: 1, transform: 'translateX(0px)' },
    delay: 300,
    config: { tension: 200, friction: 60 },
  });

  const buttonAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    delay: 500,
    config: { tension: 300, friction: 40 },
  });

  const annotationRef = useRef(null);

  useEffect(() => {
    if (annotationRef.current) {
      const annotation = annotate(annotationRef.current, {
        type: 'underline',
        color: '#4338ca',
        animationDuration: 1000,
        iterations: 3,
      });
      annotation.show();
    }
  }, []);

  return (
    <animated.div style={animation} className="text-center mt-16 pt-20">
      <animated.h1
        style={taglineAnimation}
        className="text-4xl md:text-6xl font-bold text-gray-900 mb-4"
        ref={annotationRef}
      >
        Take Control of Your Finances with <span className="text-indigo-600">Fyndget</span>
      </animated.h1>
      <animated.p style={taglineAnimation} className="text-lg text-gray-700 mb-8">
        Get insightful predictions and manage your budget effortlessly.
      </animated.p>
      <animated.div style={buttonAnimation}>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full">
          Get Started
        </button>
      </animated.div>
    </animated.div>
  );
};

const FeaturesSection: React.FC = () => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 800,
    config: { duration: 1000 },
  });

  return (
    <animated.div
      id="features"
      style={fadeIn}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
    >
      <div className="text-center">
        <div className="bg-indigo-100 text-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m-2.912 9.762c1.123-.086 1.994-.337 2.829-.575z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Smart Predictions</h3>
        <p className="text-gray-600">AI-powered predictions to help you plan your finances.</p>
      </div>
      <div className="text-center">
        <div className="bg-indigo-100 text-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Spending Insights</h3>
        <p className="text-gray-600">
          Understand where your money is going with detailed insights.
        </p>
      </div>
      <div className="text-center">
        <div className="bg-indigo-100 text-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Easy Budgeting</h3>
        <p className="text-gray-600">
          Simple tools to create and manage your budget effectively.
        </p>
      </div>
    </animated.div>
  );
};

const FyndgetLandingPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <GraphSection />
    </div>
  );
};

export default FyndgetLandingPage;
