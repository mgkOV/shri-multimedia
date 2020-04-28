class Analyzer {
  constructor() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();

    this.analyser = this.context.createAnalyser();

    this.analyser.fftSize = 128;
    // this.analyser.smoothingTimeConstant = 0.3;

    const bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength);
  }
}

export default Analyzer;
