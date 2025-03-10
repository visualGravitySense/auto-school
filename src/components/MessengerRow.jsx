// src/components/MessengerRow.jsx
import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

import { FaTelegramPlane, FaWhatsapp, FaFacebookMessenger } from 'react-icons/fa'; // Импортируем иконки
import { useTranslation } from 'react-i18next';

const MessengerRow = () => {

  const { t, i18n } = useTranslation(); 
  
  return (
    <section className="py-4 bg-dark text-center">
      <Row>
        <Col>
          <h3>{t('footer.messengers')}</h3>
          <div>

             {/* Кнопка для Facebook */}
             <Button
                variant="outline-primary"
                href="https://m.me/viktorija.autokool"
                target="_blank"
                className="mx-2"
                style={{ borderColor: "#ffffff", color: "#ffffff" }}
              >
                <FaFacebookMessenger style={{ marginRight: '8px', width: '24px', height: '24px' }} />
                Messenger
              </Button>

             {/* Кнопка для WhatsApp */}
             <Button
                variant="outline-success"
                href="https://wa.me/37253464508"
                target="_blank"
                className="mx-2"
                >
                <FaWhatsapp style={{ marginRight: '8px', width: '24px', height: '24px' }} />
                WhatsApp
            </Button>

            {/* Кнопка для Telegram */}
            <Button
              variant="outline-primary"
              href="https://t.me/+37258976398"
              target="_blank"
              className="mx-2"
            >
              <FaTelegramPlane style={{ marginRight: '8px', width: '24px', height: '24px' }} />
              Telegram
            </Button>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default MessengerRow;
