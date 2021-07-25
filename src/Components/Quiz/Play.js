import React, { Component, Fragment } from 'react';
import { Helmet } from "react-helmet";


import classnames from 'classnames/bind';
import 'react-toastify/dist/ReactToastify.css';
import '../play.css';
//questions jason file
import questions from '../../questions.json';
//importing "isEmpty function"
import isEmpty from '../../utils/is-empty';


class Play extends Component {
    constructor (props) {
        super(props);
        this.state = {
            questions,
            currentQuestion: {},
            nextQuestion: {},
            prevQuestion: {},
            answer: '',
            numberOfQuestions: 0,
            numberOfAnsweredQuestion: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hints: 5,
            fiftyFifty: 2,
            usedFiftyFifty: false,
            nextButtonDisabled: false,
            previousButtonDisabled: true,
            time: {},
        };
       
    }

    componentDidMount() {
        const { questions, currentQuestion, nextQuestion, prevQuestion } = this.state;
        this.displayQuestions(questions, currentQuestion, nextQuestion, prevQuestion);
        this.startTimer();

    }

    componentWillMount() {
        clearInterval( this.interval);

    }
//functon to display questoins
displayQuestions = ( questions = this.state.questions, currentQuestion, nextQuestion, prevQuestion) => {

let { currentQuestionIndex } = this.state;
if( !isEmpty(this.state.questions)){
    questions = this.state.questions;
    currentQuestion = questions[currentQuestionIndex];
    nextQuestion = questions[currentQuestionIndex + 1];
    prevQuestion = questions[currentQuestionIndex - 1];
    const answer = currentQuestion.answer;
    this.setState({
        currentQuestion,
        nextQuestion,
        prevQuestion,
        numberOfQuestions: questions.length,
        answer
    }, () => {
        this.showOptions();
        this.handleDisableButton();
    
    });

}
};

//option button funtion
handleOptionClick = (e) => {
    if (e.target.innerHTML === this.state.answer) {
        this.correctAnswer();
    } else {
        this.wrongAnswer();
    
    }
}

//next button 
handleNextButtonClick = () => {

    if ( this.state.nextQuestion !== undefined) {
        this.setState(prevState => ({
            currentQuestionIndex: prevState.currentQuestionIndex + 1 
        }), () => {
            this.displayQuestions( this.state.state, this.state.currentQuestion, this.state.prevQuestion);

        });
    }
};

//prev button
handlePrevButtonClick = () => {

    if ( this.state.prevQuestion !== undefined) {
        this.setState(prevState => ({
            currentQuestionIndex: prevState.currentQuestionIndex - 1 
        }), () => {
            this.displayQuestions( this.state.state, this.state.currentQuestion, this.state.prevQuestion);

        });
    }
};
//quit button
handleQuitButtonClick = () => {
    if (window.confirm( 'Are you sure you want to Exit the quiz?')) {
        this.props.history.push('/');
    }
}

handleButtonClick = (e) => {
    switch (e.target.id) {
        case 'next-button':
            this.handleNextButtonClick();
            break;
        case 'previous-button':
            this.handlePrevButtonClick();
            break;
        case 'quit-button':
        this.handleQuitButtonClick();
        break;
        default:
            break;
    }
}

//logic to handle the correct answer
correctAnswer = () => {
    alert('Correct Answer!');
    this.setState( prevState => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestion: prevState.numberOfAnsweredQuestion + 1
    }), () => {
        if ( this.state.nextQuestion === undefined) {
            this.endGame();
        } else {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.prevQuestion);

         }
    });
}

//logic to handle the wrong answer
wrongAnswer = () => {
    alert('Wrong Answer!');
    this.setState( prevState => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestion: prevState.numberOfAnsweredQuestion + 1
    }), () => {
        if ( this.state.nextQuestion === undefined) {
            this.endGame();
        } else {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.prevQuestion);

         }
      
    });
}

showOptions = () => {
    const options = Array.from(document.querySelectorAll('.option'));

    options.forEach(option => {
        option.style.visibility = 'visible';
    });
    this.setState({
        usedFiftyFifty:false
    });
}
//setting the quixz timer
startTimer = () => {
    const countDownTime = Date.now() + 180000;
    this.interval = setInterval(() => {
        const now = new Date();
        const distance = countDownTime - now;

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance & (1000 * 60 )) / 1000);


        if(distance < 0 ) {
            clearInterval(this.interval);
            this.setState({
                time: {
                    minutes: 0,
                    seconds: 0
                }
            }, () => {
                this.endGame();
            });
        } else {
            this.setState({
                time: {
                    minutes,
                    seconds
                }
            });
        }

    }, 1000);

}

