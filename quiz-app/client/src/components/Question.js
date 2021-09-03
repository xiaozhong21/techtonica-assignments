import React from 'react'

export default function Question({handleSubmit, questionChosen, displayQuestion, disabled, userAnswer, handleAnswerChange}) {
  return (
    <div>
      {displayQuestion && 
      <form onSubmit={handleSubmit}>
        <p className="question-title">
          <span className="question-number">{`Question ${questionChosen.id}. `}</span>
          {questionChosen.title}
        </p><br/>
        {questionChosen.choices.map((choice, index) => {
          return (
            <div key={index}>
              <label>
                <input                               
                  type="radio" 
                  id={`choice${questionChosen.id}`}
                  name="choices" 
                  value={choice}
                  checked={userAnswer === choice}
                  onChange={handleAnswerChange}
                />
                {choice}
              </label>
              <br/><br/>
            </div>
          )})
        }
        <input type="submit" value="Submit" className="button" disabled={disabled}/>
      </form>
      }
    </div>
  )
}
