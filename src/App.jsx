import { useState } from 'react'
import './App.css'

function App() {
  const EMPTY_GRID = [[' ',' ',' '], [' ',' ',' '], [' ',' ',' ']]

  const [grid, setGrid] = useState(EMPTY_GRID)
  const [turn, setTurn] = useState('X')
  const [winner, setWinner] = useState(null)
  const [isDraw, setIsDraw] = useState(false)

  function checkGrid(grid){
    let empty = false;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] === ' ') {
          empty = true
        }
      }
    }
    if (!empty) {
      setIsDraw(true)
      return
    }
    for (let i = 0; i < 3; i++) {
      // CHECK ROWS
      if (grid[i][0] !== ' ' && grid[i][0] === grid[i][1] && grid[i][0] === grid[i][2]) {
        setWinner(turn)
        return
      }
      // CHECK COLUMNS
      if(grid[0][i] !== ' ' && grid[0][i] === grid[1][i] && grid[0][i] == grid[2][i]){
        setWinner(turn)
        return
      }
      // CHECK DIAGONALS
      if( (grid[0][0] !== ' ' && grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2])
      || grid[0][2] !== ' ' && grid[0][2]  === grid[1][1] && grid[0][2] === grid[2][0] )
        {
          setWinner(turn)
          return
      }
      setTurn(turn === 'X' ? 'O' : 'X')
    }
  }

  function handleClick(rowIdx, cellIdx){
    let newGrid = [...grid]
    newGrid[rowIdx][cellIdx] = turn
    setGrid(newGrid)
    checkGrid(grid)
  }

  return (
    <div className="container">
      <h2 className="win-message">{winner ? `Game Over, The winner is : ${winner}` : ""}</h2>
      <h2 className="draw-message">{isDraw ? "It's a Draw" : ""}</h2>
      <h2 className="turn-message">{(!winner && !isDraw) ? `It's ${turn}'s turn` : ""}</h2>
      <div className='grid'>
        {grid.map((row, rowIdx )=>{
          return <div className="row" key={rowIdx}>
            {row.map((cell, cellIdx) =>{
              return <button className="cell" disabled={winner || cell === 'X' || cell === 'O'} key={cellIdx} onClick={() => handleClick(rowIdx, cellIdx)}>
                {cell === 0 ? ' ' : cell }
              </button>
            })}
          </div>
        })}
      </div>
      <button onClick={()=>{
        setWinner(null)
        setGrid(EMPTY_GRID)
        }}>Reset</button>
    </div>
  )
}

export default App
