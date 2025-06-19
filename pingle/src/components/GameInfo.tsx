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
  console.log("GameInfo rendered with:", { hasWon, guessNumber, productPrice });
  return (
    <div className="game-info">
      {!hasWon && guessNumber < 6 && `Tentativa ${guessNumber + 1} de 6`}
      {hasWon && `Ganhou! O preço certo é ${productPrice}€`}
      {!hasWon &&
        guessNumber === 6 &&
        `Perdeu! O preço certo é ${productPrice}€`}
    </div>
  );
}
