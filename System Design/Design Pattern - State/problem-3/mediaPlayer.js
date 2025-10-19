// State interface
class PlayerState {
  play(player) {
    throw new Error("Method not implemented");
  }
  
  pause(player) {
    throw new Error("Method not implemented");
  }
  
  stop(player) {
    throw new Error("Method not implemented");
  }
}

// Concrete States
class PlayState extends PlayerState {
  play(player) {
    console.log("Already playing");
  }
  
  pause(player) {
    console.log("Pausing media");
    player.setState(player.getPauseState());
  }
  
  stop(player) {
    console.log("Stopping media");
    player.setState(player.getStopState());
  }
}

class PauseState extends PlayerState {
  play(player) {
    console.log("Resuming media");
    player.setState(player.getPlayState());
  }
  
  pause(player) {
    console.log("Already paused");
  }
  
  stop(player) {
    console.log("Stopping media");
    player.setState(player.getStopState());
  }
}

class StopState extends PlayerState {
  play(player) {
    console.log("Playing media from beginning");
    player.setState(player.getPlayState());
  }
  
  pause(player) {
    console.log("Cannot pause - media is stopped");
  }
  
  stop(player) {
    console.log("Already stopped");
  }
}

// Context
class MediaPlayer {
  constructor() {
    this.playState = new PlayState();
    this.pauseState = new PauseState();
    this.stopState = new StopState();
    this.currentState = this.stopState;
  }
  
  setState(state) {
    this.currentState = state;
  }
  
  getPlayState() {
    return this.playState;
  }
  
  getPauseState() {
    return this.pauseState;
  }
  
  getStopState() {
    return this.stopState;
  }
  
  play() {
    this.currentState.play(this);
  }
  
  pause() {
    this.currentState.pause(this);
  }
  
  stop() {
    this.currentState.stop(this);
  }
}

module.exports = { MediaPlayer };