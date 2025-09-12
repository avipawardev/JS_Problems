// If the user is "admin" and is active, print "Admin Access Granted!".
// If the user is "admin" and is not active, print "Admin Access Revoked".
// If the user is "user" and is active, print "User Access Granted!".
// If the user is "user" and is not active, print "User Access Revoked".
// For any other role, print "Access Denied".

// let user = { name: "Alice", role: "admin", active: false };//"Admin Access Revoked"
let user = { name: "Bob", role: "user", active: true }; //"User Access Granted!"


    if(user['role'] == 'admin' && user['active']==true){
        console.log("Admin Access Granted!")
    }else if(user['role'] == 'admin' && user['active']==false){
        console.log("Admin Access Revoked")
    }else if(user['role'] == 'user' && user['active']==true){
        console.log("User Access Granted!")
    }else if(user['role'] == 'user' && user['active']==false){
        console.log("User Access Revoked")
    }else{
        console.log("Access Denied")
    }