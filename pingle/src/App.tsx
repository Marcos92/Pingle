import { useState, useEffect } from "react";
import "./App.css";
import GuessContainer from "./components/GuessContainer";
import InputBar from "./components/InputBar";
import ProductDisplay from "./components/ProductDisplay";
import GameInfo from "./components/GameInfo";
import ShareButton from "./components/ShareButton";
import type { Guess } from "./guess";
import Footer from "./components/Footer";
import HelpPage from "./components/HelpPage";
import StatsPage from "./components/StatsPage";

function App() {
  const [productName, setProductName] = useState<string>("");
  const [productImage, setProductImage] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>(0);

  const [userStats, setUserStats] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("stats") ?? "null") ?? {
          numGames: 0,
          numWins: 0,
          winsPerGuess: [0, 0, 0, 0, 0, 0],
          currentStreak: 0,
          maxStreak: 0,
          gameIndex: -1,
        }
      );
    } catch {
      return {
        numGames: 0,
        numWins: 0,
        winsPerGuess: [0, 0, 0, 0, 0, 0],
        currentStreak: 0,
        maxStreak: 0,
        gameIndex: -1,
      };
    }
  });

  useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(userStats));
  }, [userStats]);

  function updateUserStats(updatedStats: typeof userStats) {
    setUserStats(updatedStats);
  }

  const [gameState, setGameState] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("state") ?? "null") ?? {
          gameIndex: -1,
          guesses: [],
          hasWon: false,
        }
      );
    } catch {
      return {
        gameIndex: -1,
        guesses: [],
        hasWon: false,
      };
    }
  });

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(gameState));
  }, [gameState]);

  function updateGameState(updatedState: typeof gameState) {
    setGameState(updatedState);
  }

  function getGameIndex() {
    const currDate = new Date();
    const index = Math.floor(currDate.getTime() / (1000 * 3600 * 24));
    return index;
  }
  const gameIndex: number = getGameIndex();

  function fetchGameData(gameIndex: number) {
    fetch("/products.json")
      .then((response) => response.json())
      .then((json) => {
        const index = gameIndex % json.length;
        setProductName(json[index].name);
        setProductPrice(json[index].price);
        setProductImage(json[index].image);
        initializeGame(index);
      });
  }

  function initializeGame(index: number) {
    if (userStats.gameIndex !== index) {
      const updatedStats = {
        ...userStats,
        gameIndex: index,
        numGames: (userStats.numGames ?? 0) + 1,
      };
      updateUserStats(updatedStats);

      const newGameState = {
        gameIndex: index,
        guesses: [],
        hasWon: false,
      };
      updateGameState(newGameState);
    }
  }

  function checkGuess(value: number) {
    const currentGuess: Guess = {
      price: value,
      closeness: "far",
      direction: 0,
    };

    let isWin = false;
    const amountAway = Math.abs(productPrice - value);

    // Player wins if guess is within 10 cents of the product price
    if (amountAway < 0.1) {
      currentGuess.closeness = "win";
      currentGuess.direction = 0;
      isWin = true;
    } else {
      // Player is near if guess is within 1 euro of the product price
      if (amountAway < 1.0) {
        currentGuess.closeness = "near";
      } else {
        currentGuess.closeness = "far";
      }

      // Set direction based on whether guess is higher or lower than product price
      if (value > productPrice) {
        currentGuess.direction = -1;
      } else if (value < productPrice) {
        currentGuess.direction = 1;
      }
    }

    const newGuesses = [...gameState.guesses, { ...currentGuess }];
    const updatedState = {
      ...gameState,
      guesses: newGuesses,
      hasWon: isWin,
    };
    updateGameState(updatedState);

    if (isWin) {
      onWin(newGuesses.length);
    } else if (newGuesses.length >= 6 && !isWin) {
      onLose();
    }
  }

  function onWin(guessCount: number) {
    const updatedStats = { ...userStats };
    updatedStats.numWins++;
    updatedStats.currentStreak++;
    updatedStats.winsPerGuess[guessCount - 1]++;
    if (updatedStats.currentStreak > updatedStats.maxStreak) {
      updatedStats.maxStreak = updatedStats.currentStreak;
    }
    updateUserStats(updatedStats);
  }

  function onLose() {
    const updatedStats = { ...userStats, currentStreak: 0 };
    updateUserStats(updatedStats);
  }

  function share() {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("pt-PT", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    let output = `PINGLE - ${formattedDate}\n`;
    output += gameState.hasWon ? ` ${gameState.guesses.length}/6\n` : ` X/6\n`;

    (gameState.guesses as Guess[]).forEach((guess: Guess) => {
      output +=
        (guess.direction === 1 ? "⬆️" : guess.direction === -1 ? "⬇️" : "✅") +
        (guess.closeness === "far"
          ? "🟥"
          : guess.closeness === "near"
          ? "🟨"
          : "") +
        "\n";
    });

    const isMobile =
      typeof navigator !== "undefined" &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile && typeof (navigator as any).canShare === "function") {
      (navigator as any)
        .share({
          title: "PINGLE",
          text: output,
          url: "https://pingle.com",
        })
        .catch((error: any) => console.error("Share failed:", error));
    } else {
      output += `https://pingle.com`;
      if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        navigator.clipboard.writeText(output);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = output;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand("copy");
        } catch (err) {
          console.error("Fallback: Copy command failed", err);
        }
        document.body.removeChild(textArea);
      }
    }
  }

  type GameState = "game" | "help" | "stats";
  const [view, setView] = useState<GameState>("game");

  const showGame = view === "game";
  const showHelp = view === "help";
  const showStats = view === "stats";

  function toggleHelp(): void {
    setView((prev) => (prev === "help" ? "game" : "help"));
  }
  function toggleStats(): void {
    setView((prev) => (prev === "stats" ? "game" : "stats"));
  }

  let showShareButton = gameState.guesses.length === 6 || gameState.hasWon;

  useEffect(() => {
    fetchGameData(gameIndex);
  }, [gameIndex]);

  return (
    <>
      <div className="main-container">
        <div className="title">PINGLE</div>
        {showGame && (
          <div className="game">
            <ProductDisplay name={productName} image={productImage} />
            <GameInfo
              hasWon={gameState.hasWon}
              guessNumber={gameState.guesses.length}
              productPrice={productPrice}
            />
            <GuessContainer guesses={gameState.guesses} />
            {showShareButton ? (
              <ShareButton share={share} />
            ) : (
              <InputBar checkGuess={checkGuess} />
            )}
          </div>
        )}
        {showHelp && <HelpPage />}
        {showStats && (
          <StatsPage
            numGames={userStats.numGames}
            numWins={userStats.numWins}
            winsPerGuess={userStats.winsPerGuess}
            currentStreak={userStats.currentStreak}
            maxStreak={userStats.maxStreak}
          />
        )}
        <Footer openHelp={toggleHelp} openStats={toggleStats} />
      </div>
    </>
  );
}

export default App;
