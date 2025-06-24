import { useState, useEffect } from "react";
import { GameState } from "../types/gameState";

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("state") ?? "null");
      return GameState.from(raw ?? {});
    } catch {
      return new GameState();
    }
  });

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(gameState));
  }, [gameState]);

  function updateGameState(updatedState: typeof gameState) {
    setGameState(updatedState);
  }

  return { gameState, updateGameState, setGameState };
}