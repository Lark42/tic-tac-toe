import { Square } from './Square';
import { BoardState } from '../types';

interface BoardProps {
  squares: BoardState;
  onClick: (i: number) => void;
  winningLine: number[] | null;
  animations: {
    cross: any;
    oval: any;
  };
}

export const Board = ({ squares, onClick, winningLine, animations }: BoardProps) => {
  const renderSquare = (i: number) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinning={winningLine ? winningLine.includes(i) : false}
        animations={animations}
      />
    );
  };

  return (
    <div className="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};