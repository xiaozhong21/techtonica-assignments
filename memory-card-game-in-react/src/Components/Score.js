import React from 'react'

export default function Score({currentScore, bestScore}) {
  return (
    <div className="score-div">
        <div className="current-score">Current Score: {currentScore}</div>
        <div className="best-score">Best Score: {bestScore}</div>
    </div>
  )
}
