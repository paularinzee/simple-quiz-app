import React, { Fragment } from 'react';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
//import  { ClassComponent, FunctionalComponent } from "./Quiz/Test";
import '../home.css';
function Home() {
    return (
        <Fragment>
<Helmet> <tittle> Quiz App - Home</tittle></Helmet>
        <div id="contain" className="container">
          <div className="home">
              <center>
        <div className="section">
            
            <h1>Quiz App</h1>
         
            
                <ul className="play-button">
                    <li ><Link  to="/play/quiz">Play</Link></li>
                    </ul>
       
           
        </div>
        </center>
        </div>
        </div>
        </Fragment>
       
    );
}

export default Home;