import scoreManager from './scoreManager' 

scoreManager = createScoreManager();

scoreManager.addScore("Alice", 85);
scoreManager.addScore("Bob", 72);
scoreManager.addScore("Charlie", 90);
scoreManager.addScore("David", 58);

console.log(scoreManager.getScore());
console.log(scoreManager.getSortedScore());
console.log(scoreManager.getFilteredScore(60));
console.log(scoreManager.getAverageScore());

