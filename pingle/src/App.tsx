import { useState, useEffect } from "react";
import "./App.css";
import GamePage from "./components/pages/GamePage";
import BottomBar from "./components/BottomBar";
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
} from "./utils/gameUtils";

function App() {
  const [product, setProduct] = useState<Product>({
    name: "",
    quantity: "",
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

  function handleCheckGuess(value: number): boolean {
    return checkGuess(
      value,
      product,
      gameState,
      updateGameState,
      (guessCount: number, isPerfect: boolean) =>
        onWin(guessCount, isPerfect, userStats, updateUserStats),
      () => onLose(userStats, updateUserStats)
    );
  }

  const [fade, setFade] = useState(false);
  const [currentPage, setCurrentPage] = useState<"game" | "help" | "stats">(
    "game"
  );

  useEffect(() => {
    let nextPage: "game" | "help" | "stats" = "game";
    if (showHelp) nextPage = "help";
    else if (showStats) nextPage = "stats";
    else if (showGame) nextPage = "game";

    if (nextPage !== currentPage) {
      setFade(true);
      setTimeout(() => {
        setCurrentPage(nextPage);
        setFade(false);
      }, 250);
    }
  }, [showGame, showHelp, showStats]);

  let page = null;
  if (currentPage === "game") {
    page = (
      <GamePage
        product={product}
        gameState={gameState}
        handleCheckGuess={handleCheckGuess}
      />
    );
  } else if (currentPage === "help") {
    page = <HelpPage />;
  } else if (currentPage === "stats") {
    page = <StatsPage userStats={userStats} />;
  }

  return (
    <div className="main-container">
      <div className="title">PINGLE</div>
      <div
        className={`page-fade${fade ? " page-fade-hidden" : ""}`}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        {page}
        <BottomBar openHelp={toggleHelp} openStats={toggleStats} />
      </div>
    </div>
  );
}

export default App;
