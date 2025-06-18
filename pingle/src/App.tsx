import "./App.css";
import GuessContainer from "./components/GuessContainer";
import InputBar from "./components/InputBar";
import ProductDisplay from "./components/ProductDisplay";

function App() {
  const guesses = [
    { price: 9.99, tip: "↑" },
    { price: 10.49, tip: "↓" },
    { price: 9.89, tip: "↓" },
    { price: 10.19, tip: "↑" },
    { price: 10.0, tip: "↓" },
    { price: 10.25, tip: "✓" },
  ];
  return (
    <>
      <div className="main-container">
        <div className="title">PINGLE</div>
        <ProductDisplay />
        <div className="game-info">Ganhou! O preço certo é 9.99€</div>
        <GuessContainer guesses={guesses} />
        <InputBar />
      </div>
    </>
  );
}

export default App;
