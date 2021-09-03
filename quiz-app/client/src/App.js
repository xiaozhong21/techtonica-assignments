import './App.css';
import { useState } from 'react';
import Score from './components/Score';
import Question from './components/Question';
import Flag from './components/Flag';

function App() {

  const [submitted, setSubmitted] = useState(false);
  const [questionChosen, setQuestionChosen] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [displayQuestion, setDisplayQuestion] = useState(false);
  const [resultMessage, setResultMessage] = useState(null);
  const [score, setScore] = useState(0);
  const [disable, setDisable] = useState(false);
  const [flagIndex, setFlagIndex] = useState(1);
  const [userAnswer, setUserAnswer] = useState(null);

  const message = [
    `Sorry, your answer is incorrect.`,
    `Bravo! Your answer is correct. You are one step closer to completing the puzzle!`, 
    `Bravo! Your answer is correct. Great job completing parts of the puzzle!`,
    `Bravo! Your answer is correct. Congratulations! You have successfully completed the puzzle!`
  ];

  const flagPieces = document.getElementsByClassName('flag');

  const generateQuestion = () => {
    continueGame();
    setDisable(false);
    setSubmitted(false);
    setResultMessage(false);
    fetchQuestion();
    setDisplayQuestion(true);
  }

  const continueGame = () => {
    // Reset game after all ten questions
    if (questionIndex === 9) {
      setQuestionIndex(null);
    } else if (questionIndex === null) {
      setScore(0);
      setQuestionIndex(0);
      setFlagIndex(1);
      document.getElementById('button').textContent = `Start Quiz`;
      for (let flagPiece of flagPieces) {
        flagPiece.style.visibility = "hidden";
      }
    } 
    // Continue game if not at the end of all questions
    else {
      setQuestionIndex(questionIndex => questionIndex + 1)
    }
  }

  const fetchQuestion = async () => {
    let response = await fetch('/api');
    await response.json().then(questions => setQuestionChosen(() => {
      return questions[questionIndex];
    }));
  }

  const handleSubmit = (formSubmitEvent) => {
    formSubmitEvent.preventDefault();
    setSubmitted(true);
    checkAnswer();
    setDisable(true);
    if (questionIndex === 1) {
      document.getElementById('button').textContent = `Next Question`;
    }
  }

  const checkAnswer = () => {
    if (userAnswer === questionChosen.correct) {
      setFlagIndex(previousIndex => previousIndex + 1);
      document.getElementById(`flag${flagIndex}`).style.visibility = "visible";
      setScore(previousScore => previousScore + 1);
      setResultMessage(() => {
        const completedPuzzle = () => {
          for (let flagPiece of flagPieces) {
            if (flagPiece.style.visibility !== "visible") return false;
          }
          return true;
        };
        if (questionIndex === null && completedPuzzle() === true) return message[3];
        else if (questionIndex === null && completedPuzzle() === false) return message[2];
        else return message[1];
      });
    } else {
      setResultMessage(() => message[0]);
    }
  }

  const handleAnswerChange = (radioButtonEvent) => {
    setUserAnswer(() => {
      return radioButtonEvent.target.value;
    })
  }

  return (
    <div className="App">
      <Score score={score}/>
      <button id="button" className="button" onClick={generateQuestion}>Start Quiz</button><br/>
      <p className="description">Answer all ten questions correctly to complete the puzzle below!</p>
      {questionChosen && 
      <Question 
        displayQuestion={displayQuestion} 
        questionChosen={questionChosen} 
        handleSubmit={handleSubmit} 
        disabled={disable}
        userAnswer={userAnswer}
        handleAnswerChange={handleAnswerChange}
      />}<br/>
      <p className="result-message">{submitted && resultMessage}</p><br/><br/>
      <Flag />
    </div>
  );
}

export default App;
