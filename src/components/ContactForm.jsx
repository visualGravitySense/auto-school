import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
  const { t, i18n } = useTranslation(); 

  const courses = [
    { id: "theory_class", name: "courses.theory_class", price: 140 },
    { id: "online_learning", name: "courses.online_learning", price: 160 },
    { id: "driving_manual", name: "courses.driving_manual", price: 700 },
    { id: "driving_auto", name: "courses.driving_auto", price: 840 },
    { id: "first_aid", name: "courses.first_aid", price: 40 },
    { id: "dark_slippery", name: "courses.dark_slippery", price: 145 },
    { id: "winter_driving", name: "courses.winter_driving", price: 150 },
  ];
  
  const translatedCourses = courses.map(course => ({
    ...course,
    name: t(course.name) // Dynamically translate the name
  }));

  const [formType, setFormType] = useState("enroll"); // "question" или "enroll"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [amount, setAmount] = useState("140"); // Вручную редактируемая сумма
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invoice, setInvoice] = useState(null);

  // Обновление суммы при выборе курса
  const handleCourseChange = (course) => {
    setSelectedCourse(course);
    setAmount(course.price); // Подставляем цену курса
  };

  // Отправка данных в Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formType === "question") {
      try {
        await addDoc(collection(db, "contacts"), {
          name,
          email,
          message,
          createdAt: serverTimestamp(),
        });
        // alert("Ваш вопрос отправлен!");
      } catch (error) {
        console.error("Ошибка при отправке вопроса:", error);
      }
    } else {
      if (!selectedCourse) {
        // alert("Выберите курс перед оплатой!");
        setIsSubmitting(false);
        return;
      }

      try {
        const invoiceRef = await addDoc(collection(db, "invoices"), {
          userId: email,
          name,
          course: selectedCourse.name,
          amount: parseFloat(amount), // Сохраняем введенную сумму
          currency: "EUR",
          status: "pending",
          issuedAt: serverTimestamp(),
        });

        await addDoc(collection(db, "payments"), {
          invoiceId: invoiceRef.id,
          name,
          course: selectedCourse.name,
          userId: email,
          amount: parseFloat(amount),
          status: "processing",
          createdAt: serverTimestamp(),
        });

        const invoiceSnap = await getDoc(doc(db, "invoices", invoiceRef.id));
        if (invoiceSnap.exists()) {
          setInvoice({ id: invoiceRef.id, ...invoiceSnap.data() });
        }

        // alert(`Оплата за курс "${selectedCourse.name}" на сумму €${amount} успешно зарегистрирована!`);
      } catch (error) {
        console.error("Ошибка при создании Invoice:", error);
      }
    }

    setIsSubmitting(false);
    setName("");
    setAmount("500");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-form">
      {/* <h2>{formType === "enroll" ? "Записаться на курс" : "Задать вопрос"}</h2> */}
      <h2>{t(formType === "enroll" ? "footer.register" : "footer.question")}</h2>

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
            <h3>{t('popUp.choose')}:</h3>

            {translatedCourses.map((course) => (
              <label key={course.id} style={{ display: "block", marginBottom: "5px" }}>
                <input
                  type="radio"
                  name="course"
                  value={course.id}
                  checked={selectedCourse?.id === course.id}
                  onChange={() => handleCourseChange(course)}
                  required
                />
                {course.name} — €{course.price}
              </label>
            ))}

            <label>
              <h4>{t('popUp.label')} (€):</h4>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                required
              />
            </label>

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
            <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t('footer.sendButton') : t('footer.askButton')}
            </button>
          </>
        )}
      </form>

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

export default ContactForm;
