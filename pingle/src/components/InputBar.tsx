import { useRef, useState } from "react";

type InputBarProps = {
  checkGuess: (guess: number) => void;
};

const DEFAULT_PLACEHOLDER = "Insere o teu palpite...";
const INVALID_PLACEHOLDER = "Resposta inválida!";

export default function InputBar({ checkGuess }: InputBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [placeholder, setPlaceholder] = useState(DEFAULT_PLACEHOLDER);

  function handleInput() {
    const input = inputRef.current;
    if (!input) return;

    const stripped = input.value.replace(/[^\d.,]/g, "").replace(",", ".");
    const guess = Number(stripped);

    if (!stripped || isNaN(guess)) {
      setPlaceholder(INVALID_PLACEHOLDER);
      input.value = "";
      return;
    }

    setPlaceholder(DEFAULT_PLACEHOLDER);
    checkGuess(guess);
    input.value = "";
  }

  return (
    <div className="input-container">
      <input
        ref={inputRef}
        className="input-field"
        type="text"
        pattern="^\d{1,3}(\.\d+)?€$"
        data-type="currency"
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleInput();
        }}
        onFocus={() => setPlaceholder(DEFAULT_PLACEHOLDER)}
      />
      <button className="input-button" onClick={handleInput}>
        Confirmar
      </button>
    </div>
  );
}
