import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignUp = () => {
    const baseURL = "http://localhost:4000";

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (username, email, password ) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${baseURL}/api/users/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, email, password })
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
        }
    }

    return { signup, isLoading, error }
} 