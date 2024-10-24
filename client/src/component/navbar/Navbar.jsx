import React, { useContext, useEffect, useState } from 'react'
import '../../styles/Navbar.css'
import { EmployeeContext } from '../../context/EmployeeContext'
import { BsFullscreen } from "react-icons/bs";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import heyramlogo from '../../images/heyramlogo.png'
function Navbar() {
  const { employeeData } = useContext(EmployeeContext)
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Function to enter fullscreen mode
  const openFullscreen = () => {
    const element = document.documentElement; // Get the full document
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
      element.msRequestFullscreen();
    }
    setIsFullScreen(true);
  };

  // Function to exit fullscreen mode
  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
    setIsFullScreen(false);
  };

  // Function to toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!isFullScreen) {
      openFullscreen();
    } else {
      closeFullscreen();
    }
  };
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
    return `${hours}:${minutes} ${ampm}`;
  };
  
  useEffect(() => {
    // Update the timer every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  // Get Indian time by adjusting current time based on Indian TimeZone (UTC+5:30)
  const indianTime = new Date(currentTime.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));

  return (
    <div className='nav_main'> 
    <div className='nav_companyname'>
      <div>HEYRAM INFRASTRUCTURE</div>
    </div>
    
    <div className='nav_Fullscreen'>
      {isFullScreen?(<AiOutlineFullscreenExit onClick={toggleFullscreen}/>):<BsFullscreen  onClick={toggleFullscreen} />}
      
      
    </div>

    <div className='nav_profile'>
      <div className='nav_profile1'>
      {employeeData.name? employeeData.name[0]:"U"}
      </div>
      <div className='nav_profile2'>
      {employeeData.name? employeeData.name:"USER"}
      </div>

    </div>

      <div className='nav_timer'>
      {formatTime(indianTime)}
      </div>

    </div>
  )
}

export default Navbar