export default function HelpPage() {
  return (
    <div className="help">
      <p>Adivinha o preço certo em seis tentativas.</p>
      <p>Cada tentativa incorrecta vai ajudar-te a encontrar o preço certo.</p>
      <p>Todos os dias há um produto novo!</p>
      <br />
      <div className="break"></div>
      <br />
      <p>
        A seta para cima indica que o preço certo é maior do que a tua sugestão.
        Se estiver para baixo, quer dizer que é menor.
      </p>
      <p>
        Se a ajuda estiver a vermelho quer dizer que estás a mais de um euro do
        preço certo, e a amarelo significa que estás a menos de um euro do preço
        certo.
      </p>
      <div className="hint-container">
        <div className="hint far">↑</div> <div className="hint near">↓</div>
      </div>
      <p>
        Se a tua sugestão estiver a menos de 10 cêntimos do preço certo, ganhas
        o jogo!
      </p>

      <div className="hint-container">
        <div className="hint win">✔</div>
      </div>
      <br />
      <div className="break"></div>
      <br />
      <p>
        Podes acompanhar o meu trabalho{" "}
        <a href="https://marcosmakesgames.com/">aqui</a>, e contribuir com
        doações <a href="https://ko-fi.com/marcosrodrigues92">aqui</a>.
      </p>
      <p>
        Envia as tuas sugestões para <a href="mailto:pingle@pingle.pt">aqui</a>.
      </p>
      <br />
      <div className="break"></div>
      <br />
      <p>
        Agradecimento especial ao @Kerm, criador do{" "}
        <a href="https://costcodle.com/">Costcodle</a>.
      </p>
    </div>
  );
}
