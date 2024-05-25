
import React from 'react';
import styles from './CloudyIcon.module.css'
import cloudy from './icons/cloudy.png'
import snowFall from './icons/snowfall.png'
import rain from './icons/rain.png'
import clearSky from './icons/clear-sky.png'
import defaultWeather from './icons/weather.png'
import thundrStrom from './icons/thunderstorm-9.svg'



const CloudyIcon = (props) => {
  const { iconType } = props;

  return (
    <div>
      {/* Your cloudy icon JSX */}
      {iconType === 'cloudy' && <img className= {styles.image} src={cloudy}  alt="Cloudy" />}
      {iconType === 'snowfall' && <img className= {styles.image} src={snowFall} alt="Snowfall" />}
      {iconType === 'rain' && <img className= {styles.image} src={rain} alt="Rain" />}
      {iconType === 'clearSky' && <img className= {styles.image} src={clearSky} alt="ClearSky" />}
      {iconType === 'weather' && <img className= {styles.image} src={defaultWeather} alt="Weather" />}
      {iconType === 'thunderstorm' && <img className= {styles.image} src={thundrStrom} alt="ThunderStorm" />}
    </div>
  );
};

export default CloudyIcon;
