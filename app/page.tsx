"use client"; // Esto asegura que es un Client Component.

import BlackjackChips from '../components/BlackjackChips'; // Importa desde la ruta correcta.
import { useEffect, useState } from 'react';
import StartScreen from '../components/StartScreen';

export default function Home() {
  const [credit, setCredit] = useState<number | null>(null);
  const [betHistory, setBetHistory] = useState<{ amount: number; type: "normal" | "blackjack" | "push" | "lose" }[]>([]);
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
      // Migrar historial antiguo si es necesario
      const parsed = JSON.parse(savedHistory);
      if (parsed.length > 0 && parsed[0].won !== undefined) {
        // Convertir { amount, won } a { amount, type }
        const migrated = parsed.map((item: { amount: number; won: boolean }) => ({
          amount: item.amount,
          type: item.won ? "normal" : "lose"
        }));
        setBetHistory(migrated);
      } else {
        setBetHistory(parsed); // Ya tiene el formato correcto
      }
    }

    if (savedRound) {
      setRound(Number(savedRound)); // Carga la ronda guardada
    }
  }, []);

  const handleStartGame = (initialCredit: number) => {
    setCredit(initialCredit);
    localStorage.setItem('blackjackChips', initialCredit.toString()); // Guarda el crédito en localStorage
    localStorage.setItem('blackjackRound', '1'); // Inicializa la ronda en 1
  const updateBetHistory = (newHistory: { amount: number; type: "normal" | "blackjack" | "push" | "lose" }[]) => {
    setBetHistory(newHistory);
    localStorage.setItem('betHistory', JSON.stringify(newHistory)); // Guarda el historial en localStorage
  };
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
