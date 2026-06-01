// app/[locale]/HomePageContent.jsx
'use client';

import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import { Calculator, Settings, BarChart3 } from 'lucide-react';

export default function HomePageContent() {
  // БЕЗПЕЧНЕ ОТРИМАННЯ user (не ламається якщо AuthProvider відсутній)
  const authContext = useAuth();
  const user = authContext?.user;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Process Calculators</h1>
          <nav className="flex gap-4">
            <Link href="/uk/company" className="text-gray-600 hover:text-blue-600">
              Про компанію
            </Link>
            {user ? (
              <span className="text-sm text-gray-500">{user.email}</span>
            ) : (
              <Link href="/uk/company" className="text-sm text-blue-600">
                Вхід
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Інженерні розрахунки онлайн
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Калькулятори теплообмінників, насосів та технологічного обладнання
          </p>
        </div>

        {/* Калькулятори */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link 
            href="/uk/calculators/heat-exchanger" 
            className="p-6 bg-white dark:bg-gray-900 rounded-xl border hover:shadow-lg transition"
          >
            <Calculator className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Теплообмінники</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Розрахунок кожухотрубних теплообмінників
            </p>
          </Link>

          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl border opacity-50">
            <Settings className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Насоси</h3>
            <p className="text-gray-500">Незабаром</p>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl border opacity-50">
            <BarChart3 className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Колони</h3>
            <p className="text-gray-500">Незабаром</p>
          </div>
        </div>
      </main>
    </div>
  );
}