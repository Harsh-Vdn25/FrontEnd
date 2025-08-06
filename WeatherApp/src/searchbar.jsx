import {useState,useRef} from 'react';
import './style.css'
const Searchbar = ({onSearch}) => {
    const [input,setInput]=useState("");
    const handleClick=()=>{
        onSearch(input);
    }
    return (
        <>
         <div className='inputfield'>
        <input  className='input' onChange={(e)=>setInput(e.target.value)} placeholder='Search City...'></input>
        <button className='searchbtn' onClick={handleClick}>Search</button>
      </div>
        </>
     );
}
export default Searchbar;