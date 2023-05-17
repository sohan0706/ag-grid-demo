import React, { useEffect } from "react"
import logo from './logo.svg';
import './App.css';
import Passenger from "./components/Passenger";
import About from "./components/About";
import Contact from "./components/Contact";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';


function App() {
  return (
    <Router>
    <div className="App">
    <div className="header">
      <a href="/" className="logo">Entitles Solutions</a>
      <div className="header-right">
        <a className="active" href="/">Home</a>
        <a href="/contact">Contact</a>
        <a href="/about">About</a>
      </div>
    </div>
     {/* <ul className="App-header">
       <li>
         <Link to="/">Dashboard</Link>
       </li>
       <li>
         <Link to="/about">About Us</Link>
       </li>
       <li>
         <Link to="/contact">Contact Us</Link>
       </li>
     </ul> */}
    <Routes>
          <Route exact path='/' element={< Passenger />}></Route>
          <Route exact path='/about' element={< About />}></Route>
          <Route exact path='/contact' element={< Contact />}></Route>
   </Routes>
   </div>
</Router>
  );
}

export default App;
