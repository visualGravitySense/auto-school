import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { useTranslation } from 'react-i18next';

const PaymentsContactForm = () => {
    const { t, i18n } = useTranslation(); 

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
                console.error("Error with sending question:", error);
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
                console.error("Error with Invoice creation:", error);
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

            <h2>{t(formType === "enroll" ? "footer.register" : "footer.question")}</h2>


            {/* Выбор типа формы */}
            <div>
                <button onClick={() => setFormType("enroll")}>{t('footer.registerButton')}</button>
                <button onClick={() => setFormType("question")}>{t('footer.questionButton')}</button>
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder={t('footer.name')}
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

                {formType === "enroll" ? (
                <>
                    <label>{t('footer.amount')}</label>
                    <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min="140"
                    required
                    />
                    <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? t('footer.processing') : t('footer.payment')}
                    </button>
                </>
                ) : (
                    <>
                        <textarea
                        placeholder={t('footer.message')}
                        
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        />
                        <button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? t('footer.sendButton') : t('footer.askButton')}
                        </button>
                        
            </>
        )}
        
            </form>

            {/* Если есть invoice → показываем его */}
            {invoice && (
                <div className="invoice">
                    <h3>{t('footer.invoice')}</h3>
                    <p><strong>{t('footer.status')}:</strong> {invoice.name}</p>
                    <p><strong>ID:</strong> {invoice.id}</p>
                    <p><strong>{t('footer.price')}:</strong> ${invoice.amount}</p>
                    <p><strong>{t('footer.date')}:</strong> {invoice.issuedAt?.toDate().toLocaleString()}</p>
                </div>
            )}
        </div>
    );
};


export default PaymentsContactForm;