import { useEffect, useState } from 'react';
import historyServices from './services/history';

function App() {

  const [data, setData] = useState(null)

  useEffect(() => {
    historyServices.getData().then((response) => {
      setData(response.data)
    })
  }, [])

  const handleHistoryCall = () => {
    historyServices.history().then(response => {
      console.log(response)
    })
  }

  const handleUpdateData = () => {
    historyServices.updateHistory().then(response => {
      console.log("update data")
    })
  }

  return (
    <div className="App">
      <button onClick={handleHistoryCall}>Make a history call</button>
      <button onClick={handleUpdateData}>Update data</button>
    </div>
  );
}
export default App;