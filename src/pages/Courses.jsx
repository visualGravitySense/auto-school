import HeroBlock from "../components/HeroBlock"
import CoursesList from "../components/CoursesList"
import ChecklistBlock from "../components/ChecklistBlock"
import FAQBlock from "../components/FAQBlock"
import ScheduleBlock from "../components/ScheduleBlock"

const heroData = {
  title: 'Наши Премиум Услуги',
  description: 'Изучите широкий спектр услуг, которые помогут вашему бизнесу расти и процветать.',
  buttonText: 'Узнать больше',
  buttonLink: '#services',
  imageUrl: '/images/services.jpg',
};

const courses = [
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

const scheduleData = [
  { date: '10 марта 2025', time: '17:00 - 19:00', course: 'Курс теории в классе', instructor: 'Игорь Нагорский' },
  { date: '12 марта 2025', time: '14:00 - 16:00', course: 'Курсы первой медицинской помощи', instructor: 'Мария Смирнова' },
  { date: '15 марта 2025', time: '18:00 - 20:00', course: 'Курсы зимнего вождения , для замены первичных прав на постоянные', instructor: 'Игорь Нагорский' },
];


  
  const Courses = () => {
    return (
      <>

        <HeroBlock {...heroData} />

        <CoursesList courses={courses} />

        <ChecklistBlock />

        <FAQBlock />

        <ScheduleBlock schedule={scheduleData} />

        {/* <div className="container mt-5">
          <h2>Наши курсы</h2>
          <ul className="list-group">
            {courses.map(course => (
              <li key={course.id} className="list-group-item">
                {course.name} - <strong>{course.price}</strong>
              </li>
            ))}
          </ul>
        </div> */}
      </>
    );
  };
  
  export default Courses;
  