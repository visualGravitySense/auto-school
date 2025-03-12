import React from "react";
import { useTranslation } from "react-i18next";
import "./AntiDesignTable.css";

const TariffComparison = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center p-4">
      <div className="overflow-x-auto p-4">
        <h2 className="text-2xl font-bold text-center mb-4 text-black">
          {t("tariff.title")}
        </h2>
        <table className="min-w-full border border-transparent text-center anti-table">
          <thead>
            <tr className="bg-black text-white">
              <th className="p-3 border border-transparent">&nbsp;</th>
              <th className="p-3 border border-transparent">{t("tariff.basic")}</th>
              <th className="p-3 border border-transparent">{t("tariff.optimal")}</th>
              <th className="p-3 border border-transparent">{t("tariff.premium")}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-900 transition-all">
              <td className="p-3 border font-semibold text-white">
                {t("tariff.lessons")}
              </td>
              <td className="p-3 border text-gray-400">10</td>
              <td className="p-3 border text-gray-400">15</td>
              <td className="p-3 border text-gray-400">20</td>
            </tr>
            <tr className="hover:bg-gray-900 transition-all">
              <td className="p-3 border font-semibold text-white">
                {t("tariff.onlineTheory")}
              </td>
              <td className="p-3 border text-gray-400">❌</td>
              <td className="p-3 border text-green-500">✅</td>
              <td className="p-3 border text-green-500">✅</td>
            </tr>
            <tr className="hover:bg-gray-900 transition-all">
              <td className="p-3 border font-semibold text-white">
                {t("tariff.individualInstructor")}
              </td>
              <td className="p-3 border text-gray-400">❌</td>
              <td className="p-3 border text-gray-400">❌</td>
              <td className="p-3 border text-green-500">✅</td>
            </tr>
            <tr className="hover:bg-gray-900 transition-all">
              <td className="p-3 border font-semibold text-white">
                {t("tariff.examGibdd")}
              </td>
              <td className="p-3 border text-green-500">✅</td>
              <td className="p-3 border text-green-500">✅</td>
              <td className="p-3 border text-green-500">✅</td>
            </tr>
            <tr className="bg-black text-white font-bold hover:bg-gray-800 transition-all">
              <td className="p-3 border">{t("tariff.price")}</td>
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
