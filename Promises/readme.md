
Video Link: "https://drive.google.com/file/d/1Ngir6vt3Sc9xiR1hHhn9Of8pVr1rmJ-M/view?usp=sharing"




========> here i am explains the Promises with Code

5mins : What is promises and why do we need it

5mins : How to execute a promise and handle it if it resolves , rejects or fails

let firstPromise = new Promise((resolve,reject)=>{
    let flag = false;

    setTimeout(()=>{
        if(flag){
            resolve('Promise is Resolve!')
        }else{
            reject('Promise is Rejected!')
        }
    })
});

firstPromise
.then((message)=>{
    console.log('Success: ',message)
})
.catch((error)=>{
    console.log('Error',error)
})
.finally(()=>{
    console.log('no matter what')
});

5min : What is a callback hell and how does promises help here .

setTimeout(()=>{
    console.log('Task 1');
    setTimeout(()=>{
        console.log('Task 2')
        setTimeout(()=>{
            console.log('Task 3')
        },1000)
    },1000)
},1000);

