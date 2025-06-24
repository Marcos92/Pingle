import type { Product } from "../types/product";
import type { Guess } from "../types/guess";
import { GameState } from "../types/gameState";
import { UserStats } from "../types/userStats";

export function getGameIndex(): number {
  const currDate = new Date();
  return Math.floor(currDate.getTime() / (1000 * 3600 * 24));
}

export function fetchGameData(
  gameIndex: number,
  setProduct: (product: Product) => void,
  initializeGame: (index: number) => void
) {
  fetch("/products.json")
    .then((response) => response.json())
    .then((json) => {
      const index = gameIndex % json.length;
      const product: Product = {
        name: json[index].name,
        image: json[index].image,
        price: json[index].price,
      };
      setProduct(product);
      initializeGame(index);
    });
}

export function initializeGame(
  index: number,
  userStats: UserStats,
  updateUserStats: (stats: UserStats) => void,
  updateGameState: (state: GameState) => void
) {
  if (userStats.gameIndex !== index) {
    const updatedStats = {
      ...userStats,
      gameIndex: index,
      numGames: (userStats.numGames ?? 0) + 1,
    };
    updateUserStats(updatedStats);

    const newGameState = GameState.from({
      gameIndex: index,
      guesses: [],
      hasWon: false,
    });
    updateGameState(newGameState);
  }
}

export function checkGuess(
  value: number,
  product: Product,
  gameState: GameState,
  updateGameState: (state: GameState) => void,
  onWin: (guessCount: number) => void,
  onLose: () => void
) {
  const currentGuess: Guess = {
    price: value,
    closeness: "far",
    direction: 0,
  };

  let isWin = false;
  const amountAway = Math.abs(product.price - value);

  if (amountAway < 0.1) {
    currentGuess.closeness = "win";
    currentGuess.direction = 0;
    isWin = true;
  } else {
    if (amountAway < 1.0) {
      currentGuess.closeness = "near";
    } else {
      currentGuess.closeness = "far";
    }
    if (value > product.price) {
      currentGuess.direction = -1;
    } else if (value < product.price) {
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
    return true;
  } else if (newGuesses.length >= 6 && !isWin) {
    onLose();
  }
    return false;
}

export function onWin(
  guessCount: number,
  userStats: UserStats,
  updateUserStats: (stats: UserStats) => void
) {
  const updatedStats = { ...userStats };
  updatedStats.numWins++;
  updatedStats.currentStreak++;
  updatedStats.winsPerGuess[guessCount - 1]++;
  if (updatedStats.currentStreak > updatedStats.maxStreak) {
    updatedStats.maxStreak = updatedStats.currentStreak;
  }
  updateUserStats(updatedStats);
}

export function onLose(
  userStats: UserStats,
  updateUserStats: (stats: UserStats) => void
) {
  const updatedStats = { ...userStats, currentStreak: 0 };
  updateUserStats(updatedStats);
}

export function share(
  gameState: GameState,
  navigator: Navigator
) {
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
        url: "https://pingle.pt",
      })
      .catch((error: any) => console.error("Share failed:", error));
  } else {
    output += `https://pingle.pt`;
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