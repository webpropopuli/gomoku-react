import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import Board from "./components/Board";

const Game = () => {
  const [gameOver, setGameOver] = useState(false);

  //TBD loadRuleset()
  const isWon = gameOver;
  const txt = isWon ? "Game over" : "..playing..";
  return (
    <div className="game">
      <div className="game-board">
        <Board
          ruleset={{
            game: "tictactoe",
            rowSize: 3,
            checkIfGameWon: checkIfGameWon,
            setGameOver: setGameOver
          }}
        />
        <div className="game-info">{txt}</div>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

/* If game is won, return name of winner, else 0
Really, should break these out into game modules and each game returns isGameWon(), etc
*/
function checkIfGameWon(squares, ruleset = "tictactoe") {
  //default val temporary
  if (ruleset === "tictactoe") {
    // This is tictactoe logic only. Great for TTT, sucks for Go-moku.
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
      [20, 21, 22]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
  } else {
    console.log("Unknown ruleset");
  }
  // other game modes follow here...else if....
  return null;
}
