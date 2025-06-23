export interface StatsPageProps {
  numGames: 0;
  numWins: 0;
  winsPerGuess: [0, 0, 0, 0, 0, 0];
  currentStreak: 0;
  maxStreak: 0;
}

export default function StatsPage(props: StatsPageProps) {
  const { numGames, numWins, winsPerGuess, currentStreak, maxStreak } = props;
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
                width: numGames > 0 ? `${(count / numWins) * 100}%` : "0%",
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
