import { Table } from "react-bootstrap";
import "./AntiDesignTable.css"

const prices = [
  { course: "Курс теории в классе", info: "Очные занятия с преподавателем", price: "140 €" },
  { course: "Интернет обучение", info: "Доступ к онлайн-материалам", price: "160 €" },
  { course: "Курс вождения (МКПП)", info: "Механическая коробка передач", price: "700 €" },
  { course: "Курс вождения (АКПП)", info: "Автоматическая коробка передач", price: "840 €" },
  { course: "Курсы первой медицинской помощи", info: "Основы оказания первой помощи", price: "40 €" },
  { course: "Курсы тёмного и скользкого вождения", info: "Вождение в сложных условиях", price: "145 €" },
  { course: "Курсы зимнего вождения (для замены прав)", info: "Обязательный курс для продления прав", price: "150 €" },
];

function AntiDesignTable() {
  return (

    <>

    <h2 className="text-2xl font-bold text-center mb-4 mt-4  text-black">Сравнение тарифов</h2>

    <Table className="anti-table">
      <thead>
        <tr>
          <th>Курс</th>
          <th>Доп. информация</th>
          <th>Стоимость</th>
        </tr>
      </thead>
      <tbody>
        {prices.map((item, index) => (
            <tr key={index}>
            <td>{item.course}</td>
            <td>{item.info}</td>
            <td>{item.price}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </>
  );
}

export default AntiDesignTable;
