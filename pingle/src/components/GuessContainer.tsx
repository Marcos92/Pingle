import GuessEntry from "./GuessEntry";

export interface GuessContainerProps {
  guesses: {
    guess: number | undefined;
    closeness: string | undefined;
    direction: number;
  }[];
}

export default function GuessContainer({ guesses }: GuessContainerProps) {
  console.log("GuessContainer rendered with guesses:", guesses);

  const paddedGuesses = (guesses ?? [])
    .concat(
      Array(Math.max(0, 6 - (guesses?.length ?? 0))).fill({
        guess: undefined,
        closeness: undefined,
        direction: undefined,
      })
    )
    .slice(0, 6);

  return (
    <div className="guess-container">
      {paddedGuesses.map((g, i) => (
        <GuessEntry
          key={i}
          guess={g?.guess ?? 0}
          closeness={
            g?.closeness === "win" ||
            g?.closeness === "near" ||
            g?.closeness === "far"
              ? g.closeness
              : undefined
          }
          direction={
            g?.direction === -1 || g?.direction === 0 || g?.direction === 1
              ? g.direction
              : undefined
          }
        />
      ))}
    </div>
  );
}
