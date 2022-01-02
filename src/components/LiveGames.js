import React, { useEffect, useState } from "react";
import LiveStartGameCard from "./LiveStartGameCard";
import LiveEndGameCard from "./LiveEndedGameCards";

function LiveGames() {

    const [tempStartingGame, setTempStartingGame] = useState(null)
    const [tempEndedGame, setTempEndedGame] = useState(null)
    const [startingGamesList, setStartingGamesList] = useState([])
    const [endedGamesList, setEndedGamesList] = useState([])

    useEffect(() => {
        if (tempStartingGame) {
            const tempList = [...startingGamesList]
            tempList.push(tempStartingGame)
            setStartingGamesList(tempList)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tempStartingGame])

    useEffect(() => {
        if (tempEndedGame) {
            const checkCorrespondingStartingGame = startingGamesList.filter(game => game.gameId === tempEndedGame.gameId)
            if (checkCorrespondingStartingGame.length > 0) {
                const tempList = [...endedGamesList]
                tempList.push(tempEndedGame)
                setEndedGamesList(tempList)
                const tempStartingGameList = startingGamesList.filter(game => game.gameId !== checkCorrespondingStartingGame[0].gameId)
                setStartingGamesList(tempStartingGameList)
                if (endedGamesList.length > 5) {
                    setEndedGamesList([])  
                }    
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tempEndedGame])

    useEffect(() => {
        let socket = new WebSocket("wss://bad-api-assignment.reaktor.com/rps/live");
        socket.onopen = function(e) {
          console.log("Connection established");
        };
        socket.onmessage = function(event) {
          const json = JSON.parse(event.data);
          const json2 = JSON.parse(json)
        //   console.log(json2)
          if (json2.type === "GAME_BEGIN" ) {
            setTempStartingGame(json2)
          } 
          else {
            setTempEndedGame(json2)
          }  
        };
    }, [])

    return (
        <div className="page-content">
            <h1>Games in progress</h1>
            <div className="cards-container">
                {startingGamesList.map(game => (
                    <LiveStartGameCard 
                    playerA={game.playerA.name}
                    playerB={game.playerB.name}
                    />
                ))}
                {endedGamesList.map(game => (
                    <LiveEndGameCard 
                    playerA={game.playerA}
                    playerB={game.playerB}
                    />
                ))}
            </div>
        </div>
    )
}

export default LiveGames
