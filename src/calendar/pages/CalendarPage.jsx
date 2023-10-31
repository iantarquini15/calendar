import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns';
import { CalendarEventBox, CalendarModal, NavBar } from "../";
import { localizer } from '../../helpers';
import { LOCALSTORAGE } from 'localforage';
import { useUiStore } from '../../hooks/useUiStore';
import { useDispatch } from 'react-redux';




const event = [{
  title: 'Cumpleaños de Feli',
  notes: 'Hay que cocinar el asado',
  start: new Date(),
  end: addHours(new Date(), 2),
  user: {
    id: 12345,
    name:'Ian',
  }
}]

export const CalendarPage = () => {
  

  const { openDateModal } = useUiStore();
  
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week' )

  const eventStyleGetter = (event,start,end,isSelected) => {
   
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: '0.8',
      color:'white'
    }
    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    openDateModal();
  }

  const onSelect = (event) => {
    console.log({ click: event });
  }

  const onViewChanged = (event) => {
    console.log({ viewChanged: event });
    setLastView(event);
  }

  return (
    <div>
    <NavBar />
    
     <Calendar
      localizer={localizer}
        events={event}
        defaultView={lastView}
      startAccessor="start"
      endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        eventPropGetter={eventStyleGetter}
        components={{
          event:CalendarEventBox
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}

      />
      
      <CalendarModal />
    </div>
  )
}
