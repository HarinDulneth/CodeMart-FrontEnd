import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Split text into spans
    const splitTextIntoSpans = (selector: string) => {
      const element = document.querySelector(selector);
      if (element) {
        const text = element.textContent || '';
        const splitText = text
          .split('')
          .map((char) => `<span>${char}</span>`)
          .join('');
        element.innerHTML = splitText;
      }
    };

    splitTextIntoSpans('.preloader-logo p');

    // Animate images
    gsap.to('.preloader-img-holder img', {
      left: 0,
      stagger: 0.1,
      ease: 'power4.out',
      duration: 1.5, 
      delay: 4,
    });

    gsap.to('.preloader-img-holder img', {
      left: '110%',
      stagger: -0.1,
      ease: 'power4.out',
      duration: 1.5,
      delay: 7,
    });

    // Start counter animation
    let currentValue = 0;
    const updateCounter = () => {
      if (currentValue === 100) {
        animateText();
        return;
      }

      currentValue += Math.floor(Math.random() * 10) + 1;
      currentValue = currentValue > 100 ? 100 : currentValue;
      setCounter(currentValue);

      const delay = Math.floor(Math.random() * 200) + 100;
      setTimeout(updateCounter, delay);
    };

    const animateText = () => {
      setTimeout(() => {
        const counterElement = document.querySelector('.preloader-counter p');
        if (counterElement) {
          counterElement.innerHTML = counter
            .toString()
            .split('')
            .map((char) => `<span>${char}</span>`)
            .join('') + '<span>%</span>';
        }

        gsap.to('.preloader-counter p span', {
          top: '-400px',
          stagger: 0.1,
          ease: 'power3.inOut',
          duration: 1,
        });

        gsap.to('.preloader-logo p span', {
          top: '0',
          stagger: 0.1,
          ease: 'power3.inOut',
          duration: 1,
        });

        gsap.to('.preloader-logo p span', {
          top: '-400px',
          stagger: 0.1,
          ease: 'power3.inOut',
          duration: 1,
          delay: 3,
        });

        gsap.to('.preloader-overlay', {
          opacity: 0,
          ease: 'power3.inOut',
          duration: 1,
          delay: 4,
          onComplete: () => {
            onComplete();
          },
        });
      }, 300);
    };

    updateCounter();
  }, [onComplete]);

  return (
    <div className="preloader-overlay">
      <style>{`
        .preloader-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #e6e0d8;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .preloader-overlay-content {
          width: 40%;
        }

        .preloader-images {
          position: relative;
          height: 550px;
        }

        .preloader-img-holder {
          position: relative;
          width: 80%;
          height: 100%;
          margin: 0 auto;
          z-index: 2;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        }

        .preloader-img-holder img {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .preloader-text {
          position: relative;
          margin: 1em 0;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        }

        .preloader-counter,
        .preloader-logo p {
          font-size: 200px;
          text-align: center;
          text-transform: uppercase;
        }

        .preloader-counter p {
          line-height: 100%;
        }

        .preloader-counter p span,
        .preloader-logo p span {
          position: relative;
          z-index: -2;
          color: #000000;
        }

        .preloader-logo {
          position: absolute;
          top: 0%;
          left: 50%;
          transform: translateX(-50%);
        }

        .preloader-logo p {
          line-height: 100%;
          font-size: 100px;
        }

        .preloader-logo p span {
          position: relative;
          top: 200px;
        }

        @media(max-width: 900px) {
          .preloader-overlay-content {
            width: 75%;
          }

          .preloader-counter,
          .preloader-logo p {
            font-size: 100px;
          }

          .preloader-images {
            height: 350px;
          }
        }
      `}</style>
      
      <div className="preloader-overlay-content">
        <div className="preloader-images">
          <div className="preloader-img-holder">
            <img src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" />
            <img src="https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" />
            <img src="https://images.pexels.com/photos/4968371/pexels-photo-4968371.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" />
            <img src="https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" />
            <img src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" />
          </div>
        </div>
        <div className="preloader-text">
          <div className="preloader-counter">
            <p>{counter}%</p>
          </div>
          <div className="preloader-logo">
            <p>CodeMart</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
