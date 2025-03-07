import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Button, Container, Row, Col, ListGroup } from 'react-bootstrap';

function ContactBlock() {
  return (
    <>
        <div className="grid grid-cols-1  bg-gray-900 text-black p-8 rounded-2xl shadow-lg">
            <Row className="align-items-center">
        {/* Контактные данные */}
                <Col md={6}>
                    <div className="space-y-4 flex flex-col justify-center">
                        <h2 className="text-2xl font-bold border-b-2 border-pink-500 pb-2">Свяжитесь с нами</h2>
                        <p className="flex items-center gap-2 text-lg">
                        <FaPhone className="text-pink-400" /> <a href="tel:+1234567890" className="hover:underline">+123 456 7890</a>
                        </p>
                        <p className="flex items-center gap-2 text-lg">
                        <FaEnvelope className="text-pink-400" /> <a href="mailto:info@example.com" className="hover:underline">info@example.com</a>
                        </p>
                        <p className="flex items-center gap-2 text-lg">
                        <FaMapMarkerAlt className="text-pink-400" /> ул. Примерная, 123, Москва
                        </p>
                    </div>
                </Col>

                {/* Карта */}
                <Col md={6}>
                <div className="h-64 md:h-80">
                    <iframe
                    className="w-full h-full rounded-lg shadow-lg"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.8995246369444!2d37.61842361593097!3d55.75124448055444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x414abbbd4b2e6a33%3A0x8a0d9a2cba2b738c!2z0JzQsNC90LTQsNGC0LXRgiDQmtCw0LvQsNGB0YLRjCDQmtCw0LvQsNGB0YLRjCDQkdC10LzQsNGA0Ysg0LrRgNCw0YHQvNC40Y8g0Lgg0YHRgtGA0L7QstCw0YbQuNGP!5e0!3m2!1sru!2sru!4v1646930202368!5m2!1sru!2sru"
                    allowFullScreen=""
                    loading="lazy"
                    ></iframe>
                </div>

                
                </Col>
        
            </Row>
            
        </div>

    </>
  );
}

export default ContactBlock;
