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

const NumberInput: React.FC<{
    label: string;
    value: number;
    setValue: (value: number) => void;
    min: number;
    max: number;
    step: number;
    disabled?: boolean;
}> = ({ label, value, setValue, min, max, step, disabled = false }) => (
    <div className={`mb-6 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="flex items-center space-x-4">
            <div className="relative flex-grow">
                <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(parseFloat(e.target.value))}
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                    className="w-full p-2 pr-12 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <button
                        onClick={() => setValue(value + step)}
                        disabled={disabled || value >= max}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        ▲
                    </button>
                    <button
                        onClick={() => setValue(value - step)}
                        disabled={disabled || value <= min}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        ▼
                    </button>
                </div>
            </div>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
            disabled={disabled}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
        />
    </div>
);

const Parameters: React.FC<ParametersProps> = ({ 
    model, setModel, strike, setStrike, spot, setSpot, price_low, setPriceLow,
    price_high, setPriceHigh, volatility, setVolatility, risk_free_rate, setRiskFreeRate,
    time_to_expiration, setTimeToExpiration, timesteps, setTimesteps, style, setStyle
}) => {
    return (
        <div className="flex flex-col h-screen bg-white shadow-lg p-8 rounded-3xl overflow-y-auto">
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
            
            {/* Numerical Inputs */}
            <NumberInput label="Strike Price (X)" value={strike} setValue={setStrike} min={0} max={1000} step={1} />
            <NumberInput label="Spot Price (S)" value={spot} setValue={setSpot} min={0} max={1000} step={1} />
            <NumberInput label="Volatility (σ)" value={volatility} setValue={setVolatility} min={0} max={1} step={0.01} />
            <NumberInput label="Risk-Free Rate (r)" value={risk_free_rate} setValue={setRiskFreeRate} min={0} max={0.2} step={0.001} />
            <NumberInput label="Time to Expiration (T)" value={time_to_expiration} setValue={setTimeToExpiration} min={0} max={10} step={0.1} />
            <NumberInput label="Timesteps (N)" value={timesteps} setValue={setTimesteps} min={1} max={1000} step={1} disabled={model === 'BLACK-SCHOLES'} />
            <NumberInput label="Min Asset Price" value={price_low} setValue={setPriceLow} min={0} max={1000} step={1} />
            <NumberInput label="Max Asset Price" value={price_high} setValue={setPriceHigh} min={0} max={1000} step={1} />
        </div>
    );
};

export default Parameters;
