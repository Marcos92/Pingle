import ProductDisplay from "../ProductDisplay";
import GameInfo from "../GameInfo";
import GuessContainer from "../GuessContainer";
import ShareButton from "../ShareButton";
import InputBar from "../InputBar";
import type { Product } from "../../types/product";
import type { GameState } from "../../types/gameState";

interface GamePageProps {
  product: Product;
  gameState: GameState;
  handleShare: () => void;
  handleCheckGuess: (value: number) => void;
}

export default function GamePage({
  product,
  gameState,
  handleShare,
  handleCheckGuess,
}: GamePageProps) {
  let showShareButton = gameState.guesses.length === 6 || gameState.hasWon;
  return (
    <div className="game">
      <ProductDisplay name={product.name} image={product.image} />
      <GameInfo
        hasWon={gameState.hasWon}
        guessNumber={gameState.guesses.length}
        productPrice={product.price}
      />
      <GuessContainer guesses={gameState.guesses} />
      {showShareButton ? (
        <ShareButton share={handleShare} />
      ) : (
        <InputBar checkGuess={handleCheckGuess} />
      )}
    </div>
  );
}
