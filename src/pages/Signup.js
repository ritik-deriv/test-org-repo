import { useState } from 'react'
import { useSignUp } from '../hooks/useSignup'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')


  const { signup, error, isLoading } = useSignUp()

  const handleSubmit = async (e) => {
      e.preventDefault()
      console.log("TESTINF123")

      await signup(username, email, password)
  }

  return(
      <form className="login" onSubmit={ handleSubmit }>
          <div className="col d-flex justify-content-center align-items-center mt-3">
            <h3>Sign Up</h3>
          </div>

          <label>Username:</label>
          <input 
              type="text"
              onChange={(e) => setUsername(e.target.value)} 
              value={username}
              className="form-control"
          />

          <label>Email:</label>
          <input 
              type="email"
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
              className="form-control"
          />
          <label>Password:</label>
          <input 
              type="password"
              onChange={(e) => setPassword(e.target.value)} 
              value={password}
              className="form-control"
          />

          <div className="col d-flex justify-content-center align-items-center">
            <button class="btn btn-warning mt-2" disabled={isLoading}>Sign Up</button>
            { error && <div className="error">{error}</div> }
          </div>
      </form>
  )
}

export default Signup