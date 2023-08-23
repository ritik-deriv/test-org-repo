import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import Todos from './Todos';


const TodoList = () => {
    const baseURL = "http://localhost:4000";

    const [ todos, setTodos ] = useState(null)
    const [ error, setError ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    const { user } = useAuthContext()

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await fetch(`${baseURL}/api/todos/getTodos`, {
                headers: {
                    'Authorization': `Bearer ${user.userJwt}`
                }
            })

            const json = await response.json()

            if (!response.ok) {
                setError(json.error)
            }

            if (response.ok) {
                console.log(json)
                setTodos(json)
                setLoading(false)
                // dispatch({type:"SET_WORKOUTS", payload: json})
            }
        }

        if (user) {
            fetchTodos()
        }

    }, [user])

    return (
        <div>
            { loading && <h1>loading...</h1> }
            { error && <div className='alert alert-danger'>{ error }</div> }

            <ul class="list-group">
                {todos && todos["todos"].map((todo) => <Todos key={todo["todoId"]} todo={todo}/>)}
            </ul>
        </div>
    )
}

export default TodoList