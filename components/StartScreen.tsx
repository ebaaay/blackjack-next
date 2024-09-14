import { useState } from 'react';

export default function StartScreen({ onStartGame }: { onStartGame: (credit: number) => void }) {
  const [credit, setCredit] = useState<string>('10000');
  const [customAmount, setCustomAmount] = useState<boolean>(false);

  const predefinedValues = [
    { label: '1.000', value: '1000' },
    { label: '3.000', value: '3000' },
    { label: '5.000', value: '5000' },
    { label: '6.000', value: '6000' },
    { label: '8.000', value: '8000' },
    { label: '10.000', value: '10000' },
  ];

  const handleStart = () => {
    const parsedCredit = parseInt(credit.replace(/\./g, ''), 10);
    if (parsedCredit > 0) {
      onStartGame(parsedCredit);
    }
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'custom') {
      setCustomAmount(true);
      setCredit('');
    } else {
      setCustomAmount(false);
      setCredit(value);
    }
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\./g, '');
    if (/^\d*$/.test(value)) {
      setCredit(new Intl.NumberFormat('de-DE').format(Number(value)));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#111827] text-white p-8 sm:p-6">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-10 text-center">Bienvenido al Blackjack</h1>
      <p className="mb-6 text-xl sm:text-2xl text-center">Selecciona el crédito inicial para comenzar el juego:</p>
      
      <select
        onChange={handleDropdownChange}
        className="w-full max-w-md p-4 text-lg text-white bg-gray-800 border-2 border-[#111827] rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600"
      >
        {predefinedValues.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}

        {/* Separador visual */}
        <option disabled>──────────</option>

        <option value="custom">Custom</option>
      </select>

      {customAmount && (
        <input
          type="text"
          value={credit}
          onChange={handleCustomInputChange}
          className="w-full max-w-md mt-4 p-4 text-lg text-white bg-gray-800 border-2 border-[#111827] rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 placeholder-gray-400"
          placeholder="Ingresa tu propio crédito"
          inputMode="numeric"
        />
      )}

      <button
        onClick={handleStart}
        className="mt-8 w-full max-w-md bg-green-500 hover:bg-green-600 text-white font-bold text-xl py-4 px-6 rounded-lg"
      >
        Iniciar Juego
      </button>
    </div>
  );
}
