import React from 'react';

interface SimpleDataProps {
    model: string;
    strike: number;
    spot: number;
    volatility: number;
    risk_free_rate: number;
    time_to_expiration: number;
    timesteps: number;
    style: string;
    callPrice: number;
    putPrice: number;
}

function SimpleData({
    model, strike, spot, volatility, risk_free_rate, time_to_expiration, timesteps, style, callPrice, putPrice
}: SimpleDataProps) {
    const parameters = [
        { label: 'Model', value: model },
        { label: 'Strike Price', value: `$${strike.toFixed(2)}` },
        { label: 'Spot Price', value: `$${spot.toFixed(2)}` },
        { label: 'Volatility', value: `${(volatility * 100).toFixed(2)}%` },
        { label: 'Risk-Free Rate', value: `${(risk_free_rate * 100).toFixed(2)}%` },
        { label: 'Time to Expiration', value: `${time_to_expiration.toFixed(2)} years` },
        { label: 'Timesteps', value: model.toUpperCase() === 'BLACK-SCHOLES' ? 'N/A' : timesteps },
        { label: 'Option Style', value: model.toUpperCase() === 'BLACK-SCHOLES' ? 'EUROPEAN' : style },
    ];

    return (
        <div className="mb-10 bg-gray-900 p-6 rounded-xl shadow-2xl">
            <h3 className="text-white font-bold text-xl mb-6">Model Parameters</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {parameters.map((param, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">{param.label}</div>
                        <div className="text-white text-lg font-medium">{param.value}</div>
                    </div>
                ))}
            </div>
            <h3 className="text-white font-bold text-xl mb-4">Option Prices</h3>
            <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="text-center flex-1">
                    <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Call Price</div>
                    <div className="text-green-400 text-2xl font-bold">${callPrice.toFixed(2)}</div>
                </div>
                <div className="h-12 w-px bg-gray-700 mx-4"></div>
                <div className="text-center flex-1">
                    <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Put Price</div>
                    <div className="text-green-400 text-2xl font-bold">${putPrice.toFixed(2)}</div>
                </div>
            </div>
        </div>
    );
}

export default SimpleData;
