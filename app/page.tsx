"use client"; // Esto asegura que es un Client Component.

import BlackjackChips from '../components/BlackjackChips'; // Importa desde la ruta correcta.
import { useState } from 'react';
import StartScreen from '../components/StartScreen';

export default function Home() {
  const [credit, setCredit] = useState<number | null>(null);

  const handleStartGame = (initialCredit: number) => {
    setCredit(initialCredit);
  };

  const handleRestart = () => {
    localStorage.removeItem('blackjackChips'); // Elimina el valor almacenado
    setCredit(null); // Reinicia la pantalla a StartScreen
  };
  

  return (
    <div className="min-h-screen bg-gray-900">
      {credit === null ? (
        <StartScreen onStartGame={handleStartGame} />
      ) : (
        <BlackjackChips initialCredit={credit} onRestart={handleRestart} />
      )}
    </div>
  );
}
