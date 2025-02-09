import * as d3 from "d3";
import {useEffect, useRef} from "react"

// interface to remove errors in signature
interface SpreadProps {
    callSpread: number[][];
    putSpread: number[][];
  }

function Spreads({callSpread, putSpread}: SpreadProps) {

    const callSpreadRef = useRef(null);
    const putSpreadRef = useRef(null);

    return (


        <div className="mb-10">
        <div className="">
            <h1 className=" text-white font-bold text-2xl">
                PnL Matrices
            </h1>
        </div>

        <div className="">
            <div className="text-white">
                <ul className="text-white">
                    <li>Call Spread: {callSpread}</li>
                    <li>Put Spread (X): ${putSpread}</li>
                </ul>
            </div>
        </div>
        </div>
    )

};

export default Spreads;
