function createScoreManager() {
  let students = [];
  return {
    addScore: function (name, score) {
      students.push(name, score);
    },
    getScore: function () {
      return students;
    },
    getSortedScore: function () {
      return [...students].sort((a, b) => b.score - a.score);
    },
    getFilteredScore: function (ave) {
        return students.filter(student=>student.score>ave)
    },
    getAverageScore: function () {
        let total = students.reduce((sum,student)=>sum+student.score,0);
        return total/students.length;
    },
  };
}


const scoreManager = createScoreManager();

scoreManager.addScore("Alice", 85);
scoreManager.addScore("Bob", 72);
scoreManager.addScore("Charlie", 90);
scoreManager.addScore("David", 58);

console.log(scoreManager.getScore());
console.log(scoreManager.getSortedScore());
console.log(scoreManager.getFilteredScore(60));
console.log(scoreManager.getAverageScore());

export default createScoreManager;