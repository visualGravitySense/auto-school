import HeroBlock from "../components/HeroBlock"
import HistoryBlock from "../components/HistoryBlock"
import CarParkBlock from "../components/CarParkBlock"
import InstructorsBlock from "../components/InstructorsBlock"
import PhotoGallery from "../components/PhotoGallery"

// const heroData = {
//     title: 'Научитесь водить уверенно и безопасно с нами',
//     description: 'Профессиональные инструкторы и современный подход для водителей любого уровня',
//     buttonText: 'Записаться на курс по вождению',
//     buttonLink: '#services',
//     imageUrl: '/images/services.jpg',
//   };

const historyData = {
    title: '18 лет на пути к вашей уверенности за рулём',
    description: '4500 выпускников. Профессионализм. Результат. Автошкола Viktorija — ваш надёжный старт к безопасному и уверенному вождению. Категории A и B, опытные инструкторы и современные автомобили. Учимся качественно — сдаём уверенно!',
    imageUrl: '/images/driving-school-history.jpg',
};

const carData = [
    {
      model: 'Toyota Corolla',
      year: 2022,
      engine: '1.8 л, 140 л.с.',
      transmission: 'Автомат',
      fuel: 'Бензин',
      imageUrl: '/images/toyota-corolla.jpg',
    },
    {
      model: 'Volkswagen Golf',
      year: 2021,
      engine: '1.6 л, 110 л.с.',
      transmission: 'Механика',
      fuel: 'Дизель',
      imageUrl: '/images/vw-golf.jpg',
    },
    {
      model: 'Hyundai Solaris',
      year: 2023,
      engine: '1.6 л, 123 л.с.',
      transmission: 'Автомат',
      fuel: 'Бензин',
      imageUrl: '/images/hyundai-solaris.jpg',
    },
  ];
  
  const instructorsData = [
    {
      name: 'Иван Петров',
      experience: 10,
      reviews: 4.8,
      imageUrl: '/images/instructor-ivan.jpg',
    },
    {
      name: 'Мария Сидорова',
      experience: 8,
      reviews: 4.9,
      imageUrl: '/images/instructor-maria.jpg',
    },
    {
      name: 'Александр Кузнецов',
      experience: 12,
      reviews: 5.0,
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
  


const About = () => {
  return (
    <>

    <HeroBlock {...heroData} />

    <HistoryBlock {...historyData} />

    <InstructorsBlock instructors={instructorsData} />

    <CarParkBlock cars={carData} />

    <PhotoGallery images={galleryImages} /> 
    
    </>
  );
};

export default About;