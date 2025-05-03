import { calculateWinner } from './gameLogic';
import { Player } from '../types';

export const getComputerMove = (squares: (Player | null)[]): number => {
  // 1. Сначала проверяем, может ли компьютер выиграть следующим ходом
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      const newSquares = [...squares];
      newSquares[i] = 'O';
      if (calculateWinner(newSquares).winner === 'O') {
        return i;
      }
    }
  }

  // 2. Проверяем, может ли игрок выиграть следующим ходом, и блокируем
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      const newSquares = [...squares];
      newSquares[i] = 'X';
      if (calculateWinner(newSquares).winner === 'X') {
        return i;
      }
    }
  }

  // 3. Пытаемся занять центр, если он свободен
  if (!squares[4]) return 4;

  // 4. Пытаемся занять угол, если он свободен
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => !squares[i]);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // 5. Занимаем любую доступную клетку
  const availableMoves = squares
    .map((square, index) => (square === null ? index : -1))
    .filter(index => index !== -1);

  if (availableMoves.length > 0) {
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  return -1; // если нет доступных ходов
};