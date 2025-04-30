import React, { useEffect, useState } from 'react'
import Questions from './Questions'
import { MoveNextQuestion, MovePrevQuestion } from '../Hooks/fetchQuestions'
import {PushAnswer} from '../Hooks/setResult'

// redux store import
import {useSelector,useDispatch} from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function Quiz() {

  const [check, setChecked] = useState(undefined)

  const result = useSelector(state => state.result.result)
  const {queue, trace} = useSelector(state => state.questions)
  const dispatch = useDispatch()
  // useEffect(()=>{
  //   console.log(result);
    
  // })

  function onPrev(){
    // console.log("On prev click");  
    if (trace>0) {
      
      // update the trace value
      dispatch(MovePrevQuestion())
    }
  }
  function onNext(){
    // console.log("On next click");
    if (trace < queue.length) {
      
      // update the trace value
      dispatch(MoveNextQuestion())
      if(result.length<=trace){
        dispatch(PushAnswer(check))
      }
    }

    // reset the value of checked variable
    setChecked(undefined)
  }
  function onChecked(check){
    console.log(check);
    setChecked(check);
  }

  // finsih exam after last question
  if (result.length && result.length >= queue.length) {
    return <Navigate to= {'/result'} replace = "true"></Navigate>
  }

  return (
    <div className='container'>
      <h1 className='title text-light'>Quiz Application</h1>
      {/* Display Questions */}
        <Questions onChecked={onChecked} />
      <div className='grid'>
        {trace>0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>}
        <button className='btn next' onClick={onNext}>Next</button>
      </div>
    </div>

  )
}
