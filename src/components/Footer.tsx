import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Code, Github, Twitter, Linkedin } from "lucide-react";
import footerimg from "../assets/footerimg.jpg";
import { gsap, ScrollTrigger } from "@/utils/gsapConfig";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    if (footerRef.current && imageRef.current && contentRef.current) {
      // Pin the hero image section
      const pinTrigger = ScrollTrigger.create({
        trigger: imageRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 1.5}`,
        pin: true,
        pinSpacing: false,
      });
      triggers.push(pinTrigger);

      // Animate footer content to slide up from bottom
      const slideAnimation = gsap.fromTo(
        contentRef.current,
        { 
          yPercent: 100,
        },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.5}`,
            scrub: 1,
          },
        }
      );

      if (slideAnimation.scrollTrigger) {
        triggers.push(slideAnimation.scrollTrigger);
      }
    }

    // Cleanup function - only kill this component's triggers
    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
    {/* Footer Hero Container */}
    <div
        ref={imageRef}
        className="relative w-screen h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center z-30"
        style={{ backgroundImage: `url(${footerimg})` }}
      >
        <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl md:text-2xl mb-8">
              Join thousands of developers on CodeMarket
            </p>
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
      
    <footer ref={footerRef} className="relative z-40">
      {/* Actual Footer Content - Overlapping */}
      <div
        ref={contentRef}
        className="relative bg-[#171717] text-white rounded-t-3xl shadow-2xl z-20 max-w-[1700px] mx-auto"
      >
        <div className="px-6 sm:px-8 lg:px-12 py-32">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <Link
                to="/"
                className="flex items-center space-x-2 text-2xl font-bold mb-4"
              >
                <Code className="h-8 w-8 text-white" />
                <span className="text-white">CodeMart</span>
              </Link>
              <p className="text-white/75 mb-4">
                The premier marketplace for buying and selling software
                projects. Connect with developers worldwide and find your next
                project or sell your creation.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-white/75 hover:text-white transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-white/75 hover:text-white transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-white/75 hover:text-white transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white/95">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/projects"
                    className="text-white/75 hover:text-white transition-colors"
                  >
                    Browse Projects
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sell"
                    className="text-white/75 hover:text-white transition-colors"
                  >
                    Sell Project
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="text-white/75 hover:text-white transition-colors"
                  >
                    My Profile
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white/95">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-white/75 hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/75 hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/75 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white/75 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Developers */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white/95">
                Developers
              </h3>
              <div className="space-y-4">
                {/* Sanjana Dissanayaka */}
                <div className="bg-[#2e2e2e] rounded-lg p-3">
                  <h4 className="text-[#a2a2a2] font-medium text-sm mb-2">
                    Sanjana Dissanayaka
                  </h4>
                  <div className="flex space-x-2">
                    <a
                      href="https://github.com/sanjanadissa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a2a2a2] hover:text-white transition-colors"
                      title="GitHub Profile"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/sanjana-dissanayake-b04963302/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a2a2a2] hover:text-white transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                {/* Harin Dulneth */}
                <div className="bg-[#2e2e2e] rounded-lg p-3">
                  <h4 className="text-[#a2a2a2] font-medium text-sm mb-2">
                    Harin Dulneth
                  </h4>
                  <div className="flex space-x-2">
                    <a
                      href="https://github.com/HarinDulneth"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a2a2a2] hover:text-white transition-colors"
                      title="GitHub Profile"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/harin-dulneth-1b8455352/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#a2a2a2] hover:text-white transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Content Section */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-4 text-white/95">
                  Join Our Community
                </h4>
                <p className="text-[#b9b9b9] text-sm">
                  Connect with thousands of developers, share your projects, and
                  discover amazing software solutions.
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-4 text-white/95">
                  Start Selling Today
                </h4>
                <p className="text-[#b9b9b9] text-sm">
                  Turn your code into cash. List your projects and start earning
                  from your development work.
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-4 text-white/95">
                  Quality Assured
                </h4>
                <p className="text-[#b9b9b9] text-sm">
                  Every project is reviewed by our team to ensure high quality
                  and functionality.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-white/45">
            <p>&copy; 2025 CodeMart. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
