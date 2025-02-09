
import MainContent from "./components/content/MainContent";
import SimpleData from "./components/content/SimpleData";
import Spreads from "./components/content/Spreads";
import Parameters from "./components/input/Parameters";
import React, {useEffect, useState} from 'react'; 


function App() {

    // set up model parameters
    const [model, setModel] = useState('BLACK-SCHOLES');
    const [strike, setStrike] = useState(100);
    const [spot, setSpot] = useState(102);
    const [price_low, setPriceLow] = useState(95);
    const [price_high, setPriceHigh] = useState(105);
    const [volatility, setVolatility] = useState(0.75);
    const [risk_free_rate, setRiskFreeRate] = useState(0.05);
    const [time_to_expiration, setTimeToExpiration] = useState(30);
    const [timesteps, setTimesteps] = useState(30);
    // const [type, setType] = useState('CALL');
    const [style, setStyle] = useState('AMERICAN');

    // calculations
    const [callPrice, setCallPrice] = useState(null);
    const [putPrice, setPutPrice] = useState(null);
    const [callSpread, setCallSpread] = useState(null);
    const [putSpread, setPutSpread] = useState(null);
    
    useEffect(() => {
      sendRequest();
  }, 
  [spot, strike, volatility, risk_free_rate, time_to_expiration, timesteps, model, style, price_low, price_high]);

  const sendRequest = async () => {
    try {
        const response = await fetch('http://0.0.0.0:18080/pricer_backend', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                model,
                spot, 
                strike,
                volatility,
                risk_free_rate,
                time_to_expiration,
                timesteps,
                price_low,
                price_high,
                style
            }),
        });

        if (!response.ok) {
            throw new Error('Response was not ok.');
        }

        const data = await response.json();
        setCallPrice(data.callPrice);
        setPutPrice(data.putPrice);
        setCallSpread(data.callSpread);
        setPutSpread(data.putSpread);
        console.log("Data: ", data)
    } catch (error) {
        console.error("Failed to fetch calculations from backend.")
    }
}

  return (

    // wrap entire thing in a div
    <div className="flex h-screen">

      <div className="w-1/5">
        <Parameters
              model={model}
              setModel={setModel}
              strike={strike}
              setStrike={setStrike}
              spot={spot}
              setSpot={setSpot}
              price_low={price_low}
              setPriceLow={setPriceLow}
              price_high={price_high}
              setPriceHigh={setPriceHigh}
              volatility={volatility}
              setVolatility={setVolatility}
              risk_free_rate={risk_free_rate}
              setRiskFreeRate={setRiskFreeRate}
              time_to_expiration={time_to_expiration}
              setTimeToExpiration={setTimeToExpiration}
              timesteps={timesteps}
              setTimesteps={setTimesteps}
              style={style}
              setStyle={setStyle}/>
      </div>

      <div className="w-4/5">
        <MainContent
          model={model}
          strike={strike}
          spot={spot}
          volatility={volatility}
          risk_free_rate={risk_free_rate}
          time_to_expiration={time_to_expiration}
          timesteps={timesteps}
          style={style}
          callPrice={callPrice}
          putPrice={putPrice}
          callSpread={callSpread}
          putSpread={putSpread}
        />

      </div>

    </div>
  );

}

export default App;
