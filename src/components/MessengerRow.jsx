// src/components/MessengerRow.jsx
import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'; // Импортируем иконки

const MessengerRow = () => {
  return (
    <section className="py-4 bg-dark text-center">
      <Row>
        <Col>
          <h3>Отвечаем в мессенджерах</h3>
          <div>
            {/* Кнопка для Telegram */}
            <Button
              variant="outline-primary"
              href="https://t.me/your_telegram_handle"
              target="_blank"
              className="mx-2"
            >
              <FaTelegramPlane style={{ marginRight: '8px', width: '24px', height: '24px' }} />
              Telegram
            </Button>

             {/* Кнопка для WhatsApp */}
             <Button
                variant="outline-success"
                href="https://wa.me/your_phone_number"
                target="_blank"
                className="mx-2"
                >
                <FaWhatsapp style={{ marginRight: '8px', width: '24px', height: '24px' }} />
                WhatsApp
            </Button>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default MessengerRow;
