import React, { useState } from 'react';
import './tic.css';

const TikTakToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    checkWinner(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const checkWinner = (board) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (board.every(cell => cell !== null)) {
      setWinner('T');
    }
  };

  const renderCell = (index) => {
    return (
      <div className="cell bg-gray-300 border border-gray-400 w-16 h-16 flex items-center justify-center text-2xl cursor-pointer" onClick={() => handleClick(index)}>
        {board[index]}
      </div>
    );
  };

  const renderBoard = () => {
    return (
      <div className="board grid grid-cols-3 gap-2 w-48">
        {board.map((cell, index) => renderCell(index))}
      </div>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div className="TikTakToe text-center mt-8">
      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>
      {winner ? (
        <div className="mb-4">
          {winner === 'T' ? 'It\'s a tie!' : `Player ${winner} wins!`}
          <button className="ml-4 px-3 py-1 bg-blue-500 text-white rounded" onClick={resetGame}>Play Again</button>
        </div>
      ) : (
        <div className="mb-4">
          <div className="mb-2">Player {currentPlayer}'s turn</div>
          {renderBoard()}
        </div>
      )}
    </div>
  );
};

export default TikTakToe;
