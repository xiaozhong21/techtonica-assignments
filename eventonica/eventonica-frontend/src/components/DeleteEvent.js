import React from 'react'

export default function DeleteEvent(props) {
  const {deleteEventId, setDeleteEventId, handleDeleteEventForm} = props;

  return (
    <div>
      <h3>Delete Event</h3>
      <form id="delete-event" action="#" onSubmit={handleDeleteEventForm}>
        <fieldset>
          <label>Event ID&nbsp;
            <input 
              type="text" 
              id="delete-event-id"
              value={deleteEventId}
              onChange={e => setDeleteEventId(e.target.value)} />
          </label>
        </fieldset>
        <input type="submit" />
      </form>
    </div>
  )
}
