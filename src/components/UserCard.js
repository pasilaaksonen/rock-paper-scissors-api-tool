import React from 'react'
import './UserCard.css'

const UserCard = ({ userData }) => {


    const checkMostPlayed = (papers, rocks, scissors) => {
        if (papers > rocks && papers > scissors) return "paper"
        if (rocks > papers && rocks > scissors) return "rock"
        if (scissors > papers && scissors > rocks) return "rock"
        if (scissors === papers && rocks < papers && rocks < papers) return "scissors and paper"
        if (scissors === rocks && papers < rocks && papers < rocks) return "scissors and rock"
        if (scissors === rocks && papers === rocks && papers === rocks) return "all equal"
    }


    return (
        <div className="card">
            <div className="card__title">{userData.playerName}</div>
            <div className="card__body">
               <p>games played: {userData.gamesPlayed}</p>
               <p>win ratio: {userData.winRatio}</p>
               <p>most played hand: {checkMostPlayed(userData.papersUsed,userData.rocksUsed,userData.scissorsUsed)}</p>  
            </div>
        </div>
    )
}

export default UserCard