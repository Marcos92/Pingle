export class UserStats {
  numGames: number;
  numWins: number;
  winsPerGuess: number[];
  currentStreak: number;
  maxStreak: number;
  gameIndex: number;

  constructor(
    numGames = 0,
    numWins = 0,
    winsPerGuess = [0, 0, 0, 0, 0, 0],
    currentStreak = 0,
    maxStreak = 0,
    gameIndex = -1
  ) {
    this.numGames = numGames;
    this.numWins = numWins;
    this.winsPerGuess = winsPerGuess;
    this.currentStreak = currentStreak;
    this.maxStreak = maxStreak;
    this.gameIndex = gameIndex;
  }

  static from(obj: any): UserStats {
    return new UserStats(
      obj.numGames ?? 0,
      obj.numWins ?? 0,
      obj.winsPerGuess ?? [0, 0, 0, 0, 0, 0],
      obj.currentStreak ?? 0,
      obj.maxStreak ?? 0,
      obj.gameIndex ?? -1
    );
  }
}