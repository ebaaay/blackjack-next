import { useState } from 'react';

export default function StartScreen({ onStartGame }: { onStartGame: (credit: number) => void }) {
  const [credit, setCredit] = useState<string>('10000'); // Valor inicial por defecto de 10000

  const handleStart = () => {
    const parsedCredit = parseInt(credit, 10);
    if (parsedCredit > 0) {
      onStartGame(parsedCredit); // Inicia el juego con el crédito ingresado
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
  
    // Si el campo está vacío, muestra '0' pero no lo mantiene una vez que se escribe algo más
    if (value === '') {
      setCredit('0');
    } else {
      setCredit(value.replace(/^0+/, ''));
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#111827] text-white p-8 sm:p-6">
      <h1 className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-10 text-center">Bienvenido al Blackjack</h1>
      <p className="mb-6 text-xl sm:text-2xl text-center">Ingresa el crédito inicial para comenzar el juego:</p>
      <input
        type="text"
        value={credit}
        onChange={handleInputChange}
        className="w-full max-w-md p-4 text-lg text-white bg-gray-800 border-2 border-[#111827] rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 placeholder-gray-400"
        placeholder="Crédito inicial"
      />
      <button
        onClick={handleStart}
        className="mt-8 w-full max-w-md bg-green-500 hover:bg-green-600 text-white font-bold text-xl py-4 px-6 rounded-lg"
      >
        Iniciar Juego
      </button>
    </div>
  );
}
