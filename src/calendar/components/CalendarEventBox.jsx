import React from 'react'

export const CalendarEventBox = ({ event }) => {
    
    const { title, user } = event;
   
    
  return (
      <>
          <strong>{title}</strong>
          &nbsp; <br/>
          <p>{user.name}</p>
      </>
  )
}
