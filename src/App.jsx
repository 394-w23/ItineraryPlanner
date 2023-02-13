import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import NavbarApp from './components/Navbar/Navbar';
import Routes from "./Routes";

const App = () => {
  return (
    <div className="App">
      <NavbarApp />
      <Routes />
    </div>
  );
};

export default App;
