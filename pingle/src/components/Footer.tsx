export interface FooterProps {
    openHelp: () => void;
    openStats: () => void;
}

export default function Footer({ openHelp, openStats }: FooterProps) {
  return (
    <div className="footer">
      <div className="button-container">
        <button className="help-button" onClick={openHelp}>
          <i className="fa-solid fa-question"></i>
        </button>
        <button className="stats-button" onClick={openStats}>
          <i className="fa-solid fa-chart-simple"></i>
        </button>
      </div>
      <div className="credits">
        Criado por Marcos Rodrigues
        <br />
        2025
      </div>
    </div>
  );
}
