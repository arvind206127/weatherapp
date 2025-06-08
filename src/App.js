
import { useState } from 'react';
import './App.css';




function App() {

  let [city,setCity]=useState("")
  let [wdetels,setWdetels]=useState()
  let [isloding,setIsloding]=useState(false)
  let getData=(event)=>{
    setIsloding(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
    .then((res)=>res.json())
    .then((finelResponse)=>{
      if(finelResponse.cod==="404"){
        setWdetels(undefined)
      }
      else{

        setWdetels(finelResponse)
      }
      setIsloding(false)
      
    })
    
    event.preventDefault()
    setCity("")
  }  




  return (
    <div className='w-[100%] h-[100vh] bg-[#47b0b4]'>
      <div className='max-w-[1320px] mx-auto'>
        <h1 className=' w-[100%] text-[40px] font-bold py-[50px] text-white'>Simple weather app</h1>
         
         <form onSubmit={getData}>
          <input type='text'value={city} onChange={(e)=>setCity(e.target.value)} className='w-[300px] h-[40px] pl-3' placeholder='City Name'/><button  className='px-[9px] mx-[5px] py-[8px] bg-[#165869] text-[white]'>Submit</button>

         </form>
         <div className='w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] relative'>
           
           <img src='https://i.gifer.com/ZKZg.gif' width={100} className={`absolute left-[40%] ${isloding?'':'hidden'}`}/>

          {wdetels!==undefined
          ?
          <>
          <h3 className='font-bold text-[30px] '>{wdetels.name} <span className='bg-yellow-500 px-2'>{wdetels.sys.country}</span></h3>
          <h2 className='font-bold text-[40px]'>{wdetels.main.temp}</h2>
          <img src={`https://openweathermap.org/img/w/${wdetels.weather[0].icon}.png`} alt='Weather icon'/>
          <p>{wdetels.weather[0].description}</p>
          </>
          :
          "No Data"
          }

         </div>
      </div>
    </div>

  );
}

export default App;
