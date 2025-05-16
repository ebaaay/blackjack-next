"use client"; // Esto asegura que es un Client Component.

import BlackjackChips from '../components/BlackjackChips'; // Importa desde la ruta correcta.
import { useEffect, useState } from 'react';
import StartScreen from '../components/StartScreen';

export default function Home() {
  const [credit, setCredit] = useState<number | null>(null);
   type BetType = "normal" | "blackjack" | "push" | "lose";
  interface BetHistoryEntry { amount: number; type: BetType; }
  const [betHistory, setBetHistory] = useState<BetHistoryEntry[]>([]);
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
           // Si vienen objetos con {won}, los migramos a `type`
      const raw: any[] = JSON.parse(savedHistory);
      const migrated: BetHistoryEntry[] = raw.map(o => ({
      amount: o.amount,
      type: o.type 
        ?? (o.won ? "normal" : "lose")
     }));
     setBetHistory(migrated);
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

   const updateBetHistory = (newHistory: BetHistoryEntry[]) => {
   setBetHistory(newHistory);
   localStorage.setItem('betHistory', JSON.stringify(newHistory));
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
