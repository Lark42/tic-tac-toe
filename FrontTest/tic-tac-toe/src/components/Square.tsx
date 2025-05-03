import Lottie from 'lottie-react';
import { Player } from '../types';

interface SquareProps {
  value: Player | null;
  onClick: () => void;
  isWinning: boolean;
  animations: {
    cross: any;
    oval: any;
  };
}

export const Square = ({ value, onClick, isWinning, animations }: SquareProps) => {
  return (
    <button
      className={`square ${isWinning ? 'winning' : ''}`}
      onClick={onClick}
      disabled={!!value}
      aria-label={value ? `Cell with ${value}` : 'Empty cell'}
    >
      {/* Fallback текст */}
      <span className="symbol-fallback">{value}</span>
      
      {/* Анимация для X */}
      {value === 'X' && (
        <div className="symbol-animation">
          <Lottie 
            animationData={animations.cross}
            loop={false}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
      
      {/* Анимация для O */}
      {value === 'O' && (
        <div className="symbol-animation">
          <Lottie 
            animationData={animations.oval}
            loop={false}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
    </button>
  );
};