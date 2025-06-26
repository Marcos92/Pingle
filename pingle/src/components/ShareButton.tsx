import { useState } from "react";
import { share } from "../utils/gameUtils";
import { GameState } from "../types/gameState";

type ShareButtonProps = {
  gameState : GameState;
};

export default function ShareButton({ gameState }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  function handleInput() {
    share(gameState, navigator);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }

  return (
    <button className="share-button" onClick={handleInput}>
      {copied ? (
        "Copiado com sucesso!"
      ) : (
        <>
          Partilhar <i className="fa fa-share-nodes"></i>
        </>
      )}
    </button>
  );
}
