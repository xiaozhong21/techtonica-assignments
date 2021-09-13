import React from 'react'

export default function DeleteUser(props) {
  const {deleteId, setDeleteId, handleDeleteUserForm} = props;
  
  return (
    <div>
      <h3>Delete User</h3>
      <form id="delete-user" action="#" onSubmit={handleDeleteUserForm}>
        <fieldset>
          <label>User ID&nbsp;
            <input 
              type="number" 
              id="delete-user-id"
              value={deleteId}
              onChange={(e) => setDeleteId(parseInt(e.target.value))} />
          </label>
        </fieldset>
        <input type="submit" />
      </form>
    </div>
  )
}
