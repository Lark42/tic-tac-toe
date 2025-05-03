import { useState, useEffect } from 'react';
import { Board } from './components/Board';
import { Player, BoardState } from './types';
import { calculateWinner } from './utils/gameLogic';
import { getComputerMove } from './utils/ai';
import Lottie from 'lottie-react';
import crossAnimation from './assets/cross.json';
import gameAnimation from './assets/game.json';
import gridAnimation from './assets/grid.json';
import ovalAnimation from './assets/oval.json';
import './App.css';

const App = () => {
  // Анимации
  const animations = {
    cross: crossAnimation,
    game: gameAnimation,
    grid: gridAnimation,
    oval: ovalAnimation
  };

  // Состояние игры
  const [squares, setSquares] = useState<BoardState>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  // Ход компьютера
  useEffect(() => {
    if (!gameStarted) return;

    if (!xIsNext && !winner) {
      const timer = setTimeout(() => {
        const computerMove = getComputerMove(squares);
        if (computerMove !== -1) {
          handleClick(computerMove);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [xIsNext, winner, squares, gameStarted]);

  // Обработка хода
  const handleClick = (i: number) => {
    if (!gameStarted || winner || squares[i]) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);

    const gameStatus = calculateWinner(newSquares);
    if (gameStatus.winner) {
      setWinner(gameStatus.winner);
      setWinningLine(gameStatus.line);
      setShowAnimation(true);
    } else if (!newSquares.includes(null)) {
      setWinner('draw');
      setShowAnimation(true);
    } else {
      setXIsNext(!xIsNext);
    }
  };

  // Сброс игры
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setWinningLine(null);
    setShowAnimation(false);
    setGameStarted(true);
  };

  // Статус игры
  const status = winner
    ? winner === 'draw'
      ? 'Ничья!'
      : `Победитель: ${winner}`
    : `Следующий ход: ${xIsNext ? 'X (Вы)' : 'O (Компьютер)'}`;

  return (
    <div className="game">
      {/* Фоновая анимация */}
      <div className="background-animation">
        <Lottie animationData={animations.grid} loop={true} />
      </div>

      {/* Стартовый экран */}
      {!gameStarted && (
        <div className="start-screen">
          <Lottie animationData={animations.game} loop={true} />
          <button 
            className="start-button"
            onClick={() => setGameStarted(true)}
          >
            Начать игру
          </button>
        </div>
      )}

      {/* Основной интерфейс игры */}
      {gameStarted && (
        <>
          <h1>Крестики-нолики</h1>
          <div className="game-status">{status}</div>
          <div className="game-board">
            <Board
              squares={squares}
              onClick={handleClick}
              winningLine={winningLine}
              animations={animations}
            />
          </div>
          <button className="reset-button" onClick={resetGame}>
            Новая игра
          </button>
        </>
      )}

      {/* Анимация победы */}
      {showAnimation && winner && winner !== 'draw' && (
        <div className="animation-overlay">
          <Lottie 
            animationData={winner === 'X' ? animations.cross : animations.oval}
            loop={false}
          />
        </div>
      )}
    </div>
  );
};

export default App;