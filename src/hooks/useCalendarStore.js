import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onloadEvents } from "../store";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";

export const useCalendarStore = () => {
 
    const dispatch = useDispatch();
    const { events,activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent(calendarEvent) );
    }

    const startSavingEvent = async( calendarEvent ) => {
        //TODO:Update event
       if(calendarEvent._id){
        //actualizando
        dispatch(onUpdateEvent({ ...calendarEvent }))

       } else {
        //creando
        const { data } = await calendarApi.post('/events' , calendarEvent );
        console.log({data});
        
        dispatch(onAddNewEvent({ ...calendarEvent , id: data.evento.id , user }));
        
       }
    }

    const startDeleteEvent = () => {
        dispatch( onDeleteEvent() );
    }

    const startLoadingEvents = async() => {
        try {
            const {data} = await calendarApi.get('/events');
           const events = convertEventsToDateEvents(data.eventos);
           dispatch( onloadEvents (events) );
           console.log(events);
        } catch (error) {
            console.log('Error al cargar eventos')
            console.log(error)
        }
    }

    return {
        //Propiedades//
        events,
        activeEvent,
        hasEventSelected : !!activeEvent ,
        
        //Metodos//
        setActiveEvent,
        startDeleteEvent,
        startLoadingEvents,
        startSavingEvent,
    }
}
