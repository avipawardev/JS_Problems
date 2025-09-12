
// let person = { role: "manager", experience: 4, active: true, department: "Marketing" };
let person = { role: "admin", experience: 7, active: true, department: "IT" };

if(person['active'] && person['role']=='admin' &&  person['experience']>5 &&  person['department']=='IT'){
console.log("Full IT Admin Access");
}else if(person['active']&&  person['role']=='admin' &&  person['experience']<=5){
    console.log("Limited Admin Access");
    }else if(!person['active']){
        console.log("Admin Access Revoked")
    }else{
        console.log("Invalid Role")
    }
    //Manager
    if(person['role']=='manager' && person['active']){
        console.log("Manager Access Revoked")
    }else if(person['active'] && person['role']=='manager' &&  person['experience']>3 &&  person['department']=='Sales'){
        console.log("Full Sales Manager Access");
        }else if(person['active'] && person['role']=='manager' &&  person['experience']>3){
            console.log("Full Manager Access");
            }else if(person['active'] && person['role']=='manager' &&  person['experience']>=3){
                console.log("Limited Manager Access");
         }else{
            console.log("Invalid Role")
         }

  //user
  if(person['role']=='user' && person['active']||person['department']=='Support'){
    console.log("Priority Support Access")
}else if(person['role']=='user' && person['active']){
    console.log("User Access")
}else if(person['role']=='user' && !person['active']){
    console.log("User Access Revoked")
}else{
    console.log("Invalid Role")
} 

// Output: "Full IT Admin Access"