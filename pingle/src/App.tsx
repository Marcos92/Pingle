import { useState, useEffect } from "react";
import "./App.css";
import GuessContainer from "./components/GuessContainer";
import InputBar from "./components/InputBar";
import ProductDisplay from "./components/ProductDisplay";
import GameInfo from "./components/GameInfo";
import ShareButton from "./components/ShareButton";
import { Guess } from "./guess";

function App() {
  const [productName, setProductName] = useState<string>("");
  const [productImage, setProductImage] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>(0);

  const gameIndex = getGameIndex();

  const [userStats, setUserStats] = useState(
    () =>
      JSON.parse(localStorage.getItem("stats") ?? "null") ?? {
        numGames: 0,
        numWins: 0,
        winsPerGuess: [0, 0, 0, 0, 0, 0],
        currentStreak: 0,
        maxStreak: 0,
      }
  );

  const [gameState, setGameState] = useState(
    () =>
      JSON.parse(localStorage.getItem("state") ?? "null") ?? {
        gameIndex: -1,
        guesses: [],
        hasWon: false,
      }
  );

  function getGameIndex() {
    const currDate = new Date();
    let dayCountSinceEpoch = Math.floor(
      currDate.getTime() / (1000 * 3600 * 24)
    );
    let index = Math.abs(Math.round(dayCountSinceEpoch));
    return index;
  }

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
    setGameState((prevGameState: any) => {
      if (prevGameState.gameIndex !== index) {
        setUserStats((prevUserStats: any) => {
          const updatedStats = { ...prevUserStats };
          if (prevGameState.hasWon === false) {
            updatedStats.currentStreak = 0;
          }
          updatedStats.numGames++;
          localStorage.setItem("stats", JSON.stringify(updatedStats));
          return updatedStats;
        });

        const newGameState = {
          gameIndex: index,
          guesses: [],
          hasWon: false,
        };
        localStorage.setItem("state", JSON.stringify(newGameState));
        return newGameState;
      }
      return prevGameState;
    });
  }

  function checkGuess(value: number) {
    const currentGuess: Guess = {
      price: value,
      closeness: "far",
      direction: 0,
    };
    const amountAway = Math.abs(productPrice - value);

    let isWin = false;

    //Player wins if guess is within 10 cents of the product price
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

      //Set direction based on whether guess is higher or lower than product price
      if (value > productPrice) {
        currentGuess.direction = -1;
      } else if (value < productPrice) {
        currentGuess.direction = 1;
      }
    }

    setGameState((prev: any) => {
      const newGuesses = [...prev.guesses, { ...currentGuess }];
      let updatedState = {
        ...prev,
        guesses: newGuesses,
        hasWon: isWin,
      };
      setTimeout(() => {
        localStorage.setItem("state", JSON.stringify(updatedState));
      }, 0);
      return { ...updatedState };
    });

    function gameWon() {
      userStats.numWins++;
      userStats.currentStreak++;
      userStats.winsInNum[gameState.guesses.length - 1]++;
      if (userStats.currentStreak > userStats.maxStreak) {
        userStats.maxStreak = userStats.currentStreak;
      }
      gameState.hasWon = true;

      localStorage.setItem("state", JSON.stringify(gameState));
      localStorage.setItem("stats", JSON.stringify(userStats));
    }

    function gameLost() {
      userStats.currentStreak = 0;

      localStorage.setItem("stats", JSON.stringify(userStats));
    }
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

  useEffect(() => {
    fetchGameData(gameIndex);
  }, [gameIndex]);

  let showShareButton = false; //test only */
  if (gameState.guesses.length === 6 || gameState.hasWon) {
    showShareButton = true;
  }

  return (
    <>
      <div className="main-container">
        <div className="title">PINGLE</div>
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
    </>
  );
}

export default App;
