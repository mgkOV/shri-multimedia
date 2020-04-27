const playerList = document.querySelectorAll(".video-wrapper");

playerList.forEach((p) => {
  p.addEventListener("click", handlePlayerClick);
  const minimizeBtn = p.querySelector(".minimize-btn");
});

function handlePlayerClick(e) {
  this.classList.add("video-wrapper__fullscreen");
  const minimizeBtn = e.target.closest(".minimize-btn");

  if (!minimizeBtn) return;

  this.classList.remove("video-wrapper__fullscreen");
}
