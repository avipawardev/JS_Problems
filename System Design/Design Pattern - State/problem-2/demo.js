const { TrafficLight } = require('./trafficLight');

// Demo usage
const trafficLight = new TrafficLight();

console.log("=== Traffic Light Demo ===");
console.log("Cycling through states (Red → Green → Yellow → Red):\n");

// Show initial state and cycle through 8 transitions
for (let i = 0; i < 8; i++) {
  trafficLight.display();
  trafficLight.next();
}