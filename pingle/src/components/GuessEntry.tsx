import { useEffect, useRef, useState } from "react";
import { Guess } from "../types/guess";
import { Checkmark, DownArrow, UpArrow } from "./icons/Icons";

export interface GuessEntryProps {
  guess: Guess | undefined;
}

export default function GuessEntry({ guess }: GuessEntryProps) {
  const [displayedGuess, setDisplayedGuess] = useState<Guess | undefined>(
    undefined
  );
  const [fade, setFade] = useState(false);

  const hasAnimated = useRef(false);
  const isFirstRender = useRef(true);
  const prevGuess = useRef<Guess | undefined>(undefined);

  useEffect(() => {
    // On initial mount: set guess immediately, no animation
    if (isFirstRender.current) {
      setDisplayedGuess(guess);
      setFade(false);
      isFirstRender.current = false;
      prevGuess.current = guess;
      return;
    }

    // After mount, only animate if guess changed AND it's a new defined guess (different from previous)
    const guessChanged =
      guess != null &&
      (prevGuess.current == null || prevGuess.current !== guess);

    if (guessChanged && !hasAnimated.current) {
      hasAnimated.current = true;
      setFade(true);
      const timeout = setTimeout(() => {
        setDisplayedGuess(guess);
        setFade(false);
      }, 250);
      prevGuess.current = guess;
      return () => clearTimeout(timeout);
    } else {
      // No animation: just update displayedGuess
      setDisplayedGuess(guess);
      setFade(false);
      prevGuess.current = guess;
    }
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
            {displayedGuess.direction === 1 ? (
              <UpArrow />
            ) : displayedGuess.direction === -1 ? (
              <DownArrow />
            ) : (
              <Checkmark />
            )}
          </div>
        </>
      )}
    </div>
  );
}
