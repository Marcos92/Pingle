import React from "react";

export default function InputBar() {
  return (
    <div className="input-container">
      <input
        className="input-field"
        type="text"
        pattern="^\$\d{1,3}*(\.\d+)?€"
        data-type="currency"
        placeholder="Insira o seu palpite..."
      />
      <button className="input-button">Submeter</button>
    </div>
  );
}
