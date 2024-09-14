"use client"; // Esto asegura que es un Client Component.

import BlackjackChips from '../components/BlackjackChips'; // Importa desde la ruta correcta.
import { useEffect, useState } from 'react';
import StartScreen from '../components/StartScreen';

export default function Home() {
  const [credit, setCredit] = useState<number | null>(null);
  const [betHistory, setBetHistory] = useState<{ amount: number; won: boolean }[]>([]);
  const [round, setRound] = useState<number>(1); // Añadimos un estado para la ronda

  useEffect(() => {
    // Cargar crédito, historial y número de ronda desde localStorage
    const savedChips = localStorage.getItem('blackjackChips');
    const savedHistory = localStorage.getItem('betHistory');
    const savedRound = localStorage.getItem('blackjackRound');

    if (savedChips) {
      setCredit(Number(savedChips)); // Carga el crédito guardado
    }

    if (savedHistory) {
      setBetHistory(JSON.parse(savedHistory)); // Carga el historial guardado
    }

    if (savedRound) {
      setRound(Number(savedRound)); // Carga la ronda guardada
    }
  }, []);

  const handleStartGame = (initialCredit: number) => {
    setCredit(initialCredit);
    localStorage.setItem('blackjackChips', initialCredit.toString()); // Guarda el crédito en localStorage
    localStorage.setItem('blackjackRound', '1'); // Inicializa la ronda en 1
  };

  const handleRestart = () => {
    localStorage.removeItem('blackjackChips'); // Elimina el crédito
    localStorage.removeItem('betHistory'); // Elimina el historial
    localStorage.removeItem('blackjackRound'); // Elimina la ronda
    setCredit(null); // Reinicia la pantalla a StartScreen
    setBetHistory([]); // Reinicia el historial
    setRound(1); // Reinicia la ronda
  };

  const updateBetHistory = (newHistory: { amount: number; won: boolean }[]) => {
    setBetHistory(newHistory);
    localStorage.setItem('betHistory', JSON.stringify(newHistory)); // Guarda el historial en localStorage
  };

  const updateRound = (newRound: number) => {
    setRound(newRound);
    localStorage.setItem('blackjackRound', newRound.toString()); // Guarda la ronda en localStorage
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {credit === null ? (
        <StartScreen onStartGame={handleStartGame} />
      ) : (
        <BlackjackChips 
          initialCredit={credit} 
          onRestart={handleRestart} 
          betHistory={betHistory} 
          updateBetHistory={updateBetHistory} 
          round={round} 
          updateRound={updateRound} // Añadimos la ronda al componente
        />
      )}
    </div>
  );
}
