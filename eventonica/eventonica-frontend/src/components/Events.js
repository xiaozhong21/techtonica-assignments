import React, { useState, useEffect, useReducer } from 'react';
import AddEvent from './AddEvent';
import DeleteEvent from './DeleteEvent';

//Define initialState and reducer function to track fields of newly added events
const initialState = {
  id: "",
  name: "",
  date: "",
  description: "",
  category: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "editId":
      return {...state, id: action.payload};     
    case "editName":
      return { ...state, name: action.payload };
    case "editDate":
      return {...state, date: action.payload};
    case "editDescription":
      return { ...state, description: action.payload };
    case "editCategory":
      return { ...state, category: action.payload };
    case "clearForm":
      return initialState;
    default:
      return state;
  }
};

export default function Events() {
  const [events, setEvents] = useState([]);
  const [deleteEventId, setDeleteEventId] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const getEvents = () => {
    return fetch("http://localhost:3000/events")
      .then(res => res.json())
      .then(res => setEvents(res));
  };

  useEffect(() => {
    getEvents();
  }, [state.id]);

  const addEvent = newEvent => {
    fetch("http://localhost:3000/events/add", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEvent)
    })
  };

  const deleteEvent = deleteEventId => {
    return fetch(`http://localhost:3000/events/${deleteEventId}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json'
       },
       body: null
    })
  };

  const handleAddEventForm = eventFormSubmit => {
    eventFormSubmit.preventDefault();
    const newEvent = {
      id: state.id,
      name: state.name,
      date: state.date,
      description: state.description,
      category: state.category
    };
    addEvent(newEvent);
    getEvents();
    dispatch({
      type: "clearForm"
    });
    window.location.reload();
  };

  const handleDeleteEventForm = deleteIdSubmit => {
    deleteIdSubmit.preventDefault();
    deleteEvent(deleteEventId);
    getEvents();
    setDeleteEventId("");
    window.location.reload();
  };

  const eventList = events.map((event) =>
  <li key={event.id}>
    Event ID: {event.id}<br/>
    Name: {event.name}<br/>
    Date: {event.date}<br/>
    Description: {event.description}<br/>
    Category: {event.category}<br/><br/>
  </li>
);

  return (
    <section className="event-management">
      <h2>Event Management</h2>
      <div className="event-body">
        <div className="event-list">
          <h3>All Events</h3>
          <ul id="events-list">
            {eventList}
          </ul>
        </div>
        <div className="event-form">
          <AddEvent 
            state={state} 
            dispatch={dispatch} 
            handleAddEventForm={handleAddEventForm} 
          />
          <DeleteEvent 
            deleteEventId={deleteEventId} 
            setDeleteEventId={setDeleteEventId} 
            handleDeleteEventForm={handleDeleteEventForm} 
          />
        </div>
      </div>
    </section>
  )
}
