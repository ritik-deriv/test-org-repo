import React from 'react'
import { useState } from 'react' 
import { useAuthContext } from '../hooks/useAuthContext';

const TodoForm = () => {
    const baseURL = "http://localhost:4000";

    const [ todo, setTodo ] = useState('')
    const [ error, setError ] = useState(null)

    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const todos = { 
            todo,  
            dateTime:  new Date().toISOString()
        }

        const response = await fetch(`${baseURL}/api/todos/createTodo`, {
            method: 'POST',
            body: JSON.stringify(todos),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user["userJwt"]}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            console.log("TEST", json)
            setError(json.error)
        }

        if (response.ok){
            setTodo('')
            setError(null)
            console.log("new todo added", json)
            // dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

    return (
        <div>
            {error && <div className='alert alert-danger'>{error}</div>}
            <h3>
                Todo Form    
            </h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    onChange={(e) => setTodo(e.target.value)}
                    value={todo}
                />
                
                <button>Add Todo</button>
            </form>
        </div>

        
    )
}

export default TodoForm