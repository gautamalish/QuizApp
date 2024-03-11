import React from "react"
import { data } from "../assets/data"
export default function Quiz(){
    const [index,setIndex]=React.useState(0)
    const [question,setQuestion]=React.useState(data[index])
    const [lock,setLock]=React.useState(false)
    const [score,setScore]=React.useState(0)
    let option1=React.useRef(null)
    let option2=React.useRef(null)
    let option3=React.useRef(null)
    let option4=React.useRef(null)
    let optionArray=[option1,option2,option3,option4]
    const [result,setResult]=React.useState(false)
    const checkAnswer=(e,ans)=>{
        if(lock==false){
            if(question.ans===ans){
                e.target.classList.add("correct")
                setLock(true)
                setScore(prevScore=>prevScore+1)
            }
            else{
                e.target.classList.add("incorrect")
                setLock(true)
                optionArray[question.ans-1].current.classList.add("correct")
            }
        }
        
    }
    function handleNext(){
        if(lock==true){
            if(index===data.length-1){
                setResult(true)
                return 0;
            }
            setIndex(prevIndex=>++prevIndex)
            setQuestion(data[index+1])
            setLock(false)
            optionArray.map(option=>{
                option.current.classList.remove("incorrect")
                option.current.classList.remove("correct")
                return null;
            })
        }
    }
    function reset(){
        setIndex(0)
        setQuestion(data[0])
        setScore(0)
        setLock(false)
        setResult(false)
    }
    return(
        <div className="container">
            <h1>Quiz App</h1>
            <hr />
            {result?<></>:<>
            <h2>{index+1}. {question.question}</h2>
            <ul>
                <li ref={option1} onClick={(e)=>checkAnswer(e,1)}>{question.option1}</li>
                <li ref={option2} onClick={(e)=>checkAnswer(e,2)}>{question.option2}</li>
                <li ref={option3} onClick={(e)=>checkAnswer(e,3)}>{question.option3}</li>
                <li ref={option4} onClick={(e)=>checkAnswer(e,4)}>{question.option4}</li>
            </ul>
            <button onClick={handleNext}>Next</button>
            <div className="index">{index+1} of {data.length} questions</div>
            </>}
            {result?<>
                <h2>You Scored {score} out of {data.length}</h2>
                <button onClick={reset}>Reset</button>
            </>:<></>}
        </div>
    )
}