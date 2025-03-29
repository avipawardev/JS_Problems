function interval(){
    let timer = setInterval(()=>{
        console.log('Loading...')
    },1000);

    setTimeout(()=>{
        clearInterval(timer);
        console.log('Loaded successfully!')
    },5000)
};

interval()