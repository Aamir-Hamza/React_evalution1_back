import React from 'react'
import {Link} from "react-router-dom"
import "../App.css"

function Navbar() {
  return (
    <div className='nav_container'>
        <Link className='lnk' to = "/">Home</Link>
        <Link  className = " lnk"to = "/leaderboard">Leaderboard</Link>


    </div>
  )
}

export default Navbar