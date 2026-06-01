'use client';

import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  ShieldCheck,
  Check,
  X,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../../../components/Providers";

export default function CompanyPage() {
  const { user, login, upgradeRole } = useAuth();
  const [emailInput, setEmailInput] = useState(user?.email || "");

  const handleLogin = async () => {
    if (!emailInput) return alert("Введіть email!");
    await login(emailInput);
  };

  const handleDonate = async () => {
    if (!user?.email) {
      alert("Спочатку увійдіть!");
      return;
    }
    if (confirm("Підтвердити оплату 200₴?")) {
      await upgradeRole(user.email, "user_premium");
      alert("Дякуємо! Premium активовано.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-2 hover:underline"
          >
            <ArrowLeft size={20} /> На головну
          </Link>
          <div className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-gray-600 dark:text-gray-300">
            {user ? `${user.email} (${user.role})` : "Гість"}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 space-y-16">
        
        {/* 1. БЛОК ВХОДУ (Якщо не увійшов) */}
        {!user && (
          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Увійдіть у систему
            </h2>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Ваш email (напр. admin@test.com)"
                className="flex-1 p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <button
                onClick={handleLogin}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition"
              >
                Вхід
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Тестові акаунти: guest@test.com, premium@test.com
            </p>
          </div>
        )}

        {/* 2. ПРО ПРОЕКТ */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Process Calculators
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Це інженерний інструмент, створений для спрощення складних
              розрахунків технологічного обладнання. Ми робимо термодинаміку та
              гідравліку доступними та зрозумілими.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              🎓 <strong>Місія:</strong> Надати студентам та інженерам точний
              калькулятор для розрахунку кожухотрубних теплообмінників, насосів
              та колон.
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl border border-blue-100 dark:border-blue-800 text-center">
            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              100%
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Відповідність ГОСТ та стандартам
            </p>
          </div>
        </section>

        {/* 3. ТАРИФИ */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Оберіть рівень доступу
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Basic */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Basic</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">0 ₴</p>
              <ul className="space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-400 flex-1">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" /> Теплове
                  навантаження (Q)
                </li>
                <li className="flex items-center gap-2">
                  <X size={16} className="text-gray-400" /> Кількість труб (n)
                </li>
                <li className="flex items-center gap-2">
                  <X size={16} className="text-gray-400" /> Діаметр апарата
                </li>
              </ul>
              <button
                disabled
                className="w-full py-2 border border-gray-300 rounded-lg font-bold text-gray-500 opacity-50 cursor-not-allowed"
              >
                Безкоштовно
              </button>
            </div>

            {/* Premium */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border-2 border-blue-500 relative shadow-xl transform md:-translate-y-4 flex flex-col">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                POPULAR
              </div>
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">200 ₴</p>
              <ul className="space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-400 flex-1">
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" /> Все з Basic
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" /> Кількість труб
                  (n)
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" /> Діаметр апарата
                </li>
                <li className="flex items-center gap-2">
                  <Check size={16} className="text-green-500" /> Гідравлічний
                  опір
                </li>
              </ul>
              <button
                onClick={handleDonate}
                disabled={!user}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold disabled:opacity-50"
              >
                <CreditCard size={18} className="inline mr-2" />
                Підтримати проект
              </button>
              {!user && (
                <p className="text-xs text-red-500 text-center mt-2">
                  Увійдіть, щоб купити
                </p>
              )}
            </div>

            {/* Admin */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 opacity-75">
              <h3 className="text-xl font-bold mb-2">Admin</h3>
              <p className="text-3xl font-bold text-purple-600 mb-4">---</p>
              <p className="text-sm text-gray-500 mb-6">
                Тільки для розробників
              </p>
              <button
                disabled
                className="w-full py-2 border rounded text-gray-400 cursor-not-allowed"
              >
                Недоступно
              </button>
            </div>
          </div>
        </section>

        {/* 4. КОНТАКТИ ТА РЕКВІЗИТИ */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Контакти */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MapPin className="text-blue-600" /> Контакти
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p className="flex items-center gap-3">
                <Mail size={20} className="text-gray-400" />
                <a
                  href="mailto:support@process-calculators.com"
                  className="hover:text-blue-600 transition"
                >
                  support@process-calculators.com
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Phone size={20} className="text-gray-400" />
                <span>+380 (XX) XXX-XX-XX</span>
              </p>
              <p className="flex items-center gap-3">
                <FaGithub size={20} className="text-gray-400" />
                <a href="#" className="hover:text-blue-600 transition">
                  github.com/your-username
                </a>
              </p>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500">
                <p>Місцезнаходження: м. Київ, Україна 🇺🇦</p>
              </div>
            </div>
          </div>

          {/* Реквізити */}
          <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-2xl border border-blue-100 dark:border-blue-900/30">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
              <CreditCard className="text-blue-600" />
               Реквізити для донатів
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Підтримайте розвиток проекту. Після оплати напишіть на пошту для
              активації Premium.
            </p>

            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">
                  MonoBank (Jar)
                </p>
                <p className="font-mono font-bold text-gray-900 dark:text-white select-all">
                  https://send.monobank.ua/jar/xxxxx
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">
                  IBAN (UAH)
                </p>
                <p className="font-mono font-bold text-gray-900 dark:text-white select-all">
                  UA0000000000000000000000000
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}