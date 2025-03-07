const TariffComparison = () => {
    return (
      <div className="flex justify-center p-4">
        <div className="overflow-x-auto p-4">
          <h2 className="text-2xl font-bold text-center mb-4 text-black">Сравнение тарифов</h2>
          <table className="min-w-full border border-transparent text-center anti-table">
            <thead>
            <tr className="bg-black text-white">
              <th className="p-3 border border-transparent">&nbsp;</th>
              <th className="p-3 border border-transparent">Базовый</th>
              <th className="p-3 border border-transparent">Оптимальный</th>
              <th className="p-3 border border-transparent">Премиум</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-900 transition-all">
              <td className="p-3 border font-semibold text-white">Кол-во уроков</td>
              <td className="p-3 border text-gray-400">10</td>
              <td className="p-3 border text-gray-400">15</td>
              <td className="p-3 border text-gray-400">20</td>
            </tr>
            <tr className="hover:bg-gray-900 transition-all">
              <td className="p-3 border font-semibold text-white">Онлайн-теория</td>
              <td className="p-3 border text-gray-400">❌</td>
              <td className="p-3 border text-green-500">✅</td>
              <td className="p-3 border text-green-500">✅</td>
            </tr>
            <tr className="hover:bg-gray-900 transition-all">
              <td className="p-3 border font-semibold text-white">Индивидуальный инструктор</td>
              <td className="p-3 border text-gray-400">❌</td>
              <td className="p-3 border text-gray-400">❌</td>
              <td className="p-3 border text-green-500">✅</td>
            </tr>
            <tr className="hover:bg-gray-900 transition-all">
              <td className="p-3 border font-semibold text-white">Экзамен в ГИБДД</td>
              <td className="p-3 border text-green-500">✅</td>
              <td className="p-3 border text-green-500">✅</td>
              <td className="p-3 border text-green-500">✅</td>
            </tr>
            <tr className="bg-black text-white font-bold hover:bg-gray-800 transition-all">
              <td className="p-3 border">Цена</td>
              <td className="p-3 border">250€</td>
              <td className="p-3 border">400€</td>
              <td className="p-3 border">600€</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>

    );
  };
  
  export default TariffComparison;
  