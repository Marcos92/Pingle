type ShareButtonProps = {
  share: () => void;
};

export default function ShareButton({ share }: ShareButtonProps) {
  function handleInput() {
    share();
    const toast = document.getElementById("share-toast");
    if (!toast) return;
    toast.classList.remove("hide");
    toast.classList.add("animate__flipInX");
    setTimeout(() => {
      if (!toast) return;
      toast.classList.remove("animate__flipInX");
      toast.classList.add("animate__flipOutX");
      setTimeout(() => {
        if (!toast) return;
        toast.classList.remove("animate__flipOutX");
        toast.classList.add("hide");
      }, 1000);
    }, 2000);
  }

  return (
    <>
      <button className="share-button" onClick={handleInput}>
        Partilhar<i className="fa fa-share-nodes"></i>
      </button>
      <div id="share-toast" className="toast hide">
        Partilhado com sucesso!
      </div>
    </>
  );
}
