import React, { useState, useEffect } from 'react';
// import HeroBlock from "../components/HeroBlock"
import { useTranslation } from 'react-i18next';
import { FaArrowRight, FaCheck, FaStar, FaClock, FaGraduationCap, FaInfoCircle, FaCalendar, FaUser, FaSync, FaArrowUp } from 'react-icons/fa';
import { Card, Button, Row, Col, Container, Table, Accordion } from 'react-bootstrap';

const heroData = {
  // title: 'Наши Премиум Услуги',
  // description: 'Изучите широкий спектр услуг, которые помогут вашему бизнесу расти и процветать.',
  // buttonText: 'Узнать больше',
  // buttonLink: '#services',
  imageUrl: '/images/services.jpg',
};

const categories = [
  {
    id: 1,
    name: 'Курс теории в классе',
    price: '160 евро',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/RACT-training-car-Burnie-20150216-003.jpg/330px-RACT-training-car-Burnie-20150216-003.jpg',
  },
  {
    id: 2,
    name: 'Курс вождения на мануальной коробке',
    price: '700 евро',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/RACT-training-car-Burnie-20150216-003.jpg/330px-RACT-training-car-Burnie-20150216-003.jpg',
  },
  {
    id: 3,
    name: 'Курс вождения на автоматической коробке',
    price: '840 евро',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/RACT-training-car-Burnie-20150216-003.jpg/330px-RACT-training-car-Burnie-20150216-003.jpg',
  },
  {
    id: 4,
    name: 'Курсы первой медицинской помощи',
    price: '40 евро',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/RACT-training-car-Burnie-20150216-003.jpg/330px-RACT-training-car-Burnie-20150216-003.jpg',
  },
  {
    id: 5,
    name: 'Курсы тёмного и скользкого вождения',
    price: '145 евро',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/RACT-training-car-Burnie-20150216-003.jpg/330px-RACT-training-car-Burnie-20150216-003.jpg',
  },
  {
    id: 6,
    name: 'Курсы зимнего вождения , для замены первичных прав на постоянные',
    price: '150 евро',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/RACT-training-car-Burnie-20150216-003.jpg/330px-RACT-training-car-Burnie-20150216-003.jpg',
  },
];

const schedule = [
  { date: '10 марта 2025', time: '17:00 - 19:00', course: 'Курс теории в классе', instructor: 'Игорь Нагорский' },
  { date: '12 марта 2025', time: '14:00 - 16:00', course: 'Курсы первой медицинской помощи', instructor: 'Мария Смирнова' },
  { date: '15 марта 2025', time: '18:00 - 20:00', course: 'Курсы зимнего вождения , для замены первичных прав на постоянные', instructor: 'Игорь Нагорский' },
];

