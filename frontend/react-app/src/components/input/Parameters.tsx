import React from 'react';

interface ParametersProps {
    model: string;
    setModel: React.Dispatch<React.SetStateAction<string>>;
    strike: number;
    setStrike: React.Dispatch<React.SetStateAction<number>>;
    spot: number;
    setSpot: React.Dispatch<React.SetStateAction<number>>;
    price_low: number;
    setPriceLow: React.Dispatch<React.SetStateAction<number>>;
    price_high: number;
    setPriceHigh: React.Dispatch<React.SetStateAction<number>>;
    volatility: number;
    setVolatility: React.Dispatch<React.SetStateAction<number>>;
    risk_free_rate: number;
    setRiskFreeRate: React.Dispatch<React.SetStateAction<number>>;
    time_to_expiration: number;
    setTimeToExpiration: React.Dispatch<React.SetStateAction<number>>;
    timesteps: number;
    setTimesteps: React.Dispatch<React.SetStateAction<number>>;
    style: string;
    setStyle: React.Dispatch<React.SetStateAction<string>>;
}

const SegmentedControl: React.FC<{
    options: string[];
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}> = ({ options, value, onChange, disabled = false }) => (
    <div className={`flex rounded-lg bg-gray-200 p-1 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {options.map((option) => (
            <button
                key={option}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    value === option
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => !disabled && onChange(option)}
                disabled={disabled}
            >
                {option}
            </button>
        ))}
    </div>
);

const Parameters: React.FC<ParametersProps> = ({ 
    model, setModel, strike, setStrike, spot, setSpot, price_low, setPriceLow,
    price_high, setPriceHigh, volatility, setVolatility, risk_free_rate, setRiskFreeRate,
    time_to_expiration, setTimeToExpiration, timesteps, setTimesteps, style, setStyle
}) => {
    return (
        <div className="flex flex-col h-screen bg-white shadow-lg p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Parameters</h2>
            
            {/* Model Selector */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                <SegmentedControl
                    options={['BLACK-SCHOLES', 'BINOMIAL']}
                    value={model}
                    onChange={setModel}
                />
            </div>
            
            {/* Style Selector */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                <SegmentedControl
                    options={['AMERICAN', 'EUROPEAN']}
                    value={style}
                    onChange={setStyle}
                    disabled={model === 'BLACK-SCHOLES'}
                />
            </div>
            
            {/* Inputs */}
            <div className="space-y-4">
                {[ 
                    { label: 'Strike Price (X)', value: strike, setValue: setStrike },
                    { label: 'Spot Price (S)', value: spot, setValue: setSpot },
                    { label: 'Volatility (σ)', value: volatility, setValue: setVolatility },
                    { label: 'Risk-Free Rate (r)', value: risk_free_rate, setValue: setRiskFreeRate },
                    { label: 'Time to Expiration (T)', value: time_to_expiration, setValue: setTimeToExpiration },
                    { label: 'Timesteps (N)', value: timesteps, setValue: setTimesteps, disabled: model === 'BLACK-SCHOLES' },
                    { label: 'Min Price Spread', value: price_low, setValue: setPriceLow },
                    { label: 'Max Price Spread', value: price_high, setValue: setPriceHigh }
                ].map(({ label, value, setValue, disabled }, idx) => (
                    <div key={idx} className={`${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(parseFloat(e.target.value))}
                            disabled={disabled}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Parameters;
