import axios from 'axios';
const baseUrl1 = '/api/history';
const baseUrl2 = '/api/update-history';
const baseUrl3 = 'api/get-history';

const history = async () => {
    const response = await axios.get(baseUrl1)
    return response.data
  };

const updateHistory = async () => {
  const response = await axios.get(baseUrl2)
  return response.data
}

const getData = async () => {
  const response = await axios.get(baseUrl3)
  return response.data
}
  
const historyServices = { history, updateHistory, getData };
  
export default historyServices;
