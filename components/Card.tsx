import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className = "" }: CardProps) => {
    return (
      <div
        className={`relative bg-gray-900 text-gray-100 rounded-2xl shadow-xl p-6 w-[90%] max-w-md mx-auto ${className}`}
      >
        {/* Stroke/borde externo usando un pseudoelemento */}
        <div className="relative z-10 border border-gray-700 rounded-2xl p-6">
          {children}
        </div>
      </div>
    );
  };
  
  

export const CardContent = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`p-4 border-t border-gray-700 ${className}`}>
      {children}
    </div>
  );
};
