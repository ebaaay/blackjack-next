type BetHistoryProps = {
    betHistory: { amount: number; won: boolean }[];
  };
  
  export const BetHistory = ({ betHistory }: BetHistoryProps) => {
    return (
      <div className="w-full bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Historial de Apuestas</h3>
        <ul className="space-y-1">
          {betHistory.map((bet, index) => (
            <li key={index} className={`text-sm ${bet.won ? 'text-green-400' : 'text-red-400'}`}>
              {bet.amount} - {bet.won ? 'Ganada' : 'Perdida'}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  