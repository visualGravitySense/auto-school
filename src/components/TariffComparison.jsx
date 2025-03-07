const TariffComparison = () => {
    return (
      <div className="overflow-x-auto p-4">
        <h2 className="text-2xl font-bold text-center mb-4">Сравнение тарифов</h2>
        <table className="min-w-full border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">&nbsp;</th>
              <th className="p-3 border">Базовый</th>
              <th className="p-3 border">Оптимальный</th>
              <th className="p-3 border">Премиум</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border font-semibold">Кол-во уроков</td>
              <td className="p-3 border">10</td>
              <td className="p-3 border">15</td>
              <td className="p-3 border">20</td>
            </tr>
            <tr>
              <td className="p-3 border font-semibold">Онлайн-теория</td>
              <td className="p-3 border">❌</td>
              <td className="p-3 border">✅</td>
              <td className="p-3 border">✅</td>
            </tr>
            <tr>
              <td className="p-3 border font-semibold">Индивидуальный инструктор</td>
              <td className="p-3 border">❌</td>
              <td className="p-3 border">❌</td>
              <td className="p-3 border">✅</td>
            </tr>
            <tr>
              <td className="p-3 border font-semibold">Экзамен в ГИБДД</td>
              <td className="p-3 border">✅</td>
              <td className="p-3 border">✅</td>
              <td className="p-3 border">✅</td>
            </tr>
            <tr className="bg-gray-100 font-bold">
              <td className="p-3 border">Цена</td>
              <td className="p-3 border">250€</td>
              <td className="p-3 border">400€</td>
              <td className="p-3 border">600€</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TariffComparison;
  