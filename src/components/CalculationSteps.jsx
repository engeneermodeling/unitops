"use client";

import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

export default function CalculationSteps({ results }) {
  return (
    <div className="space-y-6">
      {/* КРОК 1 */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-600">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          1. Визначення температурних умов нагріву
        </h3>

        <div className="space-y-3 text-sm">
          <p className="text-gray-700 dark:text-gray-300">
            Середню різницю температур між парою і рідиною:
          </p>

          <BlockMath math="\Delta t_c = \frac{\Delta t_b - \Delta t_m}{\ln\left(\frac{\Delta t_b}{\Delta t_m}\right)}" />

          <p className="text-gray-700 dark:text-gray-300">
            де Δt<sub>b</sub> = t<sub>p</sub> - t<sub>1</sub> — більша різниця;
            <br />
            Δt<sub>m</sub> = t<sub>p</sub> - t<sub>2</sub> — менша різниця;
            <br />t<sub>p</sub> — температура насиченої пари.
          </p>

          {results && (
            <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded">
              <p className="font-semibold text-gray-900 dark:text-white">
                Δt<sub>c</sub> = {results.delta_t_c} °C
              </p>
            </div>
          )}

          <div className="border-t border-blue-200 dark:border-blue-800 pt-3 mt-3">
            <p className="text-gray-700 dark:text-gray-300">
              Якщо Δt<sub>b</sub>/Δt<sub>m</sub> ≤ 2, то:
            </p>
            <BlockMath math="\Delta t_c = \frac{\Delta t_b + \Delta t_m}{2}" />
          </div>

          <div className="border-t border-blue-200 dark:border-blue-800 pt-3">
            <p className="text-gray-700 dark:text-gray-300">
              Середня температура рідини:
            </p>
            <BlockMath math="t_c = t_p - \Delta t_c" />
            {results && (
              <p className="font-semibold text-gray-900 dark:text-white mt-2">
                t<sub>c</sub> = {results.t_c} °C
              </p>
            )}
          </div>
        </div>
      </div>

      {/* КРОК 2 */}
      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-600">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          2. Теплофізичні властивості рідини
        </h3>

        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          При середній температурі t<sub>c</sub>:
        </p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-2 bg-white dark:bg-gray-800 rounded">
            <p className="text-gray-600 dark:text-gray-400">В'язкість μ:</p>
            <p className="font-semibold">[Па·с]</p>
          </div>
          <div className="p-2 bg-white dark:bg-gray-800 rounded">
            <p className="text-gray-600 dark:text-gray-400">Густина ρ:</p>
            <p className="font-semibold">[кг/м³]</p>
          </div>
          <div className="p-2 bg-white dark:bg-gray-800 rounded">
            <p className="text-gray-600 dark:text-gray-400">Теплоємність c:</p>
            <p className="font-semibold">[кДж/(кг·К)]</p>
          </div>
          <div className="p-2 bg-white dark:bg-gray-800 rounded">
            <p className="text-gray-600 dark:text-gray-400">λ:</p>
            <p className="font-semibold">[Вт/(м·К)]</p>
          </div>
        </div>
      </div>

      {/* КРОК 3 */}
      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-600">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          3. Теплове навантаження
        </h3>

        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          Теплове навантаження:
        </p>

        <BlockMath math="Q = X \cdot G \cdot c \cdot (t_2 - t_1)" />

        <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">
          де X = 1.02...1.05 — коефіцієнт втрат;
          <br />
          G — витрата рідини, [кг/с];
          <br />c — теплоємність, [кДж/(кг·К)].
        </p>

        {results && (
          <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded">
            <p className="font-semibold text-gray-900 dark:text-white">
              Q = {results.Q} кВт
            </p>
          </div>
        )}

        <div className="border-t border-purple-200 dark:border-purple-800 pt-3 mt-3">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            Витрати пари, кг/с:
          </p>
          <BlockMath math="D = \frac{Q}{I - i}" />

          {results && (
            <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded">
              <p className="font-semibold text-gray-900 dark:text-white">
                D = {results.D} кг/год
              </p>
            </div>
          )}
        </div>
      </div>

      {/* КРОК 4 */}
      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-600">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          4. Конструктивні параметри
        </h3>

        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          Внутрішній діаметр труб:
        </p>
        <BlockMath math="d_{in} = 20 \ldots 50 \text{ мм}" />

        <p className="text-sm text-gray-700 dark:text-gray-300 mt-3">
          Висота трубок:
        </p>
        <BlockMath math="H = 1 \ldots 4 \text{ м}" />

        <div className="border-t border-amber-200 dark:border-amber-800 pt-3 mt-3">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            Кількість труб:
          </p>
          <BlockMath math="n = \frac{G}{\rho \cdot W \cdot f_{tube}}" />
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            де f<sub>tube</sub> = πd²/4 — площа перерізу труби.
          </p>

          {results && (
            <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded">
              <p className="font-semibold text-gray-900 dark:text-white">
                n = {results.n} шт
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-amber-200 dark:border-amber-800 pt-3 mt-3">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            Поверхня теплопередачі:
          </p>
          <BlockMath math="F = n \cdot \pi \cdot d_{out} \cdot H" />

          {results && (
            <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded">
              <p className="font-semibold text-gray-900 dark:text-white">
                F = {results.F} м²
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
