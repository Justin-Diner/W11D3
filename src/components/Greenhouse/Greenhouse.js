import dayImage from './images/greenhouse-day.jpg';
import nightImage from './images/greenhouse-night.jpg';
import './Greenhouse.css';
import { useTheme } from '../../context/ThemeContext';
import { useEffect, useContext } from 'react';
import { ClimateContext } from '../../context/ClimateContext';
import LightSwitch from './LightSwitch';
import ClimateStats from './ClimateStats';

function Greenhouse() {
	const {themeName, setThemeName} = useTheme();
	const {temperature, setTemperature} = useContext(ClimateContext);
	const {desiredTemp, setDesiredTemp} = useContext(ClimateContext);
	const {humidity, setHumidity} = useContext(ClimateContext);
	const {desiredHumidity, setDesiredHumidity} = useContext(ClimateContext);
	

	useEffect(() => {
		const timer = setTimeout(() => {
			if (temperature < desiredTemp) {
				setTemperature((prevTemp) => prevTemp + 1)
			} if (temperature > desiredTemp) {
				setTemperature((prevTemp) => prevTemp - 1)
			}
			if (humidity < desiredHumidity) {
				setHumidity(prevHumidity => prevHumidity + 2)
			}
			if (humidity > desiredHumidity) {
				setHumidity(prevHumidity => prevHumidity - 2)
			}
		}, 1000);
		return () => {
			clearTimeout(timer);
		}
  }, [temperature, desiredTemp, humidity, desiredHumidity]);

  return (
    <section>
      <img  className='greenhouse-img'
            src= { themeName === "day" ? dayImage : nightImage}
            alt='greenhouse' 
      />
      <LightSwitch />
      <ClimateStats />
    </section>
  );
}

export default Greenhouse;