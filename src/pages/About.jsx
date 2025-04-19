import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaArrowRight, FaStar, FaCar, FaUser, FaHistory, FaCamera, FaCheck, FaPhone, FaEnvelope, FaMapMarkerAlt, FaGraduationCap, FaAward, FaUsers } from 'react-icons/fa';
import { Container, Row, Col, Card, Button, Modal, ProgressBar } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import HeroBlock from "../components/HeroBlock"
import HistoryBlock from "../components/HistoryBlock"
import CarParkBlock from "../components/CarParkBlock"
import InstructorsBlock from "../components/InstructorsBlock"
import PhotoGallery from "../components/PhotoGallery"

const heroData = {
    imageUrl: '/images/hero.jpg',
    title: 'About Our School',
    subtitle: 'Professional driving education since 2005',
    features: [
        { icon: <FaGraduationCap />, text: 'Professional Training' },
        { icon: <FaAward />, text: 'Guaranteed Results' },
        { icon: <FaUsers />, text: 'Experienced Instructors' }
    ]
};

const historyData = {
    imageUrl: '/images/driving-school-history.jpg',
};

const carData = [
    {
      model: 'Toyota Corolla',
      year: 2022,
      engine: '1.8 l, 140 kW',
      transmission: 'Automatic',
      fuel: 'Gasoline',
      imageUrl: '/images/toyota-corolla.jpg',
    },
    {
      model: 'Volkswagen Golf',
      year: 2021,
      engine: '1.6 l, 110 kW',
      transmission: 'Manual',
      fuel: 'Diesel',
      imageUrl: '/images/vw-golf.jpg',
    },
    {
      model: 'Hyundai Solaris',
      year: 2023,
      engine: '1.6 l, 123 kW',
      transmission: 'Automatic',
      fuel: 'Diesel',
      imageUrl: '/images/hyundai-solaris.jpg',
    },
  ];
  
  const instructorsData = [
    {
      name: 'John Smith',
      role: 'Senior Instructor',
      experience: '15 years',
      imageUrl: '/images/instructor1.jpg',
      rating: 4.9,
      students: 500,
      phone: '+1234567890',
      email: 'john@example.com'
    },
    {
      name: 'Мария Сидорова',
      experience: 8,
      imageUrl: '/images/instructor-maria.jpg',
    },
    {
      name: 'Александр Кузнецов',
      experience: 12,
      imageUrl: '/images/instructor-alex.jpg',
    },
  ];  

const galleryImages = [
    '/images/gallery1.jpg',
    '/images/gallery2.jpg',
    '/images/gallery3.jpg',
    '/images/gallery4.jpg',
    '/images/gallery5.jpg',
    '/images/gallery6.jpg',
];  
  
const historyStats = [
  { value: '18+', label: 'Years of Experience' },
  { value: '4500+', label: 'Graduates' },
  { value: '98%', label: 'Pass Rate' }
];

const About = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('hero');
  const [showModal, setShowModal] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'history', 'instructors', 'car-park'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = (window.scrollY / documentHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  const handleInstructorClick = (instructor) => {
    setSelectedInstructor(instructor);
    setShowModal(true);
  };

  return (
    <div className="about-page">
      {/* Progress Bar */}
      <div className="progress-bar-fixed">
        <ProgressBar now={scrollProgress} variant="success" />
      </div>

      {/* Hero Section */}
      <motion.section
        id="hero"
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="hero-content">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t('about.hero.title')}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {t('about.hero.subtitle')}
          </motion.p>
          <motion.div
            className="hero-features"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {heroData.features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-item"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {feature.icon}
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* History Section */}
      <motion.section
        id="history"
        className="history-section"
        ref={aboutRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <Container>
          <Row>
            <Col md={6}>
              <motion.div
                className="history-content"
                initial={{ x: -50, opacity: 0 }}
                animate={isVisible ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2>{t('about.history.title')}</h2>
                <p>{t('about.history.description')}</p>
                <div className="stats-grid">
                  {historyStats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="stat-item"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <h3>{stat.value}</h3>
                      <p>{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Col>
            <Col md={6}>
              <motion.div
                className="history-image"
                initial={{ x: 50, opacity: 0 }}
                animate={isVisible ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
                transition={{ delay: 0.4 }}
              >
                <img src="/images/history.jpg" alt="School History" />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.section>

      {/* Instructors Section */}
      <motion.section
        id="instructors"
        className="instructors-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Container>
          <h2>{t('about.instructors.title')}</h2>
          <Row>
            {instructorsData.map((instructor, index) => (
              <Col key={index} md={4}>
                <motion.div
                  whileHover={{ y: -10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className="instructor-card" onClick={() => handleInstructorClick(instructor)}>
                    <Card.Img variant="top" src={instructor.imageUrl} />
                    <Card.Body>
                      <Card.Title>{instructor.name}</Card.Title>
                      <Card.Text>{instructor.experience} {t('about.instructors.years')}</Card.Text>
                      <div className="instructor-stats">
                        <span><FaStar /> {instructor.experience}</span>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </motion.section>

      {/* Car Park Section */}
      <motion.section
        id="car-park"
        className="car-park-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Container>
          <h2>{t('about.carPark.title')}</h2>
          <Row>
            {carData.map((car, index) => (
              <Col key={index} md={4}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className="car-card">
                    <Card.Img variant="top" src={car.imageUrl} />
                    <Card.Body>
                      <Card.Title>{car.model}</Card.Title>
                      <Card.Text>{car.year}</Card.Text>
                      <div className="car-features">
                        <span><strong>{t('about.cars.engine')}:</strong> {car.engine}</span>
                        <span><strong>{t('about.cars.transmission')}:</strong> {car.transmission}</span>
                        <span><strong>{t('about.cars.fuel')}:</strong> {car.fuel}</span>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </motion.section>

      {/* Instructor Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        {selectedInstructor && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedInstructor.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={4}>
                  <img src={selectedInstructor.imageUrl} alt={selectedInstructor.name} className="img-fluid" />
                </Col>
                <Col md={8}>
                  <h4>{selectedInstructor.name}</h4>
                  <p>{selectedInstructor.experience} {t('about.instructors.years')}</p>
                  <div className="instructor-contact">
                    <Button variant="outline-primary" href={`tel:${selectedInstructor.experience}`}>
                      <FaPhone /> {t('common.call')}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  );
};

export default About;