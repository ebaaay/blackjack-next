import { motion } from "framer-motion";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export const Button = ({ onClick, children, className = "", disabled = false }: ButtonProps) => {
  return (
    <motion.button
      className={`px-6 py-3 rounded-lg font-semibold text-white ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};
