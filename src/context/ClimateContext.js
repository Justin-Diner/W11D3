import { createContext, useState } from "react";

// Temperature has a default value of 50 degrees
// Humidity has a default value of 40%

export const ClimateContext = createContext();
export const ClimateProvider = (props) => {
  const [temperature, setTemperature] = useState(50)
  return (
    <ClimateContext.Provider value={{temperature, setTemperature}}>
      {props.children}
    </ClimateContext.Provider>
  )
}