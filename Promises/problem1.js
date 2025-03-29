function timer(duration,onComplete){
    setTimeout(function() {
      onComplete(`Timer of ${duration} ms finished`)
    }, duration);
  }
  
  function onComplete(message){
    console.log(message)
  }
  
  timer(1000,onComplete)