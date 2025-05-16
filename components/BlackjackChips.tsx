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
  betHistory: { amount: number; won: boolean }[]; // Recibe betHistory como prop
  updateBetHistory: (newHistory: { amount: number; won: boolean }[]) => void; // Función para actualizar el historial
  round: number; // Recibe el número de ronda
  updateRound: (newRound: number) => void; // Función para actualizar la ronda
}

export default function BlackjackChips({
  initialCredit,
  onRestart,
  betHistory,
  updateBetHistory,
  round,
  updateRound,
}: BlackjackChipsProps) {
  const [totalChips, setTotalChips] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('blackjackChips');
      return saved ? parseInt(saved, 10) : initialCredit;
    }
    return initialCredit;
  });

  const [currentBet, setCurrentBet] = useState<Record<ChipValue, number>>({
    50: 0,
    100: 0,
    200: 0,
    500: 0,
    1000: 0,
    2000: 0,
    5000: 0,
  });
  const [isBetting, setIsBetting] = useState(true);

  const chipValues: ChipValue[] = [50, 100, 200, 500, 1000, 2000, 5000];

  useEffect(() => {
    localStorage.setItem('blackjackChips', totalChips.toString());
  }, [totalChips]);

  const handleChipClick = (value: ChipValue) => {
    if (totalChips >= value) {
      setCurrentBet((prev) => ({ ...prev, [value]: prev[value] + 1 }));
      setTotalChips((prev) => prev - value);
    }
  };

  const handleChipRemove = (value: ChipValue) => {
    if (currentBet[value] > 0) {
      setCurrentBet((prev) => ({ ...prev, [value]: prev[value] - 1 }));
      setTotalChips((prev) => prev + value);
    }
  };

  const handleConfirmBet = () => {
    setIsBetting(false);
  };

  const handleOutcome = (multiplier: number) => {
    const totalBet = Object.entries(currentBet).reduce(
      (sum, [value, count]) => sum + Number(value) * count,
      0
    );
    if (multiplier > 0) {
      setTotalChips((prev) => prev + totalBet * multiplier);
    }
    const newHistory = [{ amount: totalBet, won: multiplier > 0 }, ...betHistory.slice(0, 4)];
    updateBetHistory(newHistory);
    updateRound(round + 1);
    setCurrentBet({
      50: 0,
      100: 0,
      200: 0,
      500: 0,
      1000: 0,
      2000: 0,
      5000: 0,
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
          <p className="text-2xl font-medium">
            Fichas: {new Intl.NumberFormat('de-DE').format(totalChips)} {/* Formato con puntos */}
          </p>
          <p className="text-3xl font-bold">
            Apuesta: {new Intl.NumberFormat('de-DE').format(totalBet)} {/* Formato con puntos */}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {Object.entries(currentBet).map(([value, count]) => {
            if (count > 0) {
              return (
                <Chip
                  key={value}
                  value={Number(value) as ChipValue}
                  onClick={() => handleChipRemove(Number(value) as ChipValue)} // Al hacer clic, se elimina la ficha
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
              {chipValues.map((value) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
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
        <div className="grid grid-cols-2 gap-4 w-full">
          <Button
            onClick={() => handleOutcome(2)}
            className="col-span-2 bg-green-600 hover:bg-green-700 text-white text-lg py-6 transition-all duration-300 transform active:scale-95"
          >
            Gané
          </Button>
          <Button
            onClick={() => handleOutcome(2.5)}
            className="bg-yellow-600 hover:bg-yellow-700 text-white text-base py-5 transition-all duration-300 transform active:scale-95"
          >
            Blackjack 3:2
          </Button>
          <Button
            onClick={() => handleOutcome(1)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-base py-5 transition-all duration-300 transform active:scale-95"
          >
            Empate
          </Button>
          <Button
            onClick={() => handleOutcome(0)}
            className="col-span-2 bg-red-600 hover:bg-red-700 text-white text-base py-4 transition-all duration-300 transform active:scale-95"
          >
            Perdí
          </Button>
        </div>


        )}
        <BetHistory betHistory={betHistory} />
      </CardFooter>
    </Card>
  );
}
