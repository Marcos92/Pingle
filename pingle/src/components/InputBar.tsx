import { useRef, useState } from "react";

type InputBarProps = {
  checkGuess: (guess: number) => void;
};

export default function InputBar({ checkGuess }: InputBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [warningTimeout, setWarningTimeout] = useState<number | null>(null);

  function displayWarning() {
    if (warningTimeout) {
      clearTimeout(warningTimeout);
    }

    const warningElem = document.getElementById("warning-toast");
    if (!warningElem) return;

    warningElem.classList.remove("hide");
    warningElem.classList.add("animate__flipInX");

    const timeout = setTimeout(() => {
      if (!warningElem) return;
      warningElem.classList.remove("animate__flipInX");
      warningElem.classList.add("animate__flipOutX");
      setTimeout(() => {
        if (!warningElem) return;
        warningElem.classList.remove("animate__flipOutX");
        warningElem.classList.add("hide");
      }, 1000);
    }, 2000);

    setWarningTimeout(timeout);
  }

  function handleInput() {
    const input = inputRef.current;
    if (!input) return;
    const strippedString = input.value.replace(/[^\d.]/g, "");
    if (!strippedString) {
      displayWarning();
      return;
    }
    const guess = Number(strippedString);
    if (isNaN(guess)) {
      displayWarning();
      return;
    }
    checkGuess(guess);
    input.value = "";
  }

  return (
    <>
      <div className="input-container">
        <input
          ref={inputRef}
          className="input-field"
          type="text"
          pattern="^\d{1,3}(\.\d+)?€$"
          data-type="currency"
          placeholder="Insira o seu palpite..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleInput();
          }}
        />
        <button className="input-button" onClick={handleInput}>
          Submeter
        </button>
      </div>
    </>
  );
}