//method to handle 50:50 option
handleFiftyFifty = () => {
    if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
        const options = document.querySelectorAll('.option');
        const randomNumbers = [];
        let indexOfAnswer;

        options.forEach((option, index) => {
            if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                indexOfAnswer = index;
        }
    });
    let count = 0;
    do {
        const randomNumber = Math.round(Math.random() * 3);
        if (randomNumber !== indexOfAnswer) {
            if (randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                randomNumbers.push(randomNumber);
                count ++;
            } else {
                while (true) {
                    const newRandomNumber = Math.round(Math.random() * 3);
                    if (!randomNumbers.includes(newRandomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                        randomNumbers.push(newRandomNumber);
                        count ++;
                        break;

                    }
                }
            }
        }
    } while (count < 2 );
    options.forEach((option, index) => {
        if (randomNumbers.includes(index)) {
            option.style.visibility = 'hidden';
        }
    });

    this.setState (prevState => ({
        fiftyFifty: prevState.fiftyFifty -1,
        usedFiftyFifty: true

    }));
}
}

handleDisableButton = () => {
    if(this.state.prevQuestion === undefined || this.state.currentQuestionIndex === 0) {
        this.setState({
            previousButtonDisabled: true
        });

    } else {
        this.setState({
            previousButtonDisabled: false
        });
    }
    if(this.state.prevQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions) {
        this.setState({
            nextButtonDisabled: true
        });

    } else {
        this.setState({
            nextButtonDisabled: false
        });
    }
}
//method to end the game
endGame = () => {
    alert('Quiz has ended');
    const { state } = this;
    const playerStats = {
        score: state.score,
        numberOfQuestions: state.numberOfQuestions,
        numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
        correctAnswers:state.correctAnswers,
        wrongAnswers: state.wrongAnswers,
        fiftyFiftyUsed: 2 - state.fiftyFifty,
        
    };
   
    setTimeout(() => {
        this.props.history.push('/play/quizsummary', playerStats);
    }, 1000);
}
    render() {
        const { 
            currentQuestion, 
            currentQuestionIndex, 
            numberOfQuestions,
            time,
            fiftyFifty
        } = this.state;
        return (
          
                <Fragment>
                   <Helmet> <title> Quiz Pge</title></Helmet> 
                   <div className="container">
                   <div className="questions">
                       <h2>Quiz Mode</h2>
                      <div className="lifeline-container">
                          <p>
                             <svg xmlns="http://www.w3.org/2000/svg" onClick={this.handleFiftyFifty}  width="16" height="16" fill="currentColor" class="bi bi-life-preserver"  id="bi" viewBox="0 0 16 16">
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm6.43-5.228a7.025 7.025 0 0 1-3.658 3.658l-1.115-2.788a4.015 4.015 0 0 0 1.985-1.985l2.788 1.115zM5.228 14.43a7.025 7.025 0 0 1-3.658-3.658l2.788-1.115a4.015 4.015 0 0 0 1.985 1.985L5.228 14.43zm9.202-9.202-2.788 1.115a4.015 4.015 0 0 0-1.985-1.985l1.115-2.788a7.025 7.025 0 0 1 3.658 3.658zm-8.087-.87a4.015 4.015 0 0 0-1.985 1.985L1.57 5.228A7.025 7.025 0 0 1 5.228 1.57l1.115 2.788zM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
</svg> {fiftyFifty}
                              
                              
                              </p>

                              <p> </p>
                          </div> 
                          <div>
                            
                          </div>
                          <div className="timer-container">
                              <p>
                                  <span className="left" style={{ float: 'left'}}> {currentQuestionIndex + 1} of {numberOfQuestions}</span>
                                  <span className="right" style={{ float: 'right'}}>{time.minutes}:{time.seconds}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-alarm" viewBox="0 0 16 16">
  <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
  <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"/>
</svg></span>
                                  </p> 
                          
                          </div>
                       <h5>{currentQuestion.question}</h5>
                       <div></div>
                       <div className="option-container">
                           
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
                        <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                       </div>
                       <div className="option-container">
                           <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                           <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
                               </div>
                               <div className="button-container">
                               <button className={classnames('', {'disable': this.state.previousButtonDisabled})} id="previous-button" onClick={this.handleButtonClick}>Previous</button>
                               <button className={classnames('',{'disable': this.state.nextButtonDisabled})} id="next-button" onClick={this.handleButtonClick}>Next</button>
                         
                         <button id="quit-button" onClick={this.handleButtonClick}>Quit</button>
                           </div>
                       
                           

                   </div>

                   </div>
                </Fragment>
            
        );
    }
}

export default Play;