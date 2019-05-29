import React, { useState } from "react";
import Square from "./Square";

const Board = props => {
  const rowSize = props.ruleset.rowSize;
  const checkIfGameWon = props.ruleset.checkIfGameWon;
  const setGameOver = props.ruleset.setGameOver;

  const [squares, setSquares] = useState(Array(rowSize * rowSize).fill(null));

  const Players = ["X", "O"];
  const [currentPlayer, togglePlayer] = useState(0);

  //############
  const handleClick = i => {
    //console.log(`clicked sqr${i}`);
    if (squares[i]) return; //occupied square (squares already filled are ignored)

    squares[i] = Players[currentPlayer];

    // Update Board
    setSquares(squares);

    if (checkIfGameWon(squares)) {
      setGameOver(true);
      return;
    }

    togglePlayer(currentPlayer === 1 ? 0 : 1);
  };

  //# Build initial board rowSize x rowSize. Squares numbered from 0 -> (rowSize^^2)-1
  //#    We create each row[] of squares and push to rows[]
  const DrawBoard = () => {
    console.log("BuildBoard()...");
    const _renderSquare = i => {
      return <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />;
    }; //# Returns the JSX for the <Square>

    const rows = [];
    for (let y = 0; y < rowSize; y++) {
      let row = [];
      for (let x = 0; x < rowSize; x++) {
        row.push(_renderSquare(x + y * rowSize));
      }
      rows.push(row);
    }
    return rows;
  };

  let winner = checkIfGameWon(squares);

  let status = "";
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = `To play...: ${Players[currentPlayer]}`;
  }

  const rows = DrawBoard(rowSize);

  let x = 0;
  return (
    <div>
      <div className="status">{status}</div>
      {rows.map(r => (
        <div key={r + x++} className="board-row">
          {r}
        </div>
      ))}
    </div>
  );
};

export default Board;
