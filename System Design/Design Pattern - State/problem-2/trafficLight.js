// State interface
class LightState {
  next(trafficLight) {
    throw new Error("Method not implemented");
  }
  
  getColor() {
    throw new Error("Method not implemented");
  }
  
  getMessage() {
    throw new Error("Method not implemented");
  }
}

// Concrete States
class RedState extends LightState {
  next(trafficLight) {
    trafficLight.setState(trafficLight.getGreenState());
  }
  
  getColor() {
    return "Red";
  }
  
  getMessage() {
    return "Vehicles must stop";
  }
}

class GreenState extends LightState {
  next(trafficLight) {
    trafficLight.setState(trafficLight.getYellowState());
  }
  
  getColor() {
    return "Green";
  }
  
  getMessage() {
    return "Vehicles can move";
  }
}

class YellowState extends LightState {
  next(trafficLight) {
    trafficLight.setState(trafficLight.getRedState());
  }
  
  getColor() {
    return "Yellow";
  }
  
  getMessage() {
    return "Vehicles should slow down";
  }
}

// Context
class TrafficLight {
  constructor() {
    this.redState = new RedState();
    this.greenState = new GreenState();
    this.yellowState = new YellowState();
    this.currentState = this.redState;
  }
  
  setState(state) {
    this.currentState = state;
  }
  
  getRedState() {
    return this.redState;
  }
  
  getGreenState() {
    return this.greenState;
  }
  
  getYellowState() {
    return this.yellowState;
  }
  
  next() {
    this.currentState.next(this);
  }
  
  getCurrentColor() {
    return this.currentState.getColor();
  }
  
  getCurrentMessage() {
    return this.currentState.getMessage();
  }
  
  display() {
    console.log(`Light: ${this.getCurrentColor()} - ${this.getCurrentMessage()}`);
  }
}

module.exports = { TrafficLight };