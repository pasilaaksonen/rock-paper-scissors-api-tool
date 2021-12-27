import express from 'express';
import axios from 'axios'
import UserData from '../models/user-model.js'
const router = express.Router();

export const getHistory = async (req, res) => {

    let counter = 0
    let listOfGames = []
    let listOfNames = []
    let listOfPlayerFull = []
    let recentDate = null

    const handleUpdatePlayerDatas = () => {
        listOfNames.forEach(name => {

            let wins = 0
            let rocks = 0
            let scissors = 0
            let papers = 0
            let gamesPlayed = 0

            const index = listOfPlayerFull.findIndex(object => {
                return object.playerName === name
            })

            listOfGames.forEach(game => {
               
               if (game.playerA.name === name) {
                gamesPlayed ++
                if (game.playerA.played === "PAPER") papers ++
                if (game.playerA.played === "ROCK") rocks ++
                if (game.playerA.played === "SCISSORS") scissors ++
                const gameResult = checkWinner(game.playerA.played, game.playerB.played)
                if (gameResult === "player A won") wins ++
               }
               if (game.playerB.name === name) {
                gamesPlayed ++
                if (game.playerB.played === "PAPER") papers ++
                if (game.playerB.played === "ROCK") rocks ++
                if (game.playerB.played === "SCISSORS") scissors ++
                const gameResult = checkWinner(game.playerB.played, game.playerA.played)
                if (gameResult === "player B won") wins ++
               }
            })
            const updatedPlayerObject = {
                playerName: name,
                gamesPlayed: gamesPlayed,
                winRatio: `${Math.round(wins/gamesPlayed * 100)}%`,
                rocksUsed: rocks,
                papersUsed: papers,
                scissorsUsed: scissors,
                wins: wins 
            }
            listOfPlayerFull[index] = updatedPlayerObject
        })
        handleSetDatabase()
    }

    const handleSetDatabase = () => {
        UserData.deleteMany({}) 
        const userdata = new UserData({
            recentDate: recentDate,
            data: listOfPlayerFull
        })
        userdata.save()
    }

    const checkWinner = (pickA, pickB) => {
        if (pickA === pickB) {
            return "Draw"
        }
        if ((pickA === "PAPER" && pickB === "ROCK") || (pickA === "SCISSORS" && pickB === "PAPER") || (pickA === "ROCK" && pickB === "SCISSORS")) {
            return "player A won"
        }
        if ((pickA === "ROCK" && pickB === "PAPER") || (pickA === "PAPER" && pickB === "SCISSORS") || (pickA === "SCISSORS" && pickB === "ROCK")) {
            return "player B won"
        }
    }

    const handleData = async (currentPageData) => {
        await currentPageData.forEach(gameData => {
            if (recentDate < gameData.t ) recentDate = gameData.t 
            listOfGames.push(gameData)

            if (!listOfNames.includes(gameData.playerA.name)) {
                listOfNames.push(gameData.playerA.name)
                listOfPlayerFull.push({
                    playerName: gameData.playerA.name,
                    gamesPlayed: 0,
                    winRatio: 0,
                    rocksUsed: 0,
                    papersUsed: 0,
                    scissorsUsed: 0,
                    gamesParticipated: []
                })
            }

            if (!listOfNames.includes(gameData.playerB.name)) {
                listOfNames.push(gameData.playerB.name)
                listOfPlayerFull.push({
                    playerName: gameData.playerB.name,
                    gamesPlayed: 0,
                    winRatio: 0,
                    rocksUsed: 0,
                    papersUsed: 0,
                    scissorsUsed: 0,
                    gamesParticipated: []
                })
            }  
        })
    }

    const fetchNewCursor = async (urlParameter) => {
        let response = await axios.get(`https://bad-api-assignment.reaktor.com${urlParameter}`)
        if (response.data.hasOwnProperty("cursor")){
            counter ++
            console.log(counter)
            if (!response.data.cursor) {
                console.log("finished!")
                handleUpdatePlayerDatas()
                return
            }
            handleData(response.data.data)
            fetchNewCursor(response.data.cursor)
        } 
    }  
    fetchNewCursor("/rps/history")
}

export default router;
