import { useState } from "react";

const GiftCard = () => {
  const [amount, setAmount] = useState(500);

  return (
    <div className="bg-black text-white p-6 rounded-lg w-full max-w-lg mx-auto border-2 border-white">
      <h2 className="text-2xl font-bold text-center">Лучший подарок — знания!</h2>
      <p className="text-center mt-2">Для друзей, родных и коллег</p>

      <div className="mt-6 text-center">
        <h3 className="text-lg">Выбери сумму</h3>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="text-black text-center mt-2 p-2 rounded border-2 border-white w-32 bg-gray-100"
        />
      </div>

      <p className="text-center text-sm mt-2">Выбери сумму → Введи данные → Оплата</p>

      <button className="bg-green-500 text-black font-bold py-2 px-4 rounded mt-4 w-full hover:bg-green-600">
        Купить сертификат
      </button>

      <div className="mt-6 text-center">
        <h3 className="text-lg">Превью сертификата</h3>
        <div className="bg-gray-700 text-white p-4 rounded mt-2">Как он будет выглядеть</div>
      </div>

      <div className="mt-6 text-center">
        <h3 className="text-lg">Отзывы учеников</h3>
        <div className="flex justify-center gap-4 mt-2">
          <div className="w-12 h-12 bg-white rounded-full"></div>
          <div className="w-12 h-12 bg-white rounded-full"></div>
          <div className="w-12 h-12 bg-white rounded-full"></div>
        </div>
        <p className="text-sm mt-1">Short Text Short Text Short Text</p>
      </div>
    </div>
  );
};

export default GiftCard;
