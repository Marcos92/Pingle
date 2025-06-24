import { useEffect, useRef, useState } from "react";
import { Guess } from "../types/guess";

export interface GuessEntryProps {
  guess: Guess | undefined;
}

export default function GuessEntry({ guess }: GuessEntryProps) {
  const [displayedGuess, setDisplayedGuess] = useState<Guess | undefined>(
    undefined
  );
  const [fade, setFade] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (guess != null && !hasAnimated.current) {
      hasAnimated.current = true;
      setFade(true);
      const timeout = setTimeout(() => {
        setDisplayedGuess(guess);
        setFade(false);
      }, 250);
      return () => clearTimeout(timeout);
    }
    setDisplayedGuess(guess);
    setFade(false);
  }, [guess]);

  const isEmpty = displayedGuess == null;

  return (
    <div
      className={`guess-entry guess-fade${fade ? " guess-fade-hidden" : ""}`}
      style={{ transition: "opacity 0.25s" }}
    >
      {isEmpty ? (
        <div className="guess-entry-empty"></div>
      ) : (
        <>
          <div className="price">
            {typeof displayedGuess.price === "number"
              ? displayedGuess.price.toFixed(2) + "€"
              : "--"}
          </div>
          <div className={`hint ${displayedGuess.closeness}`}>
            {displayedGuess.direction === 1
              ? "↑"
              : displayedGuess.direction === -1
              ? "↓"
              : "✔"}
          </div>
        </>
      )}
    </div>
  );
}
