export interface GameInfoProps {
  hasWon: boolean;
  isPerfect: boolean;
  guessNumber: number;
  productPrice: number;
}

export default function GameInfo({
  hasWon,
  isPerfect,
  guessNumber,
  productPrice,
}: GameInfoProps) {
  if (productPrice === 0) {
    return <div className="game-info"> </div>;
  }

  return (
    <div className="game-info">
      {!hasWon && guessNumber < 6 && `Tentativa ${guessNumber + 1} de 6`}
      {hasWon && !isPerfect && `Ganhaste! O preço certo é ${productPrice}€`}
      {hasWon && isPerfect && `Perfeito! O preço certo é ${productPrice}€`}
      {!hasWon &&
        guessNumber === 6 &&
        `Perdeste! O preço certo era ${productPrice}€`}
    </div>
  );
}
