"use client";

import BlackjackChips from '../components/BlackjackChips';
import { useEffect, useState } from 'react';
import StartScreen from '../components/StartScreen';

export default function Home() {
  const [credit, setCredit] = useState<number | null>(null);

  // Tipos para el historial
  type BetType = "normal" | "blackjack" | "push" | "lose";
  interface BetHistoryEntry { amount: number; type: BetType; }

  // Este intermedio cubre ambas versiones (with won o with type)
  interface LegacyBetEntry {
    amount: number;
    won?: boolean;
    type?: BetType;
  }

  const [betHistory, setBetHistory] = useState<BetHistoryEntry[]>([]);
  const [round, setRound] = useState<number>(1);

  useEffect(() => {
    const savedChips = localStorage.getItem('blackjackChips');
    const savedHistory = localStorage.getItem('betHistory');
    const savedRound = localStorage.getItem('blackjackRound');

    if (savedChips) {
      setCredit(Number(savedChips));
    }

    if (savedHistory) {
      // Parseamos usando LegacyBetEntry, no usamos `any`
      const raw = JSON.parse(savedHistory) as LegacyBetEntry[];
      const migrated: BetHistoryEntry[] = raw.map(({ amount, won, type }) => ({
        amount,
        // si ya tiene type lo usamos, si no inferimos de won
        type: type ?? (won ? "normal" : "lose"),
      }));
      setBetHistory(migrated);
    }

    if (savedRound) {
      setRound(Number(savedRound));
    }
  }, []);

  const handleStartGame = (initialCredit: number) => {
    setCredit(initialCredit);
    localStorage.setItem('blackjackChips', initialCredit.toString());
    localStorage.setItem('blackjackRound', '1');
  };

  const handleRestart = () => {
    localStorage.removeItem('blackjackChips');
    localStorage.removeItem('betHistory');
    localStorage.removeItem('blackjackRound');
    setCredit(null);
    setBetHistory([]);
    setRound(1);
  };

  const updateBetHistory = (newHistory: BetHistoryEntry[]) => {
    setBetHistory(newHistory);
    localStorage.setItem('betHistory', JSON.stringify(newHistory));
  };

  const updateRound = (newRound: number) => {
    setRound(newRound);
    localStorage.setItem('blackjackRound', newRound.toString());
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
          updateRound={updateRound} 
        />
      )}
    </div>
  );
}
