import React, { useState } from "react";

const PlayingField = () => {
  const [symbol, setSymbol] = useState("X");
  const [arrField, setArrField] = useState([
    { id: 1, symbol: "" },
    { id: 2, symbol: "" },
    { id: 3, symbol: "" },
    { id: 4, symbol: "" },
    { id: 5, symbol: "" },
    { id: 6, symbol: "" },
    { id: 7, symbol: "" },
    { id: 8, symbol: "" },
    { id: 9, symbol: "" },
  ]);

  const makeMove = (index) => {
    if (symbol === "0") {
      setSymbol("X");
    } else if (symbol === "X") {
      setSymbol("0");
    }

    setArrField([
      ...arrField.map((item) =>
        item.id === index && item.symbol === ""
          ? { ...item, symbol: symbol }
          : item
      ),
    ]);
  };

  return (
    <div className="playingField">
      <div className="playingField_wrap">
        {arrField.map((item) => (
          <div
            key={item.id}
            onClick={() => makeMove(item.id)}
            className="field_row"
          >
            {item.symbol}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayingField;
