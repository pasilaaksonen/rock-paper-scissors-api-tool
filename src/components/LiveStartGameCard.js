import React from 'react'
import './UserCard.css'

function LiveStartGameCard({playerA,playerB}) {

    return (
        <div className="card">
           <div className="card__title">Ongoing</div>
           <div className="card__body">
               <p>{playerA}</p>
               <p>vs.</p>
               <p>{playerB}</p> 
            </div>
        </div>
    )
}

export default LiveStartGameCard