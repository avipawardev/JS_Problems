// State interface
class ATMState {
  insertCard(atm) {
    console.log("Invalid operation in current state");
  }
  
  enterPIN(atm) {
    console.log("Invalid operation in current state");
  }
  
  withdrawCash(atm) {
    console.log("Invalid operation in current state");
  }
  
  dispenseCash(atm) {
    console.log("Invalid operation in current state");
  }
}

// Concrete States
class IdleState extends ATMState {
  insertCard(atm) {
    console.log("Card inserted. Please enter PIN");
    atm.setState(atm.getCardInsertedState());
  }
}

class CardInsertedState extends ATMState {
  enterPIN(atm) {
    console.log("PIN verified. Authentication successful");
    atm.setState(atm.getAuthenticatedState());
  }
  
  insertCard(atm) {
    console.log("Card already inserted");
  }
}

class AuthenticatedState extends ATMState {
  withdrawCash(atm) {
    console.log("Processing withdrawal. Dispensing cash...");
    atm.setState(atm.getDispensingState());
  }
  
  enterPIN(atm) {
    console.log("Already authenticated");
  }
}

class DispensingState extends ATMState {
  dispenseCash(atm) {
    console.log("Cash dispensed. Transaction complete");
    atm.setState(atm.getIdleState());
  }
}

// Context
class ATM {
  constructor() {
    this.idleState = new IdleState();
    this.cardInsertedState = new CardInsertedState();
    this.authenticatedState = new AuthenticatedState();
    this.dispensingState = new DispensingState();
    this.currentState = this.idleState;
  }
  
  setState(state) {
    this.currentState = state;
  }
  
  getIdleState() {
    return this.idleState;
  }
  
  getCardInsertedState() {
    return this.cardInsertedState;
  }
  
  getAuthenticatedState() {
    return this.authenticatedState;
  }
  
  getDispensingState() {
    return this.dispensingState;
  }
  
  insertCard() {
    this.currentState.insertCard(this);
  }
  
  enterPIN() {
    this.currentState.enterPIN(this);
  }
  
  withdrawCash() {
    this.currentState.withdrawCash(this);
  }
  
  dispenseCash() {
    this.currentState.dispenseCash(this);
  }
}

module.exports = { ATM };