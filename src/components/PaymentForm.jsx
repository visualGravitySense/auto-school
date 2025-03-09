import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const PaymentForm = () => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      alert("Enter correct amaount");
      return;
    }

    setIsLoading(true);

    try {
      // Добавляем платеж в Firestore
      const docRef = await addDoc(collection(db, "payments"), {
        amount: parseFloat(amount),
        currency: "EUR",
        status: "pending",
        createdAt: serverTimestamp(),
      });

      alert(`AccOunt created! ID: ${docRef.id}`);
      setAmount("");
    } catch (error) {
      console.error("Error with payment creation:", error);
      alert("Error with payment processing");
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h2>Оплата</h2>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handlePayment} disabled={isLoading}>
        {isLoading ? "Creating account..." : "Make payment"}
      </button>
    </div>
  );
};

export default PaymentForm;
