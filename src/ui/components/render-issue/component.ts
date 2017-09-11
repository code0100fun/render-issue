import Component, { tracked } from '@glimmer/component';

export default class extends Component {
  @tracked duration = null;
  @tracked currentTime = null;
  @tracked timeLeft = null;
  @tracked progress = null;
  @tracked playing = false;
  @tracked canPlay = false;
  audio: any;
  _progressTimer: any;

  didInsertElement() {
    this.audio = this.element.querySelector('[data-id=audio]');
    this.audio.addEventListener('loadedmetadata', this.onMetaData.bind(this), false);
    this.audio.addEventListener('canplay', this.onCanPlay.bind(this), false);
    this.audio.addEventListener('playing', this.onPlaying.bind(this), false);
    this.audio.addEventListener('pause', this.onPaused.bind(this), false);
  }

  onMetaData(e) {
    console.log('onMetaData');
    this.duration = this.audio.duration;
    console.log({ duration: this.duration });
  }

  onCanPlay(e) {
    console.log('onCanPlay');
    this.canPlay = true;
  }

  onPlaying(e) {
    console.log('onPlaying');
    this.playing = true;
    this.startProgressTimer();
  }

  onPaused(e) {
    console.log('onPaused');
    this.playing = false;
    this.stopProgressTimer();
  }

  startProgressTimer() {
    console.log('startProgressTimer');
    this._progressTimer = setInterval(() => {
      console.log('update');
      this.duration = this.audio.duration;
      this.currentTime = this.audio.currentTime;
      this.timeLeft = this.duration - this.currentTime;
      this.progress = this.currentTime / this.duration;
    }, 250);
  }

  stopProgressTimer() {
    clearInterval(this._progressTimer);
  }

  getMetaData() {
    this.currentTime = this.audio.currentTime;
    this.timeLeft = this.duration - this.currentTime;
  }

  playPause() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
}
