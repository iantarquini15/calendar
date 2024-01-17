import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onloadEvents } from "../store";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
 
    const dispatch = useDispatch();
    const { events , activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent(calendarEvent) );
    }

    const startSavingEvent = async( calendarEvent ) => {
        
        try {

            if(calendarEvent.id){
                //actualizando
                 await calendarApi.put(`/events/${ calendarEvent.id } ` , calendarEvent );
                dispatch(onUpdateEvent({ ...calendarEvent , user }));
                return;
        
               } 
                //creando
                const { data } = await calendarApi.post('/events' , calendarEvent );
                console.log({data});
                
                dispatch(onAddNewEvent({ ...calendarEvent , id: data.evento.id , user }));
                
               
        } catch (error) {

            console.log(error);
            Swal.fire('There is an Error trying to save ' , error.response.data.msg , 'error');
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
}
