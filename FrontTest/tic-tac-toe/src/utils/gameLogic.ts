import { Player, BoardState } from '../types';

export const calculateWinner = (squares: BoardState): {
    winner: Player | null;
    line: number[] | null;
  } => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // горизонтальные
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // вертикальные
    [0, 4, 8], [2, 4, 6], // диагональные
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }

  return { winner: null, line: null };
};