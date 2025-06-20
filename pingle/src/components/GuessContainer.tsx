import { Guess } from "../guess";
import GuessEntry from "./GuessEntry";

export interface GuessContainerProps {
  guesses: (Guess | undefined)[];
}

export default function GuessContainer({ guesses }: GuessContainerProps) {
  // Pad guesses to always have 6 entries
  const paddedGuesses = [...guesses];
  while (paddedGuesses.length < 6) {
    paddedGuesses.push(undefined);
  }

  return (
    <div className="guess-container">
      {paddedGuesses.map((g, i) => (
        <GuessEntry key={i} guess={g} />
      ))}
    </div>
  );
}
