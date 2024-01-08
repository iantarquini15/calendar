import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { getEnvVariables } from '../helpers';
import { useAuthStore } from '../hooks';
import { useMemo } from 'react';
import { useEffect } from 'react';


export const AppRouter = () => {
    
    const { status, checkAuthToken } = useAuthStore()
    const isAuthenticated = useMemo(() => status === 'authenticated', [status])
 
    useEffect(() => {
        checkAuthToken()
    }, [])
 
    if (status === 'checking') return (<h3>Revisando autenticacion...</h3>)
 
    return (
        <Routes>
            {
                isAuthenticated
                    ? (<Route path='/' element={<CalendarPage />} />)
                    : (<Route path='/' element={<LoginPage />} />)
            }
 
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}
