import React from 'react';
import { useState } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import './HeroBlock.css'; // Import the CSS file for custom styling

import PopUp from "./PopUp";
import ContactForm from "./ContactForm";

import { useTranslation } from 'react-i18next';

const HeroBlock = ({ buttonLink, imageUrl }) => {
  const { t, i18n } = useTranslation();  
  
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    
    return (
      <>
      <section className="hero-block">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>

              {/* <HeroTitle /> */}

              <div className="text-black min-h-screen flex items-center justify-center relative overflow-hidden">
                {/* Decorative items */}
                <div className="absolute top-16 left-24 transform -rotate-12 z-10">
                  <div className="relative w-24 h-5 bg-yellow-400">
                    <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-pink-300"></div>
                    <div className="absolute top-0 -right-5 w-0 h-0 border-l-8 border-l-yellow-400 border-y-5 border-y-transparent"></div>
                  </div>
                </div>
                
                <div className="absolute top-12 right-24 z-10">
                  <div className="w-16 h-16 rounded-full bg-teal-500 border-2 border-cyan-300 relative">
                    <div className="absolute top-2 left-5 w-8 h-5 rounded-full bg-cyan-300 opacity-50"></div>
                  </div>
                </div>
                
                <div className="absolute bottom-20 right-32 z-10">
                  <div className="w-12 h-20 bg-yellow-400 rounded-full relative">
                    <div className="absolute -bottom-2 left-4 w-5 h-4 bg-yellow-500 rounded-md"></div>
                  </div>
                </div>
                
                <div className="absolute bottom-24 left-28 z-10">
                  <div className="w-20 h-16 bg-blue-400 relative rounded-md">
                    <div className="absolute top-1 left-1 w-16 h-12 bg-white opacity-30 rounded-sm"></div>
                  </div>
                </div>
                
                <div className="absolute top-48 left-48 z-10">
                  <div className="w-16 h-16 rounded-full bg-purple-600"></div>
                </div>
                
                <div className="absolute top-40 right-56 z-10">
                  <div className="w-24 h-24 rounded-full bg-amber-600 border-4 border-amber-400 flex items-center justify-center">
                    <span className="text-4xl font-black">A</span>
                  </div>
                </div>
                
                {/* Main content */}
                <div className="text-center z-20 max-w-4xl px-4">
                  <h1 className="leading-none">
                    <span className="block font-black text-6xl uppercase tracking-tight mb-2 md:text-7xl">
                      CREATE NEW
                    </span>
                    <span className="block font-extrabold text-7xl uppercase text-amber-400 mb-2 md:text-8xl">
                      EXPERIENCE
                    </span>
                    <span className="block font-black text-6xl uppercase tracking-tight mb-2 md:text-7xl">
                      WITH
                    </span>
                    <span className="block font-black text-6xl uppercase tracking-tight mb-2 md:text-7xl">
                      WAYS OF
                    </span>
                    <span className="block font-bold text-5xl text-blue-400 uppercase tracking-wider md:text-6xl">
                      PERFECT LEARNING
                    </span>
                  </h1>
                  <p className="font-medium text-xl text-black mt-8 max-w-2xl mx-auto">
                    Discover innovative approaches to education that transform how you acquire knowledge and skills
                  </p>
                </div>
              </div>


              <h1 className="hero-title">{t('hero.title')}</h1>
              <p className="hero-description">{t('hero.description')}</p>

              <Button 
                onClick={() => setIsPopUpOpen(true)}
                variant="primary" 
                href={buttonLink} 
                className="hero-btn">
                  {t('hero.buttonText')} 
              </Button>

            </Col>
            <Col md={6}>
              <img src={imageUrl} alt="Hero" className="img-fluid hero-image" />
            </Col>
          </Row>
        </Container>

        <PopUp isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)}>
          <ContactForm />
        </PopUp>

      </section>
    </>
    );
  };

export default HeroBlock;
