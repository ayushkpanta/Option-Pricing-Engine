import Header from "./Header";
import SimpleData from "./SimpleData";
import Spreads from "./Spreads";


function MainContent() {

    return (
        <div className="flex-col h-screen bg-black p-4 shadow-lg">

            <Header />

            <SimpleData />

            <Spreads />

        </div>
    );
}

export default MainContent;
