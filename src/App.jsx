import { Wrapper } from "@googlemaps/react-wrapper";
import "./App.css";
import NavbarApp from "./components/Navbar/Navbar";
import Routes from "./Routes";

const GOOGLE_MAPS_API_KEY = "AIzaSyAres6dxJqN_EEzqHrFIXPHg4tGVuSLERA";

const App = () => {
  return (
    <Wrapper apiKey={GOOGLE_MAPS_API_KEY}>
      <div className="App">
        <NavbarApp />
        <Routes />
      </div>
    </Wrapper>
  );
};

export default App;
