import React from 'react'

export default function AddEvent(props) {
  const {state, dispatch, handleAddEventForm} = props;

  return (
    <div>
      <h3>Add Event</h3>
      <form id="add-event" action="#" onSubmit={handleAddEventForm}>
        <fieldset>
          <label>Event ID&nbsp;
            <input
              type="text"
              id="add-event-id"
              value={state.id}
              onChange={e => 
                dispatch({
                  type: "editId",
                  payload: e.target.value
                })
              }
            />
          </label><br/><br/>
          <label>Name&nbsp;
            <input
              type="text"
              id="add-event-name"
              value={state.name}
              onChange={e => 
                dispatch({
                  type: "editName",
                  payload: e.target.value
                })
              }                
            />
          </label><br/><br/>
          <label>Date&nbsp;
            <input
              type="date"
              id="add-event-date"
              value={state.date}
              onChange={e => 
                dispatch({
                  type: "editDate",
                  payload: e.target.value
                })
              } 
            />
          </label><br/><br/>
          <label>Description&nbsp;
            <input
              type="text"
              id="add-event-description"
              value={state.description}
              onChange={e => 
                dispatch({
                  type: "editDescription",
                  payload: e.target.value
                })
              } 
            />
          </label><br/><br/>
          <label>Category&nbsp;
            <input
              type="text"
              id="add-event-category"
              value={state.category}
              onChange={e => 
                dispatch({
                  type: "editCategory",
                  payload: e.target.value
                })
              } 
            />
          </label><br/><br/>
        </fieldset>
        <input type="submit" />
      </form>
    </div>
  )
}
