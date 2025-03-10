import { Table } from "react-bootstrap";
import "./AntiDesignTable.css"
import { useTranslation } from 'react-i18next';

function AntiDesignTable() {
  const { t, i18n } = useTranslation();

  const prices = [
    { course: "nameTheory", info: "class.infoTheory", price: "140 €" },
    { course: "Интернет обучение", info: "class.infoOnline", price: "160 €" },
    { course: "Курс вождения (МКПП)", info: "class.infoManual", price: "700 €" },
    { course: "Курс вождения (АКПП)", info: "class.infoAutomat", price: "840 €" },
    { course: "Курсы первой медицинской помощи", info: "class.infoMedic", price: "40 €" },
    { course: "Курсы тёмного и скользкого вождения", info: "class.infoWinter", price: "145 €" },
    { course: "Курсы зимнего вождения (для замены прав)", info: "class.infoLast", price: "150 €" },
  ];

  const translatedPrices = prices.map(price => ({
    ...prices,
    name: t(price.name) // Dynamically translate the name
  }));

  return (

    <>

    <h2 className="text-2xl font-bold text-center mb-4 mt-4  text-black">Цены</h2>

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
