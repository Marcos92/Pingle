import type { Guess } from "./guess";

export class GameState {
  gameIndex: number;
  guesses: Guess[];
  hasWon: boolean;
  isPerfect: boolean;

  constructor(
    gameIndex = -1,
    guesses: Guess[] = [],
    hasWon = false,
    isPerfect = false
  ) {
    this.gameIndex = gameIndex;
    this.guesses = guesses;
    this.hasWon = hasWon;
    this.isPerfect = isPerfect;
  }

  static from(obj: any): GameState {
    return new GameState(
      obj.gameIndex ?? -1,
      obj.guesses ?? [],
      obj.hasWon ?? false,
      obj.isPerfect ?? false
    );
  }
}