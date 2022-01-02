import Header from './components/Header';
import LiveGames from './components/LiveGames';
import UserCardContainer from './components/UserCardContainer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import historyServices from './services/history';

function App() {

  const handleHistoryCall = () => {
    historyServices.history().then(response => {
      console.log(response)
    })
  }

  // const handleUpdateData = () => {
  //   historyServices.updateHistory().then(response => {
  //     console.log("update data")
  //   })
  // }

  /* <button onClick={handleHistoryCall}>Make a history call</button>
      <button onClick={handleUpdateData}>Update data</button> */ 

  return (
    <Router>
      <Header />
      {/* <button onClick={handleHistoryCall}>Make a history call</button> */}
      <Switch>
        <Route path='/' exact render={() => <LiveGames />} />
        <Route path='/history' exact render={() => <UserCardContainer /> } />
      </Switch>
    </Router>
  );
}
export default App;