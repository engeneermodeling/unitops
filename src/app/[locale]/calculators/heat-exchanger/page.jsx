"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import ThemeToggle from "../../../../components/theme-toggle";
import LanguageSwitcher from "../../../../components/language-switcher";

import CalculationSteps from '../../../../components/CalculationSteps';
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function HeatExchangerCalculator() {
  const t = useTranslations();
  const locale = useLocale();

  // State for input data
  const [formData, setFormData] = useState({
    G: "", // Витрата рідини (т/год)
    t1: "", // Початкова температура (°C)
    t2: "", // Кінцева температура (°C)
    P: "", // Тиск насиченої пари (МПа)
    B: "", // Концентрація розчину (мас.%)
    W: "", // Швидкість руху рідини (м/с)
    material: "steel", // Матеріал трубок
  });

  const [results, setResults] = useState(null);

  // Material properties
  const materials = {
    copper: { name: t("materials.copper"), lambda: 380 },
    brass: { name: t("materials.brass"), lambda: 93 },
    aluminum: { name: t("materials.aluminum"), lambda: 200 },
    steel: { name: t("materials.steel"), lambda: 46 },
    stainless: { name: t("materials.stainless"), lambda: 17.5 },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculate = () => {
    // Вхідні дані
    const G = parseFloat(formData.G); // т/год
    const t1 = parseFloat(formData.t1); // °C
    const t2 = parseFloat(formData.t2); // °C
    const P = parseFloat(formData.P); // МПа
    const W = parseFloat(formData.W); // м/с
    const material = formData.material;

    // Перевірка даних
    if (!G || !t1 || !t2 || !P || !W) {
      alert("Будь ласка, заповніть всі поля!");
      return;
    }

    // КРОК 1: Температурні умови
    // Температура насиченої пари (приблизно за тиском)
    const tp = 100 + P * 180; // Спрощено, для точного - таблиця парів

    // Різниці температур на кінцях
    const delta_t_b = tp - t1; // більша різниця
    const delta_t_m = tp - t2; // менша різниця

    // Середньологарифмічна різниця
    let delta_t_c;
    if (delta_t_b / delta_t_m <= 2) {
      // Можна використовувати середньоарифметичну
      delta_t_c = (delta_t_b + delta_t_m) / 2;
    } else {
      // Середньологарифмічна
      delta_t_c = (delta_t_b - delta_t_m) / Math.log(delta_t_b / delta_t_m);
    }

    // Середня температура рідини
    const t_c = tp - delta_t_c;

    // КРОК 2: Теплофізичні властивості (для води/розчину)
    // Питома теплоємність (приблизно для води)
    const c = 4.18; // кДж/(кг·К)

    // Густина
    const rho = 1000; // кг/м³

    // В'язкість (приблизно)
    const mu = 0.001; // Па·с

    // Теплопровідність
    const lambda_fluid = 0.6; // Вт/(м·К)

    // КРОК 3: Теплове навантаження
    const X = 1.03; // Коефіцієнт втрат (1.02...1.05)
    const G_kg_s = (G * 1000) / 3600; // кг/с

    const Q = X * G_kg_s * c * (t2 - t1); // кВт

    // Витрата пари
    const I = 2676; // Ентальпія насиченої пари, кДж/кг (приблизно)
    const i = 419; // Ентальпія конденсату, кДж/кг
    const D = Q / ((I - i) / 1000); // кг/с

    // КРОК 4: Вибір труб
    const d_outer = 0.038; // Зовнішній діаметр, м (38 мм)
    const d_inner = 0.033; // Внутрішній діаметр, м (33 мм)
    const H = 2.5; // Висота трубок, м (1...4 м)

    // Матеріал трубок
    const materials_lambda = {
      copper: 380,
      brass: 93,
      aluminum: 200,
      steel: 46,
      stainless: 17.5,
    };
    const lambda_tube = materials_lambda[material] || 46; // Вт/(м·К)

    // КРОК 5: Кількість труб
    const f_tube = (Math.PI * d_inner * d_inner) / 4; // Площа перерізу однієї труби
    const n = G_kg_s / rho / (W * f_tube);
    const n_rounded = Math.ceil(n / 19) * 19; // Кратне 19 (стандартне розміщення)

    // КРОК 6: Поверхня теплопередачі
    const F = n_rounded * Math.PI * d_outer * H; // м²

    // КРОК 7: Діаметр апарата (спрощено)
    const D_apparatus =
      Math.sqrt((4 * n_rounded * d_outer * d_outer) / Math.PI) * 1.3;

    // Результати
    setResults({
      delta_t_c: delta_t_c.toFixed(2),
      t_c: t_c.toFixed(1),
      Q: Q.toFixed(2),
      D: (D * 3600).toFixed(1), // т/год
      n: n_rounded,
      F: F.toFixed(2),
      d_inner: `${(d_inner * 1000).toFixed(1)} мм`,
      H: `${H.toFixed(1)} м`,
      D_apparatus: `${(D_apparatus * 1000).toFixed(0)} мм`,
      velocity: W.toFixed(2),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">{t("common.back")}</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t("calculators.heat_exchanger.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("calculators.heat_exchanger.description")}
          </p>
        </div>

        {/* Task Description */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4 mb-8 rounded-lg">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-2">
            {t("calculators.heat_exchanger.task_title")}
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {t("calculators.heat_exchanger.task")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
              {t("calculator.input_data")}
            </h2>

            <div className="space-y-4">
              {/* Витрата рідини */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t("calculator.fields.G.label")}
                </label>
                <input
                  type="number"
                  name="G"
                  value={formData.G}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {t("calculator.fields.G.unit")}
                </p>
              </div>

              {/* Початкова температура */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t("calculator.fields.t1.label")}
                </label>
                <input
                  type="number"
                  name="t1"
                  value={formData.t1}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  °C
                </p>
              </div>

              {/* Кінцева температура */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t("calculator.fields.t2.label")}
                </label>
                <input
                  type="number"
                  name="t2"
                  value={formData.t2}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  °C
                </p>
              </div>

              {/* Тиск пари */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t("calculator.fields.P.label")}
                </label>
                <input
                  type="number"
                  name="P"
                  value={formData.P}
                  onChange={handleInputChange}
                  placeholder="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  МПа
                </p>
              </div>

              {/* Концентрація */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t("calculator.fields.B.label")}
                </label>
                <input
                  type="number"
                  name="B"
                  value={formData.B}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  мас.%
                </p>
              </div>

              {/* Швидкість */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t("calculator.fields.W.label")}
                </label>
                <input
                  type="number"
                  name="W"
                  value={formData.W}
                  onChange={handleInputChange}
                  placeholder="0"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  м/с
                </p>
              </div>

              {/* Матеріал */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t("calculator.fields.material.label")}
                </label>
                <select
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {Object.entries(materials).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors mt-6"
              >
                {t("calculator.calculate")}
              </button>
            </div>
          </div>

          {/* Results */}
         <CalculationSteps results={results} />

        </div>
      </main>
    </div>
  );
}
