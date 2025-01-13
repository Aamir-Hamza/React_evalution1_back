import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Leaderboard from './component/Leaderboard'
import Qestion from './component/Qestion'
import Quiz from './component/Quiz'
import SetupQuiz from './component/SetupQuiz'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>

      <Route path='/' element ={<SetupQuiz/>}/>
      <Route path='/quiz' element ={<Quiz/>}/>
      <Route path='/leaderboard' element ={<Leaderboard/>}/>
    </Routes>

    </>
  )
}

export default App
