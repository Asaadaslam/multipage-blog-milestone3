"use client"
import React, {useEffect , useState} from "react"
import Link from "next/link"
import { headers } from "next/headers";

export default function Navbar (){

const [currentDateTime, setCurrentDateTime] = useState(``);
useEffect (() => {
  const updateDateTime  = () => {

    const now = new Date() ;
    const options : Intl.DateTimeFormatOptions = { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    } 

    setCurrentDateTime(now.toLocaleDateString("en-US", options) + '' + now.toLocaleTimeString ("en-US" , {hour12 :false})
  );
  };
  updateDateTime();
  const interValId = setInterval(updateDateTime ,1000);
  return () => clearInterval(interValId)
}); 



  return (
<header className="text-gray-400 body-font shadow-lg">
  <div className="bg-black ontainer mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center justify-center">
    <div className="text-white text-center">
      <span>{currentDateTime}</span>
    </div>
 



    </div>
  </header>
  )
}  