// HeroBlock component with enhanced UX
const HeroBlock = ({ imageUrl }) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  
  // Track visibility for animation (System 1)
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('hero-section');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate features (System 1)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Features for System 1 & 2 integration
  const features = [
    {
      icon: <FaGraduationCap className="text-blue-500" />,
      title: t('hero.features.experience.title'),
      description: t('hero.features.experience.description')
    },
    {
      icon: <FaStar className="text-yellow-500" />,
      title: t('hero.features.quality.title'),
      description: t('hero.features.quality.description')
    },
    {
      icon: <FaClock className="text-green-500" />,
      title: t('hero.features.flexibility.title'),
      description: t('hero.features.flexibility.description')
    }
  ];
  
  return (
    <section 
      id="hero-section" 
      className={`hero-block py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('courses.hero.title', 'Наши курсы вождения')}
            </h1>
            <p className="text-xl mb-6">
              {t('courses.hero.description', 'Профессиональное обучение вождению с опытными инструкторами')}
            </p>
            
            {/* Features section - System 1 & 2 integration */}
            <div className="mt-8 space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
                    activeFeature === index 
                      ? 'bg-white bg-opacity-20 transform scale-105' 
                      : 'bg-white bg-opacity-10'
                  }`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="text-2xl">{feature.icon}</div>
                  <div>
                    <h3 className="font-bold">{feature.title}</h3>
                    <p className="text-sm opacity-90">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-8 bg-white text-blue-700 px-6 py-3 rounded-md font-semibold hover:bg-blue-100 transition-colors flex items-center transform hover:scale-105">
              {t('courses.hero.buttonText', 'Записаться на курс')} <FaArrowRight className="ml-2" />
            </button>
          </div>
          <div className="md:w-1/2">
            <img 
              src={imageUrl} 
              alt="Driving courses" 
              className="rounded-lg shadow-xl w-full h-auto transform hover:scale-105 transition-transform duration-500" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// CoursesList component with enhanced UX
const CoursesList = ({ courses }) => {
  const { t } = useTranslation();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Track visibility for animation
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('courses-section');
      if (section) {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="courses-section"
      className={`container mt-5 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <h2 className="text-center mb-8">{t("categories.title")}</h2>
      <Row>
        {courses.map((category) => (
          <Col key={category.id} md={4} className="mb-4">
            <Card 
              className={`course-card transition-all duration-300 ${
                selectedCourse === category.id ? 'border-primary shadow-lg' : ''
              }`}
              onClick={() => setSelectedCourse(category.id)}
            >
              <Card.Img 
                variant="top" 
                src={category.image} 
                alt={category.name}
                className="h-48 object-cover"
              />
              <Card.Body>
                <Card.Title className="font-bold">{category.name}</Card.Title>
                <Card.Text>
                  <strong className="text-primary">{category.price}</strong>
                </Card.Text>
                <Button 
                  variant="primary" 
                  className="w-100 hero-btn transform hover:scale-105 transition-transform"
                >
                  {t('hero.buttonText')} <FaArrowRight className="ml-2" />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

// ScheduleBlock component with enhanced UX
const ScheduleBlock = ({ schedule }) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Track visibility for animation (System 1)
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('schedule-section');
      if (section) {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Process schedule data (System 2)
  const processedSchedule = React.useMemo(() => {
    let filtered = schedule;
    
    // Apply filters
    if (filter !== 'all') {
      filtered = schedule.filter(lesson => lesson.course.includes(filter));
    }
    
    // Apply sorting
    return [...filtered].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'time') {
        return a.time.localeCompare(b.time);
      } else if (sortBy === 'course') {
        return a.course.localeCompare(b.course);
      }
      return 0;
    });
  }, [schedule, filter, sortBy]);

  // Handle registration (Action Funnel)
  const handleRegister = (lesson) => {
    setSelectedDate(schedule.indexOf(lesson));
    setShowConfirmation(true);
  };

  return (
    <section 
      id="schedule-section"
      className={`schedule-block py-5 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <Container>
        <div className="text-center mb-6">
          <h2 className="display-4 mb-3">{t('schedule.title')}</h2>
          <p className="lead text-muted">{t('schedule.subtitle', 'Выберите удобное время для обучения')}</p>
        </div>

        {/* Filters and Sorting (System 2) */}
        <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="d-flex gap-3">
            <select 
              className="form-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">{t('schedule.filters.all')}</option>
              <option value="теория">{t('schedule.filters.theory')}</option>
              <option value="вождение">{t('schedule.filters.driving')}</option>
              <option value="медицинской">{t('schedule.filters.medical')}</option>
            </select>
            <select 
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">{t('schedule.sort.date')}</option>
              <option value="time">{t('schedule.sort.time')}</option>
              <option value="course">{t('schedule.sort.course')}</option>
            </select>
          </div>
          <div className="text-muted">
            {t('schedule.available', 'Доступно')} {processedSchedule.length} {t('schedule.lessons', 'уроков')}
          </div>
        </div>

        {/* Schedule Table (System 1 & 2 Integration) */}
        <div className="table-responsive">
          <Table 
            striped 
            bordered 
            hover 
            responsive 
            className="text-center shadow-lg"
          >
            <thead className="bg-primary text-white">
              <tr>
                <th>{t('schedule.date')}</th>
                <th>{t('schedule.time')}</th>
                <th>{t('schedule.course')}</th>
                <th>{t('schedule.instructor')}</th>
                <th>{t('schedule.action')}</th>
              </tr>
            </thead>
            <tbody>
              {processedSchedule.map((lesson, index) => (
                <tr 
                  key={index}
                  className={`transition-all duration-300 cursor-pointer ${
                    selectedDate === index ? 'bg-primary bg-opacity-10' : ''
                  } ${
                    hoveredRow === index ? 'transform scale-[1.01] shadow-sm' : ''
                  }`}
                  onClick={() => setSelectedDate(index)}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="align-middle">
                    <div className="d-flex align-items-center justify-content-center">
                      <FaCalendar className="text-primary me-2" />
                      {lesson.date}
                    </div>
                  </td>
                  <td className="align-middle">
                    <div className="d-flex align-items-center justify-content-center">
                      <FaClock className="text-primary me-2" />
                      {lesson.time}
                    </div>
                  </td>
                  <td className="align-middle">
                    <div className="d-flex align-items-center justify-content-center">
                      <FaGraduationCap className="text-primary me-2" />
                      {lesson.course}
                    </div>
                  </td>
                  <td className="align-middle">
                    <div className="d-flex align-items-center justify-content-center">
                      <FaUser className="text-primary me-2" />
                      {lesson.instructor}
                    </div>
                  </td>
                  <td className="align-middle">
                    <Button 
                      variant={selectedDate === index ? "primary" : "outline-primary"}
                      size="sm"
                      className="transform hover:scale-105 transition-transform"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRegister(lesson);
                      }}
                    >
                      {t('schedule.register')}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Quick Actions (System 1) */}
        <div className="mt-4 d-flex justify-content-center gap-3">
          <Button 
            variant="outline-primary"
            className="d-flex align-items-center gap-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <FaArrowUp /> {t('schedule.scrollTop')}
          </Button>
          <Button 
            variant="outline-primary"
            className="d-flex align-items-center gap-2"
            onClick={() => setFilter('all')}
          >
            <FaSync /> {t('schedule.resetFilters')}
          </Button>
        </div>

        {/* Registration Confirmation Modal (Action Funnel) */}
        {showConfirmation && (
          <div className="modal-backdrop fade show">
            <div className="modal d-block" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{t('schedule.confirmation.title')}</h5>
                    <button 
                      type="button" 
                      className="btn-close"
                      onClick={() => setShowConfirmation(false)}
                    />
                  </div>
                  <div className="modal-body">
                    <p>{t('schedule.confirmation.message')}</p>
                    <div className="alert alert-info">
                      <strong>{t('schedule.confirmation.details')}:</strong>
                      <ul className="mb-0 mt-2">
                        <li>{t('schedule.date')}: {schedule[selectedDate].date}</li>
                        <li>{t('schedule.time')}: {schedule[selectedDate].time}</li>
                        <li>{t('schedule.course')}: {schedule[selectedDate].course}</li>
                        <li>{t('schedule.instructor')}: {schedule[selectedDate].instructor}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <Button 
                      variant="secondary" 
                      onClick={() => setShowConfirmation(false)}
                    >
                      {t('schedule.confirmation.cancel')}
                    </Button>
                    <Button 
                      variant="primary"
                      onClick={() => {
                        // Handle registration logic here
                        setShowConfirmation(false);
                      }}
                    >
                      {t('schedule.confirmation.confirm')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

// ChecklistBlock component with enhanced UX
const ChecklistBlock = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const checklistItems = t('checklist.items', { returnObjects: true });

  // Track visibility for animation
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('checklist-section');
      if (section) {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleItem = (index) => {
    setCheckedItems(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section 
      id="checklist-section"
      className={`checklist-block py-5 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <Container>
        <h2 className="text-center mb-4">{t('checklist.title')}</h2>
        <Row>
          <Col md={6}>
            <div className="bg-white rounded-lg shadow-lg p-4">
              <ul className="list-group">
                {checklistItems.map((item, index) => (
                  <li 
                    key={index} 
                    className={`list-group-item d-flex align-items-center cursor-pointer transition-colors duration-200 ${
                      checkedItems.includes(index) ? 'bg-success bg-opacity-10' : ''
                    }`}
                    onClick={() => toggleItem(index)}
                  >
                    <FaCheck 
                      className={`me-2 ${
                        checkedItems.includes(index) ? 'text-success' : 'text-muted'
                      }`}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col md={6}>
            <img 
              src="/images/checklist.jpg" 
              alt="Checklist" 
              className="img-fluid rounded shadow-lg transform hover:scale-105 transition-transform duration-500"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

// FAQBlock component with enhanced UX
const FAQBlock = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeKey, setActiveKey] = useState('0');
  const faqData = t('faq.questions', { returnObjects: true });

  // Track visibility for animation
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('faq-section');
      if (section) {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="faq-section"
      className={`faq-section py-5 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <Container>
        <h2 className="text-center mb-4">{t('faq.title')}</h2>
        <Row>
          {faqData.map((item, index) => (
            <Col md={6} key={index} className="mb-3">
              <Accordion 
                activeKey={activeKey}
                onSelect={(key) => setActiveKey(key)}
                className="shadow-lg"
              >
                <Accordion.Item eventKey={index.toString()}>
                  <Accordion.Header className="bg-white">
                    <div className="d-flex align-items-center">
                      <FaInfoCircle className="text-primary me-2" />
                      {item.question}
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className="bg-light">
                    {item.answer}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

// Main Courses component
const Courses = () => {
  return (
    <>
      <HeroBlock {...heroData} />
      <CoursesList courses={categories} />
      <ScheduleBlock schedule={schedule} />
      <ChecklistBlock />
      <FAQBlock />
    </>
  );
};

export default Courses;
  