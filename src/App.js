import React, { useState } from 'react'
import Header from './components/Header';
import LiveGames from './components/LiveGames';
import UserCardContainer from './components/UserCardContainer';
import './App.css';
// import historyServices from './services/history';

function App() {

  const [ page, setPage ] = useState("LiveGames")

  // const handleHistoryCall = () => {
  //   historyServices.history().then(response => {
  //     console.log(response)
  //   })
  // }

  // const handleUpdateData = () => {
  //   historyServices.updateHistory().then(response => {
  //     console.log("update data")
  //   })
  // }

  /* <button onClick={handleHistoryCall}>Make a history call</button>
      <button onClick={handleUpdateData}>Update data</button> */ 

  return (
    <>
      <Header setPage={setPage} />
      {/* <button onClick={handleHistoryCall}>Make a history call</button> */} 
      {page === "LiveGames" && <LiveGames /> }
      {page === "PlayerHistory" && <UserCardContainer /> }
    </>
  );
}
export default App;