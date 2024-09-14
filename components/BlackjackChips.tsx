"use client";

import { useState, useEffect } from 'react';
import { Button } from './Button';
import { Card, CardContent, CardFooter } from './Card';
import { Chip } from './Chip';
import { BetHistory } from './BetHistory';
import { motion, AnimatePresence } from 'framer-motion';

type ChipValue = 50 | 100 | 200 | 500 | 1000 | 2000 | 5000;

interface BlackjackChipsProps {
  initialCredit: number;
  onRestart: () => void;
}

export default function BlackjackChips({ initialCredit, onRestart }: BlackjackChipsProps) {
  const [totalChips, setTotalChips] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('blackjackChips');
      return saved ? parseInt(saved, 10) : initialCredit;
    }
    return initialCredit;
  });

  const [currentBet, setCurrentBet] = useState<Record<ChipValue, number>>({
    50: 0, 100: 0, 200: 0, 500: 0, 1000: 0, 2000: 0, 5000: 0,
  });
  const [isBetting, setIsBetting] = useState(true);
  const [betHistory, setBetHistory] = useState<{ amount: number; won: boolean }[]>([]);
  const [round, setRound] = useState(1); // Añadimos contador de rondas

  const chipValues: ChipValue[] = [50, 100, 200, 500, 1000, 2000, 5000];

  useEffect(() => {
    localStorage.setItem('blackjackChips', totalChips.toString());
  }, [totalChips]);

  const handleChipClick = (value: ChipValue) => {
    if (totalChips >= value) {
      setCurrentBet(prev => ({ ...prev, [value]: prev[value] + 1 }));
      setTotalChips(prev => prev - value);
    }
  };

  const handleConfirmBet = () => {
    setIsBetting(false);
  };

  const handleOutcome = (won: boolean) => {
    const totalBet = Object.entries(currentBet).reduce(
      (sum, [value, count]) => sum + Number(value) * count, 
      0
    );
    if (won) {
      setTotalChips(prev => prev + totalBet * 2);
    }
    setBetHistory(prev => [{ amount: totalBet, won }, ...prev.slice(0, 4)]);
    setRound(prev => prev + 1); // Incrementamos la ronda
    setCurrentBet({
      50: 0, 100: 0, 200: 0, 500: 0, 1000: 0, 2000: 0, 5000: 0,
    });
    setIsBetting(true);
  };

  const totalBet = Object.entries(currentBet).reduce(
    (sum, [value, count]) => sum + Number(value) * count,
    0
  );

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-900 text-gray-100 shadow-xl border-0 relative">
      {/* Botón de la X arriba a la izquierda */}
      <button 
        onClick={onRestart} 
        className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center"
      >
        &times;
      </button>

      {/* Contador de rondas */}
      <div className="absolute top-3 right-3 bg-blue-600 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
        {round}
      </div>

      <CardContent className="space-y-6 pt-6">
        <div className="text-center space-y-2">
          <p className="text-2xl font-medium">Fichas: {totalChips}</p>
          <p className="text-3xl font-bold">Apuesta: {totalBet}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {Object.entries(currentBet).map(([value, count]) => {
            if (count > 0) {
              return (
                <Chip 
                  key={value} 
                  value={Number(value) as ChipValue} 
                  onClick={() => {}} 
                  count={count}
                />
              );
            }
            return null;
          })}
        </div>
        {isBetting && (
          <motion.div className="flex flex-wrap justify-center gap-2">
            <AnimatePresence>
              {chipValues.map(value => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }} // Transición al aparecer o desaparecer
                >
                  <Chip value={value} onClick={() => handleChipClick(value)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-center pt-6 space-y-4">
        {isBetting ? (
          <Button 
            onClick={handleConfirmBet} 
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white text-lg py-6 transition-all duration-300 transform active:scale-95" 
            disabled={totalBet === 0}
          >
            Confirmar Apuesta
          </Button>
        ) : (
          <div className="flex w-full gap-4">
            <Button onClick={() => handleOutcome(true)} className="flex-1 bg-green-600 hover:bg-green-700 text-white text-lg py-6 transition-all duration-300 transform active:scale-95">
              Gané
            </Button>
            <Button onClick={() => handleOutcome(false)} className="flex-1 bg-red-600 hover:bg-red-700 text-white text-lg py-6 transition-all duration-300 transform active:scale-95">
              Perdí
            </Button>
          </div>
        )}
        <BetHistory betHistory={betHistory} />
      </CardFooter>
    </Card>
  );
}
