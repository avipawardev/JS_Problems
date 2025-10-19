// State interface
class State {
  insertCoin(machine) {
    throw new Error("Method not implemented");
  }
  
  makeSelection(machine) {
    throw new Error("Method not implemented");
  }
  
  dispense(machine) {
    throw new Error("Method not implemented");
  }
}

// Concrete States
class IdleState extends State {
  insertCoin(machine) {
    console.log("Coin inserted. Processing...");
    machine.setState(machine.getProcessingState());
  }
  
  makeSelection(machine) {
    console.log("Please insert coin first");
  }
  
  dispense(machine) {
    console.log("Please insert coin first");
  }
}

class ProcessingState extends State {
  insertCoin(machine) {
    console.log("Coin already inserted");
  }
  
  makeSelection(machine) {
    console.log("Selection made. Dispensing...");
    machine.setState(machine.getDispensingState());
  }
  
  dispense(machine) {
    console.log("Please make a selection first");
  }
}

class DispensingState extends State {
  insertCoin(machine) {
    console.log("Please wait, dispensing in progress");
  }
  
  makeSelection(machine) {
    console.log("Please wait, dispensing in progress");
  }
  
  dispense(machine) {
    console.log("Item dispensed. Returning to idle...");
    machine.setState(machine.getIdleState());
  }
}

// Context
class VendingMachine {
  constructor() {
    this.idleState = new IdleState();
    this.processingState = new ProcessingState();
    this.dispensingState = new DispensingState();
    this.currentState = this.idleState;
  }
  
  setState(state) {
    this.currentState = state;
  }
  
  getIdleState() {
    return this.idleState;
  }
  
  getProcessingState() {
    return this.processingState;
  }
  
  getDispensingState() {
    return this.dispensingState;
  }
  
  insertCoin() {
    this.currentState.insertCoin(this);
  }
  
  makeSelection() {
    this.currentState.makeSelection(this);
  }
  
  dispense() {
    this.currentState.dispense(this);
  }
}

module.exports = { VendingMachine };