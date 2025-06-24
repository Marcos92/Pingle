import { useState } from "react";

type ShareButtonProps = {
  share: () => void;
};

export default function ShareButton({ share }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  function handleInput() {
    share();
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
