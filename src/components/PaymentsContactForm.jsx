import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";

const PaymentsContactForm = () => {

    const [formType, setFormType] = useState("enroll"); // "question" или "enroll"
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [amount, setAmount] = useState(150); // Сумма по умолчанию
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [invoice, setInvoice] = useState(null); // Сохранённый Invoice

    // Отправка данных в Firestore
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (formType === "question") {
            // Если вопрос → сохраняем в "contacts"
            try {
                await addDoc(collection(db, "contacts"), {
                    name, email, message, sreatedAt: serverTimestamp(),
                });
                // alert("Ваш вопрос отправлен!")
            } catch (error) {
                console.error("Ошибка при отправке вопроса:", error);
            }
        } else {
            // Если "Записаться на курс" → создаём invoice и payment
            try {
                const invoiceRef = await addDoc(collection(db, "invoices"), {
                    userId: email, // Можно заменить на ID пользователя
                    name,
                    amount, currency: "EUR", status: "pending",
                    issuedAt: serverTimestamp(),
                });

                await addDoc(collection(db, "payments"), {
                    invoiceId: invoiceRef.id,
                    userId: email,
                    name,
                    amount,
                    status: "processing",
                    createdAt: serverTimestamp(),
                });

                // Получаем и показываем созданный invoice
                const invoiceSnap = await getDoc(doc(db, "invoices", invoiceRef.id));
                if (invoiceSnap.exists()) {
                    setInvoice({ id: invoiceRef.id, ...invoiceSnap.data() });
                }

                // alert(`Оплата на сумму $${amount} успешно зарегистрирована!`);
            } catch (error) {
                console.error("Ошибка при создании Invoice:", error);
            }
            
        }
        
        setIsSubmitting(false);
        setName("");
        setEmail("");
        setMessage("");
        setAmount("500");

    };

    return (

        <div className="contact-form">

            <h2>{formType === "enroll" ? "Записаться на курс" : "Задать вопрос"}</h2>

            {/* Выбор типа формы */}
            <div>
                <button onClick={() => setFormType("enroll")}>Записаться на курс</button>
                <button onClick={() => setFormType("question")}>Задать вопрос</button>
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />

                <input
                    type="email"
                    placeholder="Ваш email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />

                {formType === "enroll" ? (
                <>
                    <label>Выберите сумму:</label>
                    <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min="150"
                    required
                    />
                    <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Обрабатываем оплату..." : "Оплатить и записаться"}
                    </button>
                </>
                ) : (
                    <>
                        <textarea
                        placeholder="Введите ваш вопрос"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        />
                        <button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Отправить" : "Задать вопрос"}
                </button>
            </>
        )}
        
            </form>

            {/* Если есть invoice → показываем его */}
            {invoice && (
                <div className="invoice">
                    <h3>Ваш Invoice</h3>
                    <p><strong>ID:</strong> {invoice.id}</p>
                    <p><strong>Сумма:</strong> ${invoice.amount}</p>
                    <p><strong>Статус:</strong> {invoice.status}</p>
                    <p><strong>Дата:</strong> {invoice.issuedAt?.toDate().toLocaleString()}</p>
                </div>
            )}

        </div>
    );
};


export default PaymentsContactForm;