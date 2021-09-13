import React, { useState, useEffect } from 'react'

export default function FavoriteEvents() {
  const [users, setUsers] = useState([]);
  const [chosenUser, setChosenUser] = useState(0);
  const [favEvents, setFavEvents] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const getUsers = () => {
    return fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(res => setUsers(res));
  };

  const getFavoriteBoolean = () => {

  }

  useEffect(() => {
    getUsers();
  }, []);

  const updateJunctionTable = chosenUser => {
    return fetch(`http://localhost:3000/user-event/add/${chosenUser}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chosenUser)
    })
  }

  const getFavEvents = chosenUser => {
    return fetch(`http://localhost:3000/user-event/${chosenUser}`)
      .then(res => res.json())
      .then(res => setFavEvents(res))
  }

  const handleSubmitButton = buttonClick => {
    buttonClick.preventDefault();
    updateJunctionTable(chosenUser);
    getFavEvents(chosenUser);
  }

  const userList = users.map(user => 
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
    );

    const favEventsList = favEvents.map((favEvent, index) => 
      <li key={index}>
        {favEvent.EventId}<br/>
        <label>Favorite?
          <input
            onChange={() => setIsFavorite(!isFavorite)}
            type="checkbox"
            value={isFavorite ? 'on' : 'off'}
            />
        </label>
      </li>          
    );

  return (
    <div>
      <h2>Favorite Events</h2>
      <form>
        <label htmlFor='users'>Choose a user: </label>
        <select id='users' name='users' onChange={selectUser => setChosenUser(selectUser.target.value)}>
          <option value=''>Select</option>
          {userList}
        </select><br/><br/>
        <button onClick={handleSubmitButton}>Submit</button>
      </form>
      <ul className='fav-events-list'>
        {favEventsList}
      </ul>
    </div>
  )
}
