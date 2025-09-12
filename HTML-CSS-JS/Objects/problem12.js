// Score >= 90 → "A"
// Score >= 80 and < 90 → "B"
// Score >= 70 and < 80 → "C"
// Score >= 60 and < 70 → "D"
// Score < 60 → "F"
let studentScores = {
    John: 85,
    Emma: 92,
    Sam: 67,
    Bob: 45
  };
  for(let keys in studentScores){
    if(studentScores[keys]>=90){
        console.log(keys," - ","A")
    }else if(studentScores[keys]>=80 && studentScores[keys]<90){
        console.log(keys," - ","B")
    }else if(studentScores[keys]>=70 && studentScores[keys]<80){
        console.log(keys," - ","C")
    }else if(studentScores[keys]>=60 && studentScores[keys]<70){
        console.log(keys," - ","D")
    }else if(studentScores[keys]<60){
        console.log(keys," - ","F")
    }
  }
  //output
// John - B
// Emma - A
// Sam - D
// Bob - F


  