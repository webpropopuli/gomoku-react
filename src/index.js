import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

/* @component: Square
 */
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Create empty board arry; 'X' moves first; TBD: set ruleset
      squares: Array(this.props.rowSize * this.props.rowSize).fill(null),
      xMovesNext: true,
      ruleset: props.ruleset
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (squares[i] || isGameWon(squares)) {
      //occupied square or gameover
      return;
    }
    squares[i] = this.state.xMovesNext ? "X" : "O";
    this.setState({
      squares: squares,
      xMovesNext: !this.state.xMovesNext
    });
  }

  renderSquare(i) {
    return <Square key={i} value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }

  /**
    Build a board of rowSize x rowSize. squares are numbered from 0 -> (rowSize^^2)-1
    We create each row[] and push to rows[]
  */
  BuildBoard(rowSize) {
    const rows = [];
    for (let y = 0; y < rowSize; y++) {
      let row = [];
      for (let x = 0; x < rowSize; x++) {
        row.push(this.renderSquare(x + y * rowSize));
      }
      rows.push(row);
    }
    return rows;
  }

  render() {
    let winner = isGameWon(this.state.squares, this.state.ruleset);
    //if (winner) this.setState({ gameOver: 1 });

    let status = "";
    if (winner) {
      status = "Winner: " + winner;
      // this.setState({ gameOver: 1 });  //causes loop
    } else {
      status = "Next player: " + (this.state.xMovesNext ? "X" : "O");
    }
    // Draw the rowSize x rowSize board
    const rows = this.BuildBoard(this.props.rowSize);

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
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameOver: 0,
      gameType: "tictactoe"
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board ruleset={this.state.gameType} key="board" rowSize={3} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

/* If game is won, return name of winner, else 0
Really, should break these out into game modules and each game returns isGameWon(), etc
*/
function isGameWon(squares, ruleset = "tictactoe") {
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
