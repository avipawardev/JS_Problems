import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [timer,setTimer] = useState(10);
    const [showQuestion,setShowQuestion] = useState(false);
    const [showTimer,setShowTimer] = useState(false);
    const [intervalId,setIntervalId] = useState(null);

    function startTimer(){
        setShowQuestion(true)
        setShowTimer(true)
        const id = setInterval(() => {
      setTimer(prev => prev - 1);
       }, 1000);
       setIntervalId(id);
    }

    useEffect(()=>{
        if(timer==0){
            clearInterval(intervalId);
            resetState()
        }
    },[timer])

    function handleYes(){
        clearInterval(intervalId);
        navigate('/data')
    }

    function handleNo(){
        clearInterval(intervalId);
        resetState();
    }

    function resetState(){
        setShowQuestion(false);
        setShowTimer(false);
        setIntervalId(null);
        setTimer(10);
    }

    const navigate = useNavigate()
  return (
    <div>
        {!showQuestion && <button onClick={startTimer}>Fetch Data</button>}

        {showQuestion && <>
        <p>Are you sure you want to fetch the data?</p>
        <button onClick={handleYes}>Yes</button>
        <button onClick={handleNo}>No</button>
        </>}

        {showTimer && (
        <h1 style={{ color: timer > 5 ? 'green' : 'red' }}>{timer}</h1>
      )}
    </div>
  )
}

export default Home