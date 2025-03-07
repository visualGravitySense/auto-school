import ContactBlock from "../components/ContactBlock"
import HeroBlock from "../components/HeroBlock"
import { Row, Col } from 'react-bootstrap';
import ImageGrid from "../components/ImageGrid"

const heroData = {
  title: 'Добро пожаловать в нашу автошколу!',
  description: 'Получите права быстро и легко с нашими курсами!',
  buttonText: 'Смотреть курсы',
  buttonLink: '#services',
  imageUrl: '/images/services.jpg',
};

const Contact = () => {
    return (
      <>

        <HeroBlock {...heroData} />

        <ContactBlock />

        <Row className="mb-4">
          
          <Col md={6}>
            <div className="container mt-5">
              <h2>Свяжитесь с нами</h2>
              <form>
                <div className="mb-3">
                  <label className="form-label">Ваше имя</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Ваш email</label>
                  <input type="email" className="form-control" required />
                </div>
                <button type="submit" className="btn btn-success">Отправить</button>
              </form>
            </div>
          </Col>

          <Col md={6}>
            <ImageGrid />
          </Col>

      </Row >
      </>
    );
  };
  
  export default Contact;
  