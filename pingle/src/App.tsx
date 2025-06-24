import { useState, useEffect } from "react";
import "./App.css";
import GamePage from "./components/pages/GamePage";
import Footer from "./components/Footer";
import HelpPage from "./components/pages/HelpPage";
import StatsPage from "./components/pages/StatsPage";
import type { Product } from "./types/product";
import { useUserStats } from "./hooks/useUserStats";
import { useGameState } from "./hooks/useGameState";
import { useViewState } from "./hooks/useViewState";
import {
  getGameIndex,
  fetchGameData,
  initializeGame,
  checkGuess,
  onWin,
  onLose,
  share,
} from "./utils/gameUtils";

function App() {
  const [product, setProduct] = useState<Product>({
    name: "",
    image: "",
    price: 0,
  });

  const { userStats, updateUserStats } = useUserStats();
  const { gameState, updateGameState } = useGameState();
  const { showGame, showHelp, showStats, toggleHelp, toggleStats } =
    useViewState();

  const gameIndex: number = getGameIndex();

  useEffect(() => {
    fetchGameData(gameIndex, setProduct, (index) =>
      initializeGame(index, userStats, updateUserStats, updateGameState)
    );
  }, [gameIndex]);

  function handleCheckGuess(value: number) {
    checkGuess(
      value,
      product,
      gameState,
      updateGameState,
      (guessCount: number) => onWin(guessCount, userStats, updateUserStats),
      () => onLose(userStats, updateUserStats)
    );
  }

  function handleShare() {
    share(gameState, navigator);
  }

  return (
    <>
      <div className="main-container">
        <div className="title">PINGLE</div>
        {showGame && (
          <GamePage
            product={product}
            gameState={gameState}
            handleShare={handleShare}
            handleCheckGuess={handleCheckGuess}
          />
        )}
        {showHelp && <HelpPage />}
        {showStats && <StatsPage userStats={userStats} />}
        <Footer openHelp={toggleHelp} openStats={toggleStats} />
      </div>
    </>
  );
}

export default App;
