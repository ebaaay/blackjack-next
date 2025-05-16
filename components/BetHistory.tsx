import { useState } from 'react';

type BetType = "normal" | "blackjack" | "push" | "lose";

interface BetHistoryEntry {
  amount: number;
  type: BetType;
}

type BetHistoryProps = {
  betHistory: BetHistoryEntry[];
};

export const BetHistory = ({ betHistory }: BetHistoryProps) => {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? betHistory : betHistory.slice(0, 5);

  return (
    <div className="w-full bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-2">Historial de Apuestas</h3>
      <ul className="space-y-1">
        {visibleItems.length === 0 ? (
          <li className="text-sm text-gray-400">Sin apuestas recientes.</li>
        ) : (
          visibleItems.map((bet, index) => {
            let labelText: string;
            let textClass: string;
            let bgClass: string;

            switch (bet.type) {
              case 'normal':
                labelText = 'Ganada';
                textClass = 'text-green-400';
                bgClass = 'bg-green-400';
                break;
              case 'blackjack':
                labelText = 'Blackjack';
                textClass = 'text-yellow-400';
                bgClass = 'bg-yellow-400';
                break;
              case 'push':
                labelText = 'Empate';
                textClass = 'text-blue-400';
                bgClass = 'bg-blue-400';
                break;
              case 'lose':
              default:
                labelText = 'Perdida';
                textClass = 'text-red-400';
                bgClass = 'bg-red-400';
                break;
            }

            return (
              <li key={index} className={`flex justify-between items-center text-sm ${textClass}`}>  
                <span>{bet.amount} fichas</span>
                <span className="inline-flex items-center font-semibold">
                  <span className={`inline-block w-1 h-1 rounded-full ${bgClass} mr-2`} />
                  {labelText}
                </span>
              </li>
            );
          })
        )}
      </ul>
      {betHistory.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-2 text-sm text-gray-400 hover:text-gray-500"
        >
          {showAll ? 'Ver menos...' : `Ver más (${betHistory.length - 5} más)...`}
        </button>
      )}
    </div>
  );
};
