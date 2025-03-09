import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";

const courses = [
  { id: "theory_class", name: "Курс теории в классе", price: 140 },
  { id: "online_learning", name: "Интернет обучение", price: 160 },
  { id: "driving_manual", name: "Курс вождения (МКПП)", price: 700 },
  { id: "driving_auto", name: "Курс вождения (АКПП)", price: 840 },
  { id: "first_aid", name: "Курсы первой медицинской помощи", price: 40 },
  { id: "dark_slippery", name: "Курсы тёмного и скользкого вождения", price: 145 },
  { id: "winter_driving", name: "Курсы зимнего вождения (для замены прав)", price: 150 },
];

const ContactForm = () => {
  const [formType, setFormType] = useState("enroll"); // "question" или "enroll"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [amount, setAmount] = useState("500"); // Вручную редактируемая сумма
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
      <h2>{formType === "enroll" ? "Записаться на курс" : "Задать вопрос"}</h2>

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
            <h3>Выберите курс:</h3>
            {courses.map((course) => (
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
              <h4>Сумма оплаты (€):</h4>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                required
              />
            </label>

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
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Отправка..." : "Отправить вопрос"}
            </button>
          </>
        )}
      </form>

      {invoice && (
        <div className="invoice">
          <h3>Ваш Invoice</h3>
          <p><strong>ID:</strong> {invoice.id}</p>
          <p><strong>Курс:</strong> {invoice.course}</p>
          <p><strong>Сумма:</strong> €{invoice.amount}</p>
          <p><strong>Статус:</strong> {invoice.status}</p>
          <p><strong>Дата:</strong> {invoice.issuedAt?.toDate().toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
