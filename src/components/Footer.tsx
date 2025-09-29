import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Code, Github, Twitter, Linkedin } from 'lucide-react';
import footerimg from '../assets/footerimg.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    if (footerRef.current && imageRef.current && contentRef.current) {
      // Pin the footer image when it hits the navbar (assuming navbar is ~64px high)
      ScrollTrigger.create({
        trigger: imageRef.current,
        start: "top 64px",
        end: () => `+=${window.innerHeight}`,
        pin: true,
        pinSpacing: false,
        scrub: false,
      });

      // Animate the footer content to slide up over the pinned image
      gsap.fromTo(contentRef.current, 
        { y: "-40%" },
        {
          y: "0%",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 64px",
            end: "bottom 64px",
            scrub: 1,
          }
        }
      );
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <footer ref={footerRef} className="relative">
      {/* Full Screen Footer Image */}
      <div 
        ref={imageRef}
        className="w-screen h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center" 
        style={{ backgroundImage: `url(${footerimg})` }}>
        <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl md:text-2xl mb-8">Join thousands of developers on CodeMarket</p>
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
      
      {/* Actual Footer Content - Overlapping */}
      <div 
        ref={contentRef}
        className="relative bg-gray-900 text-white rounded-t-3xl shadow-2xl z-20 max-w-[1700px] mx-auto"
      >
        <div className="px-6 sm:px-8 lg:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold mb-4">
              <Code className="h-8 w-8 text-indigo-400" />
              <span>CodeMarket</span>
            </Link>
            <p className="text-gray-400 mb-4">
              The premier marketplace for buying and selling software projects. 
              Connect with developers worldwide and find your next project or sell your creation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-white transition-colors">
                  Browse Projects
                </Link>
              </li>
              <li>
                <Link to="/sell" className="text-gray-400 hover:text-white transition-colors">
                  Sell Project
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 CodeMarket. All rights reserved.</p>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;