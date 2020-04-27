const playerList = document.querySelectorAll(".video-wrapper");

playerList.forEach((p) => {
  p.addEventListener("click", handleClick);
});

function handleClick(e) {
  this.classList.add("video-wrapper__fullscreen");
  console.log(this);
}
