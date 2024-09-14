import { motion } from "framer-motion";

type ChipValue = 50 | 100 | 200 | 500 | 1000 | 2000 | 5000;

// Centraliza los colores y estilos aquí en Chip.tsx
const chipColors: Record<ChipValue, { bg: string; border: string; text: string }> = {
  50: { bg: "bg-green-600", border: "border-green-300", text: "text-white" },
  100: { bg: "bg-red-600", border: "border-red-300", text: "text-white" },
  200: { bg: "bg-blue-600", border: "border-blue-300", text: "text-white" },
  500: { bg: "bg-orange-600", border: "border-orange-300", text: "text-white" },
  1000: { bg: "bg-purple-600", border: "border-purple-300", text: "text-white" },
  2000: { bg: "bg-pink-600", border: "border-pink-300", text: "text-white" },
  5000: { bg: "bg-gray-700", border: "border-gray-400", text: "text-white" }
};

export function Chip({ value, onClick, count = 0, className }: { value: ChipValue; onClick: () => void; count?: number; className?: string }) {
  const { bg, border, text } = chipColors[value];
  return (
    <motion.button
      className={`w-20 h-20 rounded-full ${bg} ${text} font-bold shadow-lg flex items-center justify-center border-4 ${border} relative ${className || ''}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.75 }}
    >
      <div className="absolute inset-2 border-2 border-dashed border-opacity-50 rounded-full"></div>
      <span className="text-xl">{value}</span>
      {count > 0 && (
        <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          x{count}
        </div>
      )}
    </motion.button>
  );
}




