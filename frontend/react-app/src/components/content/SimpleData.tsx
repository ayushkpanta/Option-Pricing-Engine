
// interface to remove errors in signature
interface SimpleDataProps {
    model: string;
    strike: number;
    spot: number;
    volatility: number;
    risk_free_rate: number;
    time_to_expiration: number;
    timesteps: number;
    style: string;
    callPrice: number,
    putPrice: number
  }

function SimpleData({ 
    model, strike, spot, volatility, risk_free_rate, time_to_expiration, timesteps, style, callPrice, putPrice
}: SimpleDataProps) {

    // console.log("SimpleData props:", { model, strike, spot, volatility, risk_free_rate, time_to_expiration, timesteps, style });

    return (


        <div className="mb-10">
        <div className="">
            <h1 className=" text-white font-bold text-2xl">
                Calculation Parameters
            </h1>
        </div>

        <div className="">
            <div className="text-white">
                <ul className="text-white">
                    <li>Model: {model}</li>
                    <li>Strike Price (X): ${strike}</li>
                    <li>Spot Price (S): ${spot}</li>
                    <li>Volatility (σ): {volatility}</li>
                    <li>Risk-Free Interest Rate (r): {risk_free_rate}</li>
                    <li>Time to Expiration in Years (T): {time_to_expiration}</li>
                    <li>Timesteps (N): {timesteps}</li>
                    <li>Option Style: {style}</li>
                    <li>Call Price: {callPrice}</li>
                    <li>Put Price: {putPrice}</li>
                </ul>
            </div>
        </div>
        </div>
    )

};

export default SimpleData;
