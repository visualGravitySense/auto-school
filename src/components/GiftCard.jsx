import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";

import { useTranslation } from 'react-i18next';

const GiftCard = () => {
  const { t, i18n } = useTranslation();

  const [amount, setAmount] = useState(500);
  const [isLoading, setIsLoading] = useState(false);
  const [invoice, setInvoice] = useState(null);

  const handlePayment = async () => {
    if (!amount || amount <=0) {
      alert("Enter correct amount");
      return;
    }

    setIsLoading(true);

    try {
      // 1️⃣ create payment in Firestore
      const paymentRef = await addDoc(collection(db, "payments"), {
        amount: parseFloat(amount),
        currency: "EUR",
        status: "paid",
        createdAt: serverTimestamp(),
      });

      // 2️⃣ create invoice data in Firestore
      const invoiceRef = await addDoc(collection(db, "invoices"), {
        paymentId: paymentRef.id,
        amount: parseFloat(amount),
        currency: "EUR",
        issuedAt: serverTimestamp(),
      });

      // 3️⃣ Receive invoice data and refresh UI
      const invoiceDoc = await getDoc(doc(db, "invoices", invoiceRef.id));
      setInvoice({ id: invoiceDoc.id, ...invoiceDoc.data() });

      // alert("Payment successeful! Account is created.");
      setAmount("500");
    } catch (error) {
      console.error("Error with payment creation:", error);
      alert("Error with payment processing")
    }

    setIsLoading(false);
    // setAmount("500");
  };

  return (
    <div className="text-black p-6 rounded-lg w-full max-w-lg mx-auto border-2 border-white">
      <h2 className="text-2xl font-bold text-center">{t('bestGift')}</h2>
      <p className="text-center mt-2">{t('forFriends')}</p>

      <div className="mt-6 text-center">
        <h3 className="text-lg">{t('chooseAmount')}</h3>
        <input 
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="text-center mt-2 p-2 rounded border-2 border-white w-32 bg-gray-100"
        />
      </div>

      <p className="text-center text-sm mt-2">{t('gift.enterDetails')}</p>

      <button 
        className="btn btn-primary"
        onClick={handlePayment}
        disabled={isLoading}>
          {isLoading ? t('gift.createPayment') : t('gift.buyGiftCard')}
      </button>

      <div className="mt-6 text-center">
        <h3 className="text-lg">{t('gift.certificatePreview')}</h3>
        <div className="text-black p-4 rounded mt-2">{t('gift.certificatePreviewDescription')}</div>

        {invoice && (
          <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
            <h3>{t('gift.invoice')} #{invoice.id}</h3>
            <p>{t('gift.amount')}: {invoice.amount} {invoice.currency}</p>
            <p>{t('gift.date')}: {new Date(invoice.issuedAt.toDate()).toLocaleString()}</p>
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <h3 className="text-lg">{t('gift.studentReviews')}</h3>
        <div className="flex justify-center gap-4 mt-2">
          <div className="w-12 h-12 bg-white rounded-full"></div>
          <div className="w-12 h-12 bg-white rounded-full"></div>
          <div className="w-12 h-12 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default GiftCard;
