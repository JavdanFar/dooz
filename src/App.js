import "./App.css";
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleCLick(i) {
    const nextSquare = squares.slice();

    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    nextSquare[i] = xIsNext ? "X" : "O";

    setSquares(nextSquare);
    setXIsNext(!xIsNext);
  }

function isEmpty(squares) {
  return squares.some((square, index) => {
    if (square === null) {
      console.log(`${square} at index ${index} is null`);
      return true;
    }
    return false;
  });
}

  const winner = calculateWinner(squares);
  let status;
  if (winner !== null) {
    status = `Winner is: ${winner}`;
  } else if (isEmpty(squares)) {
    status = "Next player is: " + (xIsNext ? "X" : "O");
  } else {
    status = "Nobody Win!!!";
  }

  return (
    <>
      <div className='container'>
        <div>{status}</div>
        <div className='board-row'>
          <Square value={squares[0]} onSquareClick={() => handleCLick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleCLick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleCLick(2)} />
        </div>
        <div className='board-row'>
          <Square value={squares[3]} onSquareClick={() => handleCLick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleCLick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleCLick(5)} />
        </div>
        <div className='board-row'>
          <Square value={squares[6]} onSquareClick={() => handleCLick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleCLick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleCLick(8)} />
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winLines.length; i++) {
    const [a, b, c] = winLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
