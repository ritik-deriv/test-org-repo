
import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return(
        <form className="login" onSubmit={ handleSubmit }>
            <div className="col d-flex justify-content-center align-items-center mt-3">
                <h3>Log In</h3>
            </div>

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
            <div className="col d-flex justify-content-center align-items-center mt-3">
                <button class="btn btn-warning mt-2" disabled={isLoading}>Log In</button>
                { error && <div className="error">{error}</div> }
            </div>

        </form>
    )
}

export default Login

