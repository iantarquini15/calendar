import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar } from 'react-big-calendar';
import { CalendarEventBox, CalendarModal, FabAddNew, FabDelete, NavBar } from "../";
import { localizer } from '../../helpers';
import { useAuthStore, useCalendarStore } from '../../hooks';
import { useEffect, useState } from 'react';
import { useUiStore } from '../../hooks/useUiStore';






export const CalendarPage = () => {
  
  const { user } = useAuthStore(); 
  const { openDateModal } = useUiStore();
  const { events,setActiveEvent, startLoadingEvents } = useCalendarStore();
  
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week' )

  const eventStyleGetter = (event,start,end,isSelected) => {
   
    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );
    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
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
    
    setActiveEvent(event);
  }

  const onViewChanged = (event) => {
    console.log({ viewChanged: event });
    setLastView(event);
  }
  
  useEffect(() => {
    startLoadingEvents()
  }, [])
  

  return (
    <div>
    <NavBar />
    
     <Calendar
      localizer={localizer}
      events={events}
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
      <FabAddNew />
      <FabDelete />
    </div>
  )
}
