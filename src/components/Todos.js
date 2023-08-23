import React from 'react'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'



const Todos = ({ todo }) => {
    const baseURL = "http://localhost:4000";

    const { user } = useAuthContext()

    const [ status, setStatus ] = useState(todo["todostatus"])
    const [ error, setError ] = useState(null)

    const handleStatus = async (todoId) => {
        if (!user) {
            setError('You must be logged in')
            return
        }

        const body = {
            todoId: todoId
        }

        const response = await fetch(`${baseURL}/api/todos/updateTodoStatus`, {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user["userJwt"]}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok){
            setStatus(json["todoStatus"])
            setError(null)
            // dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }
    
    const handleDelete = async (todoId) => {
        if (!user) {
            setError('You must be logged in')
            return
        }

        const body = {
            todoId: todoId
        }

        const response = await fetch(`${baseURL}/api/todos/deleteTodo`, {
            method: 'DELETE',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user["userJwt"]}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok){
            setError(null)
            // dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    
    }

    return (
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div>
                {status ? <p><s>{todo["todo"]}</s></p> : <p>{todo["todo"]}</p> }
                <button type="button" class="btn btn-warning me-2" onClick={() => handleStatus(todo["todoid"])}>Done</button>
                <button type="button" class="btn btn-danger" onClick={() => handleDelete(todo["todoid"])}>Delete</button>     
                {error && <span>{ error }</span>}                  
            </div>
        </li>
    )
}

export default Todos