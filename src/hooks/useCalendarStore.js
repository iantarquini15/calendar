import { useDispatch, useSelector } from 'react-redux';
import calendarApi from '../api/calendarApi';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';
 
export const useAuthStore = () => {
 
    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();
 
    const startLogin = async ( { email, password } ) => {
 
        dispatch( onChecking() );
 
        try {
 
            const { data } = await calendarApi.post( '/auth', { email, password } );
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            dispatch( onLogin( { name: data.name, uid: data.uid } ) );
            console.log( { data } );
 
        } catch ( error ) {
            console.log( error );
            dispatch( onLogout( 'Incorrect Credentials' ) );
            setTimeout( () => {
                dispatch( clearErrorMessage() );
            }, 10 );
        }
    };
 
    const startRegister = async ( { email, password, name } ) => {
 
        dispatch( onChecking() );
        console.log( { email, password, name } );
 
        try {
 
            const { data } = await calendarApi.post( '/auth/new', { email, password, name } );
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            dispatch( onLogin( { name: data.name, uid: data.uid } ) );
 
 
        } catch ( error ) {
            console.log( error );
            dispatch( onLogout( error.response.data?.msg || 'Incorrect credentials' ) );
            setTimeout( () => {
                dispatch( clearErrorMessage() );
            }, 10 );
        }
    };
 
    const checkAuthToken = async () => {
 
        const token = localStorage.getItem( 'token' );
        if ( !token ) return dispatch( onLogout() );
 
        try {
 
            const { data } = await calendarApi.get( 'auth/renew' );
            console.log( { data } );
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            dispatch( onLogin( { name: data.name, uid: data.uid } ) );
 
        } catch ( error ) {
            localStorage.clear();
            dispatch( onLogout() );
            console.log( error );
        }
    };
 
    const StartLogout = () => {
        localStorage.clear();
        dispatch( onLogout() );
    };
 
    return {
        //* Propiedades
        status,
        user,
        errorMessage,
 
        //* Metodos
        startLogin,
        startRegister,
        checkAuthToken,
        StartLogout
 
    };
};
