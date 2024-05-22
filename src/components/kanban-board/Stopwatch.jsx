/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react"

const Stopwatch = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalRef = useRef(null)
    // const timeElapsed = useRef(null); 
    // timeElapsed.current = 0; 

    useEffect(() => {
        
        if(isRunning){
            intervalRef.current = setInterval(() => {
                setElapsedTime(prev => prev + 10);  
            }, 10)
        }
        return () => {
            clearInterval(intervalRef.current); 
        }
    }, [isRunning])
    
    
    const handleStart = () => {
        if(!isRunning) setIsRunning(true)
    }
    
    const handleStop = () => {
        if(isRunning) setIsRunning(false)
    }

    const handleReset = () => {
        clearInterval(intervalRef.current)
        setIsRunning(false)
        setElapsedTime(0); 
    }
    // console.log(Math.floor(elapsedTime % 1000));

    const milliseconds = `0${Math.floor(elapsedTime % 1000)}`.slice(-3, -1); 
    const seconds = `0${Math.floor(elapsedTime / 1000 % 60)}`.slice(-2); 
    const minutes = `0${Math.floor(elapsedTime / 1000 / 60 % 60)}`.slice(-2); 
    const hours = `0${Math.floor(elapsedTime / 1000 / 60 /60 % 60)}`.slice(-2); 

  return (
    <div className="flex gap-3 items-center justify-center">
        <p className="flex-grow-0 w-[6rem]">
            {/* <span>{elapsedTime}</span> */}
            <span className="font-semibold">{hours}:</span>
            <span className="font-semibold">{minutes}:</span>
            <span className="font-semibold">{seconds}:</span>
            <span className="text-xs">{milliseconds}</span>
        </p>
        { isRunning ? 
            <button className="btn btn-sm btn-error border border-b" onClick={handleStop}>Stop</button>
        :
            <button className="border border-black/10 btn btn-sm hover:btn-primary" onClick={handleStart}>Start</button>
        }
        <button className="border border-black/10 btn btn-sm hover:btn-neutral hover:text-white hover:bg-[#003356]" disabled={elapsedTime === 0} onClick={handleReset}>Reset</button>
    </div>
  )
}

export default Stopwatch