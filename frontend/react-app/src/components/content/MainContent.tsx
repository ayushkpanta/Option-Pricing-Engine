import Header from "./Header";
import SimpleData from "./SimpleData";
import Spreads from "./Spreads";

interface MainContentProps {
    model: string;
    strike: number;
    spot: number;
    volatility: number;
    risk_free_rate: number;
    time_to_expiration: number;
    timesteps: number;
    style: string;
    callPrice: number,
    putPrice: number,
    priceLow: number,
    priceHigh: number,
    callSpread: number[][];
    putSpread: number[][];
  }

function MainContent(
    { 
        model, strike, spot, volatility, risk_free_rate, time_to_expiration, timesteps, style, callPrice, putPrice, callSpread, putSpread, priceHigh, priceLow
    }: MainContentProps
) {

    return (
        <div className="flex-col h-screen bg-black p-4 shadow-lg">

        <Header />

        <SimpleData
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
          />

      <Spreads
          callSpread={callSpread}
          putSpread={putSpread}
          priceLow={priceLow}
          priceHigh={priceHigh}
          timeToExpiration={time_to_expiration}
          />
      </div>

    );
}

export default MainContent;
