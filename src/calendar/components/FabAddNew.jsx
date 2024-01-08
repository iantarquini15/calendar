import React from 'react'
import { useCalendarStore, useUiStore } from '../../hooks'
import { addHours } from 'date-fns';

export const FabAddNew = () => {

    const {openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore()

    const handldeNewEvent = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            user: {
            id: 12345,
            name: 'Ian',
        }})
        openDateModal();
    }

  return (
   <button className='btn btn-primary fab'
           onClick={handldeNewEvent}>
   <i className='fas fa-plus'></i>
   </button>
  )
}
