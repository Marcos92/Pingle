export interface GuessEntryProps {
  guess: number;
  closeness: "win" | "near" | "far" | undefined;
  direction: -1 | 0 | 1 | undefined;
}

export default function GuessEntry({ guess, closeness, direction }: GuessEntryProps) {

  console.log("GuessEntry rendered with:", { guess, closeness, direction });

  return (
    <>
      {(guess === undefined || closeness === undefined || direction === undefined) ? (
      <div className="guess-entry-empty"></div>
      ) : (
      <div className="guess-entry">
        <div className="price">{guess.toFixed(2)}€</div>
        <div className={`hint ${closeness}`}>{direction === 1 ? "↑" : direction === -1 ? "↓" : "✔"}</div>
      </div>
      )}
    </>
  );
}
