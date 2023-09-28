import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import React, { useEffect } from 'react'
import GetInTouch from '../components/GetInTouch';
import GetStarted from '../components/GetStarted';
import Header from '../components/Header';
import Navbar from './../components/Navbar';
import Footer from './../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import "../components/Publics/css/index.css"

const Home = () => {
  const [time, setTime] = React.useState(new Date());

  // Function to update the time every second
  React.useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      setTime(currentTime);
      
      // Update the document title with the current time
      document.title = `Clock - ${currentTime.toLocaleTimeString()}`;
    }, 1000);

    // Clear the interval on component unmount
    return () => {
      clearInterval(interval);
      // Reset the document title when the component unmounts
      document.title = 'Clock';
    };
  }, []);

  return (
    <div className="center-container">
      <h1>Welcome to the Clock Page</h1>
      <div className="clock-container">
        <Clock value={time} />
      </div>
    </div>
  );
}


export default Home