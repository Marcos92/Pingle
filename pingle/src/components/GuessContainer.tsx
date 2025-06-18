import GuessEntry from "./GuessEntry";

export interface GuessContainerProps {
  guesses: { price: number; tip: string }[];
}

export default function GuessContainer({ guesses }: GuessContainerProps) {
  return (
    <div className="guess-container">
      {guesses.map((g, i) => (
        <GuessEntry key={i} price={g.price} hint={g.tip} />
      ))}
    </div>
  );
}
