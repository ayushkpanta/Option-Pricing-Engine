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
            <h2 className="fixed top-10 font-bold">Enter Parameters</h2>
        </div>
    );
} 

export default Parameters;
