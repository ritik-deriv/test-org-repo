import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const baseURL = "http://localhost:4000";

    const navigation = useNavigate();

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password ) => {

        setIsLoading(true)
        setError(null)

        const response = await fetch(`${baseURL}/api/users/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        })

        const json = await response.json()

        if (!response.ok){
            setIsLoading(false)
            setError(json.error)
        } 

        if (response.ok) {
            // save the user to local storage 
            // only the email and the JWT token so that the user would stay login even if the the browser is close 
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({ type: 'LOGIN', payload: json})

            setIsLoading(false)
            navigation("/");
        }
    }

    return { login, isLoading, error }
} 