const { VendingMachine } = require('./vendingMachine');

// Demo usage
const machine = new VendingMachine();

console.log("=== Vending Machine Demo ===");
console.log("\n1. Normal flow:");
machine.insertCoin();     // Idle -> Processing
machine.makeSelection();  // Processing -> Dispensing
machine.dispense();       // Dispensing -> Idle

console.log("\n2. Invalid operations:");
machine.makeSelection();  // Should show error (no coin)
machine.dispense();       // Should show error (no coin)

console.log("\n3. Another normal flow:");
machine.insertCoin();     // Idle -> Processing
machine.insertCoin();     // Should show "already inserted"
machine.makeSelection();  // Processing -> Dispensing
machine.insertCoin();     // Should show "dispensing in progress"
machine.dispense();       // Dispensing -> Idle