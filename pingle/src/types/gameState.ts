import type { Guess } from "./guess";

export class GameState {
  gameIndex: number;
  guesses: Guess[];
  hasWon: boolean;

  constructor(
    gameIndex = -1,
    guesses: Guess[] = [],
    hasWon = false
  ) {
    this.gameIndex = gameIndex;
    this.guesses = guesses;
    this.hasWon = hasWon;
  }

  static from(obj: any): GameState {
    return new GameState(
      obj.gameIndex ?? -1,
      obj.guesses ?? [],
      obj.hasWon ?? false
    );
  }
}