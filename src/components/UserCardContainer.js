import { useEffect, useState } from 'react';
import historyServices from '../services/history';
import UserCard from './UserCard';
import { Spinner } from 'react-bootstrap';

function UserCardContainer() {


    const [allUsers, setAllUsers] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        (async () => {
          handleUpdateData()
          let userData;
          try {
            const response = await historyServices.getData()
            userData = response.data
          } catch (error) {
            console.log(error)
            userData = [];
          }
          setAllUsers(userData)
          setUsers(userData)
        })();
    }, [])

    const handleUpdateData = () => {
        historyServices.updateHistory().then(response => {
        if (response.data === "Data not found") {
            historyServices.history()
        }
        })
    }

    const filterCards = (e) => {
        const value = e.target.value.toLowerCase()
        const filteredUsers = allUsers.filter(user => (
          `${user.playerName}`.toLocaleLowerCase().includes(value)
        ))
        setUsers(filteredUsers)
    }


    return (
        <div className='page-content'>
          <h1>Player history</h1>
          <input className="search-box" placeholder="Search..." onInput={filterCards}></input>
          <div className="cards-container">
            {users.length === 0 ? 
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                :
                users.map((user, index) => (
                <UserCard userData={user} key={index} />
                ))
            } 
          </div>
        </div>
    )
}

export default UserCardContainer
