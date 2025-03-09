import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";

const PaymentAndInvoice = () => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [invoice, setInvoice] = useState(null);

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      alert("Введите корректную сумму");
      return;
    }

    setIsLoading(true);

    try {
      // 1️⃣ Создаём платёж в Firestore
      const paymentRef = await addDoc(collection(db, "payments"), {
        amount: parseFloat(amount),
        currency: "USD",
        status: "paid",
        createdAt: serverTimestamp(),
      });

      // 2️⃣ Создаём связанный Invoice в Firestore
      const invoiceRef = await addDoc(collection(db, "invoices"), {
        paymentId: paymentRef.id,
        amount: parseFloat(amount),
        currency: "USD",
        issuedAt: serverTimestamp(),
      });

      // 3️⃣ Получаем данные Invoice и обновляем UI
      const invoiceDoc = await getDoc(doc(db, "invoices", invoiceRef.id));
      setInvoice({ id: invoiceDoc.id, ...invoiceDoc.data() });

      alert("Оплата успешна! Счёт создан.");
      setAmount("");
    } catch (error) {
      console.error("Ошибка при создании платежа:", error);
      alert("Ошибка при обработке платежа");
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h2>Оплата</h2>
      <input
        type="number"
        placeholder="Введите сумму"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handlePayment} disabled={isLoading}>
        {isLoading ? "Создаём платёж..." : "Оплатить"}
      </button>

      {/* Отображение счета после успешной оплаты */}
      {invoice && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h3>Счёт #{invoice.id}</h3>
          <p>Сумма: {invoice.amount} {invoice.currency}</p>
          <p>Дата: {new Date(invoice.issuedAt.toDate()).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentAndInvoice;
