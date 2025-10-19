const { ATM } = require('./atm');

// Demo usage
const atm = new ATM();

console.log("=== ATM Demo - Correct Flow ===");
console.log("\n1. Complete transaction flow:");
atm.insertCard();    // Idle → CardInserted
atm.enterPIN();      // CardInserted → Authenticated  
atm.withdrawCash();  // Authenticated → Dispensing
atm.dispenseCash();  // Dispensing → Idle

console.log("\n2. Invalid operations:");
atm.enterPIN();      // Should show error (back to idle)
atm.withdrawCash();  // Should show error (no card)

console.log("\n3. Another complete flow:");
atm.insertCard();    // Idle → CardInserted
atm.insertCard();    // Should show "already inserted"
atm.enterPIN();      // CardInserted → Authenticated
atm.enterPIN();      // Should show "already authenticated"
atm.withdrawCash();  // Authenticated → Dispensing
atm.dispenseCash();  // Dispensing → Idle