import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SetupQuiz() {
    const [categories, SetCatgories]= useState([])
    const [name,setName] = useState('')
    const [selectedCategory, SetSelectedCategory] = useState('') 
    const  [difficulty, setDifficulty]= useState('easy')
    const [numQuestions, SetNumQuestion] = useState(10)
    const navigate = useNavigate()
    useEffect(()=>{
      axios.get("https://opentdb.com/api.php?amount=10").then(response=>SetCatgories(response.category))
    //   .catch(error => console.error("error fetching  category"))

    },[])
    const startQuiz=() =>{
        if(!name.trim()){
            alert("please enter your ")
            return
        }
        navigate("/quiz",{
            state:{
                name ,
            }
        })
    }

  return (
    <div>SetupQuiz</div>
  )
}

export default SetupQuiz