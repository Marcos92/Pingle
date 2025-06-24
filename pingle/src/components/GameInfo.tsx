export interface GameInfoProps {
  hasWon: boolean;
  guessNumber: number;
  productPrice: number;
}

export default function GameInfo({
  hasWon,
  guessNumber,
  productPrice,
}: GameInfoProps) {
  return (
    <div className="game-info">
      {!hasWon && guessNumber < 6 && `Tentativa ${guessNumber + 1} de 6`}
      {hasWon && `Ganhaste! O preço certo é ${productPrice}€`}
      {!hasWon &&
        guessNumber === 6 &&
        `Perdeste! O preço certo era ${productPrice}€`}
    </div>
  );
}
