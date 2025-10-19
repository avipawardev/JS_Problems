const { MediaPlayer } = require('./mediaPlayer');

// Demo usage
const player = new MediaPlayer();

console.log("=== Media Player Demo ===");

console.log("\n1. Initial state (stopped):");
player.pause(); // Should show error
player.stop();  // Already stopped

console.log("\n2. Play from stopped:");
player.play();  // Start playing

console.log("\n3. Pause while playing:");
player.pause(); // Pause
player.play();  // Resume

console.log("\n4. Stop while playing:");
player.stop();  // Stop

console.log("\n5. Play again from stopped:");
player.play();  // Play from beginning