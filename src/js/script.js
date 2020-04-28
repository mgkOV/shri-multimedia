// Создаем контекст
let audioCtx = initContext();

const playerList = document.querySelectorAll(".video-wrapper");

// Регистриуем обработчики событий
playerList.forEach((p) => {
  p.addEventListener("click", handlePlayerClick);
  console.log(p);

  const contrast = p.querySelector(".contrast .settings_input");
  const brightness = p.querySelector(".brightness .settings_input");
  const video = p.querySelector(".video");
  video.style.filter = "brightness(1) contrast(1)";

  // Регистрируем яркость контраст
  contrast.addEventListener("input", (e) => {
    const filters = video.style.filter.split(" ");
    video.style.filter = `${filters[0]} contrast(${e.target.value})`;
    console.log(video.style.filter);
  });

  brightness.addEventListener("input", (e) => {
    const filters = video.style.filter.split(" ");
    video.style.filter = `brightness(${e.target.value}) ${filters[1]}`;
  });

  // Создаем анализатор аудио
  let analyser = createAnalizer(audioCtx);
  const source = audioCtx.createMediaElementSource(video);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  const bufferLength = analyser.frequencyBinCount;
  const ctxData = new Uint8Array(bufferLength);

  const volumeLevel = p.querySelector(".volume-bar");

  setInterval(() => {
    analyser.getByteFrequencyData(ctxData);
    const total = ctxData.reduce((acc, c) => acc + c, 0);
    const everage = total / ctxData.length;
    const volumeIdx = everage / 100;
    volumeLevel.style.transform = `scaleY(${volumeIdx})`;
  }, 100);
});

// Обработчик кликов
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
    this.querySelector(".btn__volume .btn_icon").src = "assets/img/muted.svg";
    this.classList.remove("video-wrapper__fullscreen");
    settings.classList.remove("settings__visible");
  }

  // MUTE/UNMUTE
  if (volumeBtn) {
    video.muted = !video.muted;
    const volumeIcon = volumeBtn.querySelector(".btn_icon");

    if (video.muted) {
      volumeIcon.src = "assets/img/muted.svg";
    } else {
      volumeIcon.src = "assets/img/volume.svg";

      if (audioCtx.state !== "running") {
        audioCtx.resume();
      }
    }
  }

  // Переключаем отоброжение панели Яркость/Контраст
  if (settingsBtn) {
    settings.classList.toggle("settings__visible");
  }
}

// Инициализатор аудио контекста
function initContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  return new AudioContext();
}

function createAnalizer(context, fftSize = 32, timeConstant = 0) {
  const analyser = context.createAnalyser();

  analyser.fftSize = fftSize;
  analyser.smoothingTimeConstant = timeConstant;

  return analyser;
}
