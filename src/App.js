import React from "react";
import './App.css';
//import React, { useState, useContext  } from "react";
import { BrowserRouter as Router, Route  } from "react-router-dom";
import Home from "./Components/Home";
import  QuizInstructions from "./Components/Quiz/QuizInstructions";
import Play from "./Components/Quiz/Play";
import QuizSummary from "./Components/Quiz/QuizSummary";

function App() {
  
  return (
    <div id className="App">
   
<Router>
  <Route path="/" exact component={Home}></Route>
  <Route path="/play/instructions" exact component={QuizInstructions}></Route>
  <Route path="/play/quiz" exact component={Play}></Route>
  <Route path="/play/quizsummary" exact component={QuizSummary} />
</Router>
    </div>
  );
}

export default App;
