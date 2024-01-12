import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';


/*const tempEvent = {
   _id: new Date().getTime(),
   title: 'Cumpleaños de Feli',
   notes: 'Hay que cocinar el asado',
   start: new Date(),
   end: addHours(new Date(), 2),
   user: {
      id: 12345,
      name: 'Ian',
   }
}*/
export const calendarSlice = createSlice({
   name: 'calendar',
    initialState: {
      isLoadingEvents : true,
       events: [/*tempEvent*/] ,
       activeEvent:null,
   },
   reducers: {
    onSetActiveEvent: (state, { payload } ) => {

           state.activeEvent = payload;
       },
    onAddNewEvent: (state , { payload }) => {
      state.events.push( payload );
      state.activeEvent = null;
    },
    onDeleteEvent : (state) => {
      if(state.activeEvent){
         
         state.events = state.events.filter( event => event._id !== state.activeEvent._id );
         state.activeEvent = null;
         
      }
    },
    onUpdateEvent : ( state , {payload}) => {
      state.events = state.events.map( event => {
         if(event._id === payload._id ){
            return payload;
         }
         return event;
      })
    },
    onloadEvents : ( state , { payload = [] }) => {
      state.isLoadingEvents = false;
      payload.forEach(event => {
         const exists = state.events.some( dbEvent => dbEvent.id === event.id );
         if(!exists){
            
            state.events.push(event);
         }
      });

    }
   }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent , onDeleteEvent , onUpdateEvent , onloadEvents} = calendarSlice.actions;