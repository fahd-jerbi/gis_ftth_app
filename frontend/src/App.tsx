import MapView from "./components/MapView/MapView";
import { Navbar } from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <div className="flex flex-col h-screen w-screen overflow-hidden bg-base-200">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <MapView />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
