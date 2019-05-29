import React from "react";
//import ReactDOM from "react-dom";
//import "./index.css";

/* @component: Square
 *  Value and handler passed in as props from <Board>
 */
const Square = props => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Square;
