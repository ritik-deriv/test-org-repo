import React from 'react'

import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'

const Home = () => {
  return (
    <div>
      <h2>Homepage</h2>
      <TodoForm />
      <TodoList />
    </div>
  )
}

export default Home