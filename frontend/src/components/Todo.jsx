import React from 'react'

function Todo({title,description,completed}) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <div>
        <button>Status:{completed == true ? 'Accomplished' : 'Not completed yet'}</button>
      </div>
    </div>
  )
}

export default Todo
