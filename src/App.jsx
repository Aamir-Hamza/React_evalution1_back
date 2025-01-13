import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Leaderboard from './component/Leaderboard'
import Home from './component/Home'

import Quiz from './component/Quiz'
import Navbar from './component/Navbar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Routes>

      <Route path='/' element ={<Home/>}/>
      <Route path='/quiz' element ={<Quiz/>}/>
      <Route path='/leaderboard' element ={<Leaderboard/>}/>
    </Routes>

    </>
  )
}

export default App
