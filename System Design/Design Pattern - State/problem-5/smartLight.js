// State interface
class LightState {
  turnOn(light) {
    console.log("Invalid operation in current state");
  }
  
  turnOff(light) {
    console.log("Invalid operation in current state");
  }
  
  motionDetected(light) {
    console.log("Invalid operation in current state");
  }
  
  adjustBrightness(light, isDaytime) {
    console.log("Invalid operation in current state");
  }
}

// Concrete States
class OffState extends LightState {
  turnOn(light) {
    console.log("Light turned on manually");
    light.setState(light.getOnState());
  }
  
  motionDetected(light) {
    console.log("Motion detected - Light turned on automatically");
    light.setState(light.getMotionDetectionState());
  }
}

class OnState extends LightState {
  turnOff(light) {
    console.log("Light turned off");
    light.setState(light.getOffState());
  }
  
  adjustBrightness(light, isDaytime) {
    console.log(`Adjusting brightness - ${isDaytime ? 'Reducing for daytime' : 'Increasing for nighttime'}`);
    light.setState(light.getBrightnessAdjustmentState());
  }
  
  motionDetected(light) {
    console.log("Light already on - switching to motion detection mode");
    light.setState(light.getMotionDetectionState());
  }
}

class MotionDetectionState extends LightState {
  turnOff(light) {
    console.log("Light turned off - motion detection disabled");
    light.setState(light.getOffState());
  }
  
  turnOn(light) {
    console.log("Switching to manual mode");
    light.setState(light.getOnState());
  }
  
  adjustBrightness(light, isDaytime) {
    console.log(`Motion mode - ${isDaytime ? 'Reducing brightness for daytime' : 'Increasing brightness for nighttime'}`);
    light.setState(light.getBrightnessAdjustmentState());
  }
}

class BrightnessAdjustmentState extends LightState {
  turnOff(light) {
    console.log("Light turned off");
    light.setState(light.getOffState());
  }
  
  turnOn(light) {
    console.log("Switching to manual mode");
    light.setState(light.getOnState());
  }
  
  motionDetected(light) {
    console.log("Motion detected - switching to motion detection mode");
    light.setState(light.getMotionDetectionState());
  }
}

// Context
class SmartLight {
  constructor() {
    this.offState = new OffState();
    this.onState = new OnState();
    this.motionDetectionState = new MotionDetectionState();
    this.brightnessAdjustmentState = new BrightnessAdjustmentState();
    this.currentState = this.offState;
  }
  
  setState(state) {
    this.currentState = state;
  }
  
  getOffState() {
    return this.offState;
  }
  
  getOnState() {
    return this.onState;
  }
  
  getMotionDetectionState() {
    return this.motionDetectionState;
  }
  
  getBrightnessAdjustmentState() {
    return this.brightnessAdjustmentState;
  }
  
  turnOn() {
    this.currentState.turnOn(this);
  }
  
  turnOff() {
    this.currentState.turnOff(this);
  }
  
  motionDetected() {
    this.currentState.motionDetected(this);
  }
  
  adjustBrightness(isDaytime = false) {
    this.currentState.adjustBrightness(this, isDaytime);
  }
}

module.exports = { SmartLight };