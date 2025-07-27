import { useState, useRef } from "react";
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
  handleCheckGuess: (value: number) => boolean;
}

export default function GamePage({
  product,
  gameState,
  handleCheckGuess,
}: GamePageProps) {
  const [shake, setShake] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function onCheckGuess(value: number) {
    const isCorrect = handleCheckGuess(value);
    if (!isCorrect) {
      setShake(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShake(false), 400);
    }
  }

  let showShareButton = gameState.guesses.length === 6 || gameState.hasWon;
  return (
    <div className="game">
      <ProductDisplay
        name={product.name}
        quantity={product.quantity}
        image={product.image}
        className={shake ? "shake" : ""}
      />
      <GameInfo
        hasWon={gameState.hasWon}
        isPerfect={gameState.isPerfect}
        guessNumber={gameState.guesses.length}
        productPrice={product.price}
      />
      <GuessContainer guesses={gameState.guesses} />
      {showShareButton ? (
        <ShareButton gameState={gameState} />
      ) : (
        <InputBar checkGuess={onCheckGuess} />
      )}
    </div>
  );
}
