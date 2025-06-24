import { UserStats } from "../../types/userStats";

export interface StatsPageProps {
  userStats: UserStats;
}

export default function StatsPage({ userStats }: StatsPageProps) {
  const {
    numGames = 0,
    numWins = 0,
    perfectWins = 0,
    winsPerGuess = [],
    currentStreak = 0,
    maxStreak = 0,
  } = userStats || {};
  const winRate = numGames > 0 ? Math.round((numWins / numGames) * 100) : 0;

  return (
    <div className="stats">
      <h2>Estatísticas</h2>
      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-label">Jogos</span>
          <span className="stat-value">{numGames}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Vitórias</span>
          <span className="stat-value">{numWins}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Vitórias perfeitas</span>
          <span className="stat-value">{perfectWins}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Taxa de vitórias</span>
          <span className="stat-value">{winRate}%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Vitórias sucessivas</span>
          <span className="stat-value">{currentStreak}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Máximo de vitórias sucessivas</span>
          <span className="stat-value">{maxStreak}</span>
        </div>
      </div>
      <div className="break"></div>
      <div className="stats-distribution">
        <h2>Vitórias por número de tentativas</h2>
        {winsPerGuess.map((count, idx) => (
          <div className="bar-item" key={idx}>
            <span className="bar-label">{idx + 1}</span>
            <div
              className="bar-fill"
              style={{
                width: numWins > 0 ? `${(count / numWins) * 100}%` : "0%",
              }}
            >
              {count > 0 && <span className="bar-value">{count}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
