import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';


const tempEvent = {
   title: 'Cumpleaños de Feli',
   notes: 'Hay que cocinar el asado',
   start: new Date(),
   end: addHours(new Date(), 2),
   user: {
      id: 12345,
      name: 'Ian',
   }
}
export const calendarSlice = createSlice({
   name: 'calendar',
    initialState: {
       events: tempEvent,
       activeEvent:null,
   },
   reducers: {
    increment: (state, /* action */ ) => {

           state.counter += 1;
       },
   }
});


// Action creators are generated for each case reducer function
export const { increment } = calendarSlice.actions;