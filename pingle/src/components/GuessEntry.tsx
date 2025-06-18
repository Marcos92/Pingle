export interface GuessEntryProps {
  price: number;
  hint: string;
}

export default function GuessEntry({ price, hint }: GuessEntryProps) {
  return (
    <div className="guess-entry">
      <div className="price">{price}€</div>
      <div className="hint">{hint}</div>
    </div>
  );
}
