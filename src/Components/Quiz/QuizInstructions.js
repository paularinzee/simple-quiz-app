import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";



function QuizInstructions() {
    return (
        <Fragment>
            <Helmet><title>Quiz Instructions - Quix App</title></Helmet>
            <div className="container instructions">

                <h2>How to Play the Game</h2>
                
            </div>
        </Fragment>
    );
}

export default QuizInstructions;