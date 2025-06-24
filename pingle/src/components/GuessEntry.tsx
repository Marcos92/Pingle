import { Guess } from "../types/guess";

export interface GuessEntryProps {
  guess: Guess | undefined;
}

export default function GuessEntry({ guess }: GuessEntryProps) {
  return (
    <>
      {guess == null ? (
        <div className="guess-entry-empty"></div>
      ) : (
        <div className="guess-entry">
          <div className="price">
            {typeof guess?.price === "number"
              ? guess.price.toFixed(2) + "€"
              : "--"}
          </div>
          <div className={`hint ${guess?.closeness}`}>
            {guess?.direction === 1 ? "↑" : guess?.direction === -1 ? "↓" : "✔"}
          </div>
        </div>
      )}
    </>
  );
}
