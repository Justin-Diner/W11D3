import ReactSlider from "react-slider";
import "./Hygrometer.css";
import { useContext, useEffect} from 'react';
import { ClimateContext } from "../../context/ClimateContext";

function Hygrometer() {
	const {humidity, setHumidity} = useContext(ClimateContext);
	const {desiredHumidity, setDesiredHumidity} = useContext(ClimateContext);

  useEffect(() => {
    const timer = setTimeout(()=> {
      if(humidity < desiredHumidity) {
        if (desiredHumidity - humidity  === 1) {
          setHumidity(prevHumidity => prevHumidity + 1)
        }
        else {
          setHumidity(prevHumidity => prevHumidity + 2)
        }
      }
      else if (humidity > desiredHumidity) {
        if (humidity - desiredHumidity === 1 ) {
          setHumidity(prevHumidity => prevHumidity - 1)
        }
        else {
          setHumidity(prevHumidity => prevHumidity - 2)
        }
      }
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [humidity, desiredHumidity])

  return (
    <section>
      <h2>Hygrometer</h2>
      <div className="actual-humid">Actual Humidity: {humidity}%</div>
      <ReactSlider
        value={desiredHumidity}
        onAfterChange={(val) => {setDesiredHumidity(val)}}
        className="hygrometer-slider"
        thumbClassName="hygrometer-thumb"
        trackClassName="hygrometer-track"
        ariaLabel={"Hygrometer"}
        orientation="vertical"
        min={0}
        max={100}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        renderTrack={(props, state) => (
          <div {...props} index={state.index}></div>
        )}
        invert
        pearling
        minDistance={1}
      />
    </section>
  );
}

export default Hygrometer;