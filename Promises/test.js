setTimeout(()=>{
    console.log('Task 1');
    setTimeout(()=>{
        console.log('Task 2')
        setTimeout(()=>{
            console.log('Task 3')
        },1000)
    },1000)
},1000);


