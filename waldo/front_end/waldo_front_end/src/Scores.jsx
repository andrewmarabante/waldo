import { useState, useEffect } from "react"
import { v4 } from "uuid"
import './styles/Scores.css'
import Paper from '@mui/material/Paper';

export default function Scores(){
    const [games, setGames] = useState([])

    useEffect(() => {
        
        fetch('https://waldo-backend.fly.dev/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'  
           })
           .then(result => result.json())
           .then(data => {
            setGames(data)
           })
           .catch(err=>console.log(err))

    }, [])

    return(
        <div className="mainContainer">
            <div className="title">High Scores: </div>
            <Paper elevation={3} className="scoreContainer">
                {games.map((game) => {
                    const end = new Date(game.end)
                    const start = new Date(game.start)
                    const totalSeconds = (end-start)/1000;
                    const minutes = Math.floor(totalSeconds/60);
                    const seconds = (totalSeconds%60).toFixed(3)
                    console.log(seconds)
                    const endDate = new Date(game.end);
                    const endDateString = endDate.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    });
                    return(
                        <div key={v4()}>
                            <p className="name">{game.username}</p>
                            <p className="score">{minutes} minutes and {seconds} seconds</p>
                            <p className="date">-{endDateString}</p>
                        </div>
                    )
                })}
            </Paper>
        </div>
    )
}