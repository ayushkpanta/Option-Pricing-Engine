import React, {useState} from 'react'; // need useState to communicate

function Parameters() {

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
    const [type, setType] = useState('CALL');
    const [style, setStyle] = useState('AMERICAN');

    // handle updates
    const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => setModel(e.target.value);

    const handleStrikeChange = (e: React.ChangeEvent<HTMLInputElement>) => setStrike(Number(e.target.value));

    const handleSpotChange = (e: React.ChangeEvent<HTMLInputElement>) => setSpot(Number(e.target.value));

    const handlePriceLowChange = (e: React.ChangeEvent<HTMLInputElement>) => setPriceLow(Number(e.target.value));

    const handlePriceHighChange = (e: React.ChangeEvent<HTMLInputElement>) => setPriceHigh(Number(e.target.value));

    const handlVolatilityChange = (e: React.ChangeEvent<HTMLInputElement>) => setVolatility(Number(e.target.value));

    const handleRiskFreeRateChange = (e: React.ChangeEvent<HTMLInputElement>) => setRiskFreeRate(Number(e.target.value));

    const handleTimeToExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => setTimeToExpiration(Number(e.target.value));

    const handleTimestepsChange = (e: React.ChangeEvent<HTMLInputElement>) => setTimesteps(Number(e.target.value));

    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => setType(e.target.value);

    const handleStyleChange = (e: React.ChangeEvent<HTMLInputElement>) => setStyle(e.target.value);


    // JSX: JavaScript XML (conversion)
    return (
        <div className="flex flex-col h-screen bg-gray-200 p-4 shadow-lg">

            <div className="my-2">
                <h2 className="font-bold">Enter Parameters</h2>
            </div>
           
            <div className="my-2">
                <label>Strike Price (X)</label>
                <div>
                    <input
                        id='strike'
                        type='number'
                        value={strike}
                        onChange={handleStrikeChange}
                        min={0.5}
                        max={200}
                        step={1}
                    />
                </div>
            </div>

            <div className="my-2">
                <label>Spot Price (S)</label>
                <div>
                    <input
                        id='spot'
                        type='number'
                        value={spot}
                        onChange={handleSpotChange}
                        min={0.5}
                        max={200}
                        step={1}
                    />
                </div>
            </div>

            <div className="my-2">
                <label>Annualized Volatility (σ)</label>
                <div>
                    <input
                        id='volatility'
                        type='number'
                        value={volatility}
                        onChange={handlVolatilityChange}
                        min={0.5}
                        max={200}
                        step={1}
                    />
                </div>
            </div>

            <div className="my-2">
                <label>Annualized Risk Free Interest Rate (r)</label>
                <div>
                    <input
                        id='risk_free_rate'
                        type='number'
                        value={risk_free_rate}
                        onChange={handleRiskFreeRateChange}
                        min={0.5}
                        max={200}
                        step={1}
                    />
                </div>
            </div>

            <div className="my-2">
                <label>Time To Expiration in Years (T)</label>
                <div>
                    <input
                        id='time_to_expiration'
                        type='number'
                        value={time_to_expiration}
                        onChange={handleTimeToExpirationChange}
                        min={0.5}
                        max={200}
                        step={1}
                    />
                </div>
            </div>

            <div className="my-2">
                <label>Timesteps (N)</label>
                <div>
                    <input
                        id='timesteps'
                        type='number'
                        value={timesteps}
                        onChange={handleTimestepsChange}
                        min={0.5}
                        max={200}
                        step={1}
                    />
                </div>
            </div>

            <div className="my-2">
                <label>Minimum Price for Spread</label>
                <div>
                    <input
                        id='price_low'
                        type='number'
                        value={price_low}
                        onChange={handlePriceLowChange}
                        min={0.5}
                        max={200}
                        step={1}
                    />
                </div>
            </div>

            <div className="my-2">
                <label>Maximum Price for Spread</label>
                <div>
                    <input
                        id='price_high'
                        type='number'
                        value={price_high}
                        onChange={handlePriceHighChange}
                        min={0.5}
                        max={200}
                        step={1}
                    />
                </div>
            </div>

        </div>
    );
} 

export default Parameters;
