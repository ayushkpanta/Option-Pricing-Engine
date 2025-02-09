
// interface to remove errors in signature
interface SpreadProps {
    callSpread: number[][];
    putSpread: number[][];
  }

function Spreads({callSpread, putSpread}: SpreadProps) {

    // console.log("Spread props:", {callSpread, putSpread});

    return (


        <div className="mb-10">
        <div className="">
            <h1 className=" text-white font-bold text-2xl">
                Calculation Parameters
            </h1>
        </div>
        </div>
    )

};

export default Spreads;
