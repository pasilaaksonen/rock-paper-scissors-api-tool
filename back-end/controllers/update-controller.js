import express from 'express';
import axios from 'axios'
import UserData from '../models/user-model.js'
const router = express.Router();

export const updateHistory = async (req, res) => {

    let counter = 0
    let recentDate = null
    let newRecentDate = 0
    let listOfPlayerFull = null
    let listOfNames = []
    let newGamesFromCurrentCursor = []
    let allNewGames = []
    let id = null

    const handleUpdateDataBase = () => {
        listOfNames.forEach(name => {

            const index = listOfPlayerFull.findIndex(object => {
                return object.playerName === name
            })
            
            let wins = listOfPlayerFull[index].wins
            let rocks = listOfPlayerFull[index].rocksUsed
            let scissors = listOfPlayerFull[index].scissorsUsed
            let papers = listOfPlayerFull[index].papersUsed
            let gamesPlayed = listOfPlayerFull[index].gamesPlayed


            allNewGames.forEach(game => {
               
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
        UserData.findByIdAndDelete({_id: id}, (err) => {
            console.log("deleted")
        })
        const userdata = new UserData({
            recentDate: newRecentDate,
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

    const handleCheckForNewGames = (currentPageData) => {
        currentPageData.forEach(gameData => {
            if (gameData.t > recentDate) {
                if (gameData.t > newRecentDate) {
                    newRecentDate = gameData.t
                } 
                newGamesFromCurrentCursor.push(gameData)
            }
        })
        if (newGamesFromCurrentCursor.length === 0) return "Not found any new data"

        allNewGames = allNewGames.concat(newGamesFromCurrentCursor)
        newGamesFromCurrentCursor = []
        return "New data found"
    }

    const fetchNewCursor = async (urlParameter) => {
        let response = await axios.get(`https://bad-api-assignment.reaktor.com${urlParameter}`)
        if (response.data.hasOwnProperty("cursor")){
            counter ++
            console.log(counter)
            const checkingForNewData = handleCheckForNewGames(response.data.data)

            if (checkingForNewData === "New data found") {
                fetchNewCursor(response.data.cursor)
            }
            
            if (checkingForNewData === "Not found any new data") {
                handleUpdateDataBase()
                newGamesFromCurrentCursor = []
                allNewGames = []
                console.log("Finished with updating data")
                return
            }
        } 
    }

    const fetchDataForUpdate = () => {
        UserData.find({}, (err, data) => {
            if (err) console.log(err)
            else {
                id = data[0]._id.toString()
                // console.log(id)
                data[0].data.forEach(data => {
                    listOfNames.push(data.playerName)
                })
                recentDate = data[0].recentDate
                listOfPlayerFull = data[0].data
            }
        })
        fetchNewCursor("/rps/history")
    }
    fetchDataForUpdate()
}

export default router;
