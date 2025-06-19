import { useState, useEffect } from "react";
import "./App.css";
import GuessContainer from "./components/GuessContainer";
import InputBar from "./components/InputBar";
import ProductDisplay from "./components/ProductDisplay";
import GameInfo from "./components/GameInfo";

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

  function checkGuess(guess: number) {
    console.log("checkGuess called with:", guess);
    const guessObj = { guess, closeness: "", direction: 0 };
    const amountAway = Math.abs(productPrice - guess);
    console.log("productPrice:", productPrice, "amountAway:", amountAway);

    let isWin = false;

    if (amountAway < 0.1) {
      guessObj.closeness = "win";
      guessObj.direction = 0;
      isWin = true;
      console.log("Guess is a WIN!");
      gameWon();
    } else {
      if (amountAway < 1.0) {
        guessObj.closeness = "near";
        console.log("Guess is NEAR");
      } else {
        guessObj.closeness = "far";
        console.log("Guess is FAR");
      }
      if (guess > productPrice) {
        guessObj.direction = -1;
      } else if (guess < productPrice) {
        guessObj.direction = 1;
      }
    }

    setGameState((prev: any) => {
      const newGuesses = [...prev.guesses, { ...guessObj }];
      let updatedState = {
        ...prev,
        guesses: newGuesses,
        hasWon: isWin ? true : prev.hasWon,
      };
      if (newGuesses.length === 6 && !isWin) {
        console.log("Max guesses reached. Game lost.");
        gameLost();
      }
      setTimeout(() => {
        localStorage.setItem("state", JSON.stringify(updatedState));
      }, 0);
      console.log("Updated gameState:", updatedState);
      return { ...updatedState }; // ensure new object reference
    });
  }

  function gameWon() {
    // Placeholder: implement win logic if needed
    // For now, do nothing
  }

  function gameLost() {
    // Placeholder: implement lose logic if needed
    // For now, do nothing
  }

  useEffect(() => {
    fetchGameData(gameIndex);
  }, [gameIndex]);

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
        <InputBar checkGuess={checkGuess} />
      </div>
    </>
  );
}

export default App;
