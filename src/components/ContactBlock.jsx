import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Button, Container, Row, Col, ListGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next'

function ContactBlock() {
    const { t, i18n } = useTranslation();

  return (
    <>
        <div className="grid grid-cols-1  bg-gray-900 text-black p-8 rounded-2xl shadow-lg">
            <Row className="align-items-center">
        {/* Контактные данные */}
                <Col md={6}>
                    <h2 className="text-2xl font-bold border-b-2 border-pink-500 pb-2">{t('contact.title')}</h2>
                    <h3>{t('footer.contact')}</h3>
                    {/* <p>{t('footer.phone')}: <a href="tel:+37253464508">+372 5346 4508</a></p> */}
                    {/* <p>Email: <a href="mailto:viktorijaautokool@hot.ee">viktorijaautokool@hot.ee</a></p> */}
                    {/* <p>{t('footer.address')}: <a href="https://g.co/kgs/reQdX5f"> Jaama 1a - 2 korrus, Nõmme keskus, Tallinn 11615</a></p> */}
                    
                    <div className="space-y-4 flex flex-col justify-center">
                        <p className="flex items-center gap-2 text-lg">
                        <FaPhone className="text-pink-400" /> {t('footer.phone')}: <a href="tel:+37253464508">+372 5346 4508</a>
                        </p>
                        <p className="flex items-center gap-2 text-lg">
                        <FaEnvelope className="text-pink-400" /> Email: <a href="mailto:viktorijaautokool@hot.ee">viktorijaautokool@hot.ee</a>
                        </p>
                        <p className="flex items-center gap-2 text-lg">
                        <FaMapMarkerAlt className="text-pink-400" /> {t('footer.address')}: <a href="https://g.co/kgs/reQdX5f"> Jaama 1a - 2 korrus, Nõmme keskus, Tallinn 11615</a>
                        </p>
                    </div>
                </Col>

                {/* Карта */}
                <Col md={6}>
                    <div className="h-64 md:h-80">
                        <iframe
                        className="w-full h-full rounded-lg shadow-lg"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2031.7299090798822!2d24.682109112560607!3d59.38753397453677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4692951ab191a0bd%3A0x3e87983dd00149b2!2sJaama%20tn%201a%2C%2011615%20Tallinn!5e0!3m2!1set!2see!4v1741783036241!5m2!1set!2see" 
                        allowFullScreen=""
                        loading="lazy"
                        >
                        </iframe>
                    </div>

                
                </Col>
        
            </Row>
            
        </div>

    </>
  );
}

export default ContactBlock;
