type ShareButtonProps = {
  share: () => void;
};

export default function ShareButton({ share }: ShareButtonProps) {
  function handleInput() {
    share();
  }

  return (
    <>
      <button className="share-button" onClick={handleInput}>
        Partilhar<i className="fa fa-share-nodes"></i>
      </button>
    </>
  );
}
