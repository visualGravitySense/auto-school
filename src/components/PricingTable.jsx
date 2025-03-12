import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./AntiDesignTable.css";

function AntiDesignTable() {
  const { t } = useTranslation();

  // Получаем переведённый массив курсов
  const prices = t("coursesPrice.list", { returnObjects: true });

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4 mt-4 text-black">
        {t("coursesPrice.title")}
      </h2>

      <Table className="anti-table">
        <thead>
          <tr>
            <th>{t("coursesPrice.columns.course")}</th>
            <th>{t("coursesPrice.columns.info")}</th>
            <th>{t("coursesPrice.columns.price")}</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
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
