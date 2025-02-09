
import MainContent from "./components/content/MainContent";
import Parameters from "./components/input/Parameters";

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
  );

}

export default App;
