
import MainContent from "./components/MainContent";
import Parameters from "./components/Parameters";

function App() {


  return (

    // wrap entire thing in a div
    <div className="flex h-screen">

      <div className="w-1/5">
        <Parameters/>
      </div>

      <div className="w-4/5">
        <MainContent/>
      </div>

    </div>

      
    //   <div className="parameters">
    //     <Parameters/>
    //   </div>

    //   <div className="main">

    //     <h1>TEST</h1>



    //     <div className="header">
    //     </div>

    //     <div className="basic_display">
    //     </div>

    //     <div className="spread_display">
    //     </div>

    //   </div>



        


    // </>

 

  );

}

export default App;
