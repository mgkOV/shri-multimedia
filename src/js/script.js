const playerList = document.querySelectorAll(".video-wrapper");

playerList.forEach((p) => {
  p.addEventListener("click", handlePlayerClick);
});

function handlePlayerClick(e) {
  this.classList.add("video-wrapper__fullscreen");
  const minimizeBtn = e.target.closest(".btn__minimize");
  const settingsBtn = e.target.closest(".btn__settings");
  const volumeBtn = e.target.closest(".btn__volume");
  const video = this.querySelector(".video");
  const settings = this.querySelector(".settings");

  // MINIMIZE
  if (minimizeBtn) {
    video.muted = true;
    this.classList.remove("video-wrapper__fullscreen");
    settings.classList.remove("settings__visible");
  }

  // MUTE
  if (volumeBtn) {
    video.muted = !video.muted;
    const volumeIcon = volumeBtn.querySelector(".btn_icon");

    if (video.muted) {
      volumeIcon.src = "assets/img/muted.svg";
    } else {
      volumeIcon.src = "assets/img/volume.svg";
    }
  }

  // CONTRAST & BRIGHTNESS
  if (settingsBtn) {
    settings.classList.toggle("settings__visible");
  }
}
