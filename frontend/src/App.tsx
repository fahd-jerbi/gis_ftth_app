import { Navbar } from "./components/Navbar/Navbar";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <Navbar />
    </AppProvider>
  );
}

export default App;
