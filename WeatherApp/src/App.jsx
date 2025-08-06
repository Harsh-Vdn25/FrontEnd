import { useState,useEffect} from 'react'
import Searchbar from './searchbar'
import './style.css'
function App() {
  const [city,setCity]=useState('Chennai');
  const [data,setData]=useState({});  

  useEffect(()=>{
    fetchAPI();
  },[city,setCity]);

  const  fetchAPI=async()=>{
    try{
      const API=`https://api.weatherapi.com/v1/current.json?key=8e81cdfcfe324e7bb0250409252007&q=${city}&aqi=no`;
      const res=await fetch(API);
      const resdata=await res.json();
      setData(resdata);
    }catch{
      alert("Sorry couldn't fetch the climate!");
    }
  }
  
  const handleSearch=(inputCity)=>{
    setCity(inputCity);
  }
  return (
    <>
      <h1 style={{textAlign:'center',color:'white',fontWeight:'700'}}>Weather App</h1>
      {
        (data && data.current&&data.location)?(
          <div className='container'>
        <Searchbar onSearch={handleSearch}></Searchbar>

      <div className='climate-info'>
        <div className='location-info'>
        <img src='https://www.iconpacks.net/icons/2/free-location-icon-2952-thumb.png'></img>
        <p>{data.location.name},{data.location.region}</p>
        </div>

        <h1>{data.current.temp_c} C</h1>
        <p>Humidity:{data.current.humidity}</p>

        <div className='weather-info'>
          <p id='weather'>{data.current.condition.text}</p>
          <img id='weather-icon' src={data.current.condition.icon}></img>
        </div>

        <p>{data.location.localtime}</p>
      </div>
      </div>
        ):(
          <div className='loading'>
            <p>Loading Weather data....</p>
          </div>
        )
      }
    </>
  )
}

export default App
