import React from "react";
import Header from "./components/Header";
import Plane from "./components/Plane";
import Footer from "./components/Footer";

const App = () => (
  <div>
    <div className="ui first divider" style={{marginTop: 0}}/>
    <Header/>
    <div className="ui first divider"/>
    <Plane/>
    <div className="ui first divider"/>
    <Footer/>
  </div>
);

export default App;
