import React, { useState, useEffect } from 'react'
import './UserCard.css'

function LiveEndGameCard({playerA,playerB}) {

    const [winner, setWinner] = useState(null)
    const pickA = playerA.played
    const pickB = playerB.played

    useEffect(() => {

        if (pickA === pickB) {
            setWinner("Game ended draw!")
        }
        if ((pickA === "PAPER" && pickB === "ROCK") || (pickA === "SCISSORS" && pickB === "PAPER") || (pickA === "ROCK" && pickB === "SCISSORS")) {
            setWinner(`${playerA.name} won!`)
        }
        if ((pickA === "ROCK" && pickB === "PAPER") || (pickA === "PAPER" && pickB === "SCISSORS") || (pickA === "SCISSORS" && pickB === "ROCK")) {
            setWinner(`${playerB.name} won!`)
        }
        
    }, [])


    return (
        <div className="card">
           <div className="card__title">Finished</div>
           <div className="card__body">
               <p>{playerA.name} used {playerA.played.toLowerCase()} </p>
               <p>{playerB.name} used {playerB.played.toLowerCase()} </p>
               <p>{winner}</p>
            </div>
        </div>
    )
}

export default LiveEndGameCard
