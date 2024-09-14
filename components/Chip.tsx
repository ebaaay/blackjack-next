import { motion } from "framer-motion";

type ChipValue = 50 | 100 | 200 | 500 | 1000 | 2000 | 5000;

const chipColors: Record<ChipValue, { bg: string; border: string; text: string }> = {
  50: { bg: "bg-red-600", border: "border-red-300", text: "text-red-100" },
  100: { bg: "bg-blue-600", border: "border-blue-300", text: "text-blue-100" },
  200: { bg: "bg-green-700", border: "border-green-400", text: "text-green-100" },
  500: { bg: "bg-orange-600", border: "border-orange-300", text: "text-orange-100" },
  1000: { bg: "bg-purple-600", border: "border-purple-300", text: "text-purple-100" },
  2000: { bg: "bg-pink-600", border: "border-pink-300", text: "text-pink-100" },
  5000: { bg: "bg-gray-700", border: "border-gray-400", text: "text-gray-100" },
};

export function Chip({ value, onClick, count = 0 }: { value: ChipValue; onClick: () => void; count?: number }) {
  const { bg, border, text } = chipColors[value];
  return (
    <motion.button
      className={`w-20 h-20 rounded-full ${bg} ${text} font-bold shadow-lg flex items-center justify-center border-4 ${border} relative`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
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
