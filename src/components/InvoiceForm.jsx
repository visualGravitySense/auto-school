import React, { useState } from 'react';
import { db } from '../firebase'; // Инициализируйте Firebase

const InvoiceForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Генерация уникального ID счета
    const invoiceId = `INV-${Date.now()}`;

    // Создание документа с данными в Firebase
    await db.collection('invoices').doc(invoiceId).set({
      name,
      email,
      amount,
      status: 'pending', // Статус "Ожидает оплаты"
      createdAt: new Date(),
    });

    alert('Счет создан! Ожидайте подтверждения оплаты.');

    // Можно также направить пользователя на страницу с данными для оплаты
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Сумма"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Создать счет</button>
    </form>
  );
};

export default InvoiceForm;