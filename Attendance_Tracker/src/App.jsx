import { useState,useMemo,useRef } from 'react'
import './style.css'
function App() {
  let studentInfo={
  "Alice": false,
  "Bob": false,
  "Charlie": false
}
  const addstudent=useRef(null);
  const [isDisplay,setDisplay]=useState(false);
  const [Students,SetAttendance]=useState(studentInfo);

  const presentStudents=useMemo(()=>{
    return Object.entries(Students).filter(([_,value])=>value===true).map(([key,value])=>[key]=key);
  },[Students]);

  const handleClick=(e)=>{
    const student=e.target.id;
    const updateStudents={
      ...Students,
      [student]:!Students[student],
    }
    SetAttendance(updateStudents);
  }

  const Display=()=>{
    setDisplay(!isDisplay);
  }

  const resetAll=()=>{
    const objArr=Object.fromEntries(Object.entries(Students).map(([key,value])=>[key,false]));
    SetAttendance(objArr);
  }
  
  const handleAdd=()=>{
    const name=addstudent.current.value.trim();
    addstudent.current.value="";
    SetAttendance(prev=>({
      ...prev,
      [name]:false
    }))
  }
  return (
    <>
    <h1 className='header'>Student Attendance</h1>
      <div className='container'>
        <div className='student-container'>
          {
        (Object.keys(Students).length>0 )?(
          Object.entries(Students).map(([item,index])=>(
            <div  key={item} className="Studentinfo">
              <p>{item}</p>
              <input type='checkbox' id={item} checked={Students[item]} onChange={handleClick}></input>
            </div>
          ))
        ):(
          <p>Please Take the Attendance</p>
        )
      }
      <div className='btns'>
        <button onClick={Display} className='submitbtn'>Submit</button>
        <button onClick={resetAll} className='resetbtn'>Reset</button>
        </div>
        <div className='Addstudent'>
          <input ref={addstudent} placeholder='Add Student'></input>
          <button onClick={handleAdd} className='addbtn'>Add Student</button>
        </div>
      </div>

        {
        isDisplay?(
        <div className='ListofStudents'>
          <div className='present'>
            {<p >Present:</p>}
           {Object.entries(Students).filter(([_,value])=>(value===true)).map(([key,value])=>(
            <p>{key}</p>
           ))}
          </div>

           <div className='Absentees'>
            {<p >Absent:</p>}
           {Object.entries(Students).filter(([_,value])=>(value===false)).map(([key,value])=>(
            <p>{key}</p>
           ))}
           </div>
          </div>
        ):(
          <p className='error'></p>
        )
      }
    </div>
      
    </>
  )
}

export default App;

