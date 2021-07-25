import React, { Component, Fragment } from 'react';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";


class QuizSummary extends Component {
    constructor (props) {
        super(props);
        this.state = {
            score: 0,
            numberOfQuestions: 0,
            numberOfAnsweredQuestions:0,
            correctAnswers: 0,
            wrongAnswers: 0,
            fiftyFiftyUsed: 0
        };
    }

    componentDidMount() {
const { state} = this.props.location
if(state) {
        this.setState({
            score: (state.score / state.numberOfQuestions) * 100,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions:state.numberOfAnsweredQuestions,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,
            fiftyFiftyUsed: state.fiftyFiftyUsed
        });
    }
    }
    render() {
        const { state} = this.props.location;
        let stats, remark;
        const userScore = this.state.score;
        if (userScore <= 30) {
            remark = 'You need more practice!';

        } else if (userScore > 30 && userScore <= 50 ) {
            remark = 'Better luck next time!';
        } else if (userScore <= 70 && userScore > 50){
            remark = 'you can do better!';
        } else if (userScore <= 71 && userScore > 84){
            remark = 'you did greate!';
        } else {
            remark = 'You\'re an absolut Genius';
        }

        if (state !== undefined) {
            stats = (
                <Fragment>
                <div style={ {textAlign: 'center'}}>
               
        
        <h4>{remark}</h4>
        <h2>Your Score: {this.state.score.toFixed(0)}&#37;</h2>
        <span> Total number of questions:</span>
        <span> {this.state.numberOfQuestions}</span><br/>
        <span> Total number of attempted questions :</span>
        <span> {this.state.numberOfAnsweredQuestions}</span><br/>
        <span> Total number of correct answers:</span>
        <span> {this.state.correctAnswers}</span><br/>
        <span> Total number of wrong answers:</span>
        <span> {this.state.wrongAnswers}</span><br/>
        <span> 50:50:</span>
        <span> {this.state.fiftyFiftyUsed}</span>
        
    
  
    
<section>
 <ul>
     <li>
         <Link to= "/">Back to Home</Link>

     </li>
     <li>
         <Link to ="/play/quiz"> Play Again</Link>
         
     </li>
 </ul>
</section>
                </div>
                </Fragment>
                );

        } else {
            stats = (
                <section>
            <h1>No Statistics available please take a quiz</h1>
                <ul>
                <li>
                    <Link to= "/">Back to Home</Link>
           
                </li>
                <li>
                    <Link to ="/play/quiz"> Take a Quiz</Link>
                    
                </li>
            </ul>
            </section>
            );

        }
        return (
            <Fragment>
                <Helmet> <tittle>Quiz App - Summary</tittle></Helmet>
                
                <div className="container">{stats}</div>
                
               
                
            </Fragment>
        );
    }
}

export default QuizSummary;