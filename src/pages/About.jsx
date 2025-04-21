import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaArrowRight, FaStar, FaCar, FaUser, FaHistory, FaCamera, FaCheck, FaPhone, FaEnvelope, FaMapMarkerAlt, FaGraduationCap, FaAward, FaUsers, FaThumbsUp, FaRegClock, FaRegCalendarAlt, FaRegHandshake, FaRegLightbulb } from 'react-icons/fa';
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

  // Nudge Theory enhancements
  const [showSocialProof, setShowSocialProof] = useState(false);
  const [showCommitmentPrompt, setShowCommitmentPrompt] = useState(false);
  const [userCommitment, setUserCommitment] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Social proof data
  const socialProofData = {
    totalStudents: '4500+',
    successRate: '98%',
    avgRating: '4.9',
    activeInstructors: '15+'
  };

  // Recent success stories for social proof
  const recentSuccesses = [
    {
      name: 'Sarah M.',
      achievement: 'Passed first try',
      date: '2 days ago',
      quote: 'Best driving school experience ever!'
    },
    {
      name: 'John D.',
      achievement: 'Perfect score',
      date: '1 week ago',
      quote: 'Professional instructors made all the difference'
    },
    {
      name: 'Emma W.',
      achievement: 'Zero mistakes',
      date: '3 days ago',
      quote: 'Couldn\'t have done it without their support'
    }
  ];

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

  // Show social proof notification periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % recentSuccesses.length);
      setShowSocialProof(true);
      setTimeout(() => setShowSocialProof(false), 5000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleInstructorClick = (instructor) => {
    setSelectedInstructor(instructor);
    setShowModal(true);
  };

  // Handle commitment selection
  const handleCommitment = (type) => {
    setUserCommitment(type);
    setShowCommitmentPrompt(false);
    setShowFeedback(true);
    setFeedbackMessage(t('about.feedback.commitmentRecorded'));
    setTimeout(() => setShowFeedback(false), 3000);
  };

  return (
    <div className="about-page">
      {/* Progress Bar */}
      <div className="progress-bar-fixed">
        <ProgressBar now={scrollProgress} variant="success" />
      </div>

      {/* Hero Section with Enhanced Social Proof */}
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

          {/* Social Proof Stats */}
          <motion.div
            className="social-proof-stats"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="stats-grid">
              <motion.div className="stat-item" whileHover={{ scale: 1.05 }}>
                <FaUsers className="stat-icon" />
                <h3>{socialProofData.totalStudents}</h3>
                <p>{t('about.stats.students')}</p>
              </motion.div>
              <motion.div className="stat-item" whileHover={{ scale: 1.05 }}>
                <FaCheck className="stat-icon" />
                <h3>{socialProofData.successRate}</h3>
                <p>{t('about.stats.successRate')}</p>
              </motion.div>
              <motion.div className="stat-item" whileHover={{ scale: 1.05 }}>
                <FaStar className="stat-icon" />
                <h3>{socialProofData.avgRating}</h3>
                <p>{t('about.stats.rating')}</p>
              </motion.div>
              <motion.div className="stat-item" whileHover={{ scale: 1.05 }}>
                <FaGraduationCap className="stat-icon" />
                <h3>{socialProofData.activeInstructors}</h3>
                <p>{t('about.stats.instructors')}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* History Section with Commitment Device */}
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
                
                {/* Commitment Options */}
                <div className="commitment-options">
                  <h3>{t('about.commitment.title')}</h3>
                  <p>{t('about.commitment.subtitle')}</p>
                  <div className="commitment-buttons">
                    <motion.button
                      className="commitment-btn"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleCommitment('learn')}
                    >
                      <FaRegLightbulb />
                      {t('about.commitment.learnMore')}
                    </motion.button>
                    <motion.button
                      className="commitment-btn primary"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleCommitment('start')}
                    >
                      <FaRegHandshake />
                      {t('about.commitment.getStarted')}
                    </motion.button>
                  </div>
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

      {/* Social Proof Notification */}
      <AnimatePresence>
        {showSocialProof && (
          <motion.div 
            className="social-proof-notification"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <div className="social-proof-content">
              <FaThumbsUp className="social-proof-icon" />
              <div className="social-proof-text">
                <p className="social-proof-title">
                  {recentSuccesses[activeTestimonial].name} - {recentSuccesses[activeTestimonial].achievement}
                </p>
                <p className="social-proof-message">
                  "{recentSuccesses[activeTestimonial].quote}"
                </p>
                <p className="social-proof-date">
                  {recentSuccesses[activeTestimonial].date}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback Notification */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div 
            className="feedback-notification"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div className="feedback-content">
              <FaThumbsUp className="feedback-icon" />
              <p className="feedback-message">{feedbackMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default About;