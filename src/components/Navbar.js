import React from 'react'
import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"


const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleLogout = () => {
        logout()
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-warning">
                <div class="container-fluid">
                    <Link className="navbar-brand ms-5" to="/">TodoList</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end me-5 ms-5" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        {
                            user ? 
                            <div className='navbar-nav'>
                                <Link className="nav-link active"to="/login" onClick={handleLogout}>Logout</Link>
                            </div>
                            :
                            <div className='navbar-nav'>
                                <Link className="nav-link active"to="/login">Login</Link>
                                <Link className="nav-link active"to="/signup">Signup</Link>
                            </div>
                        }
                        
                    </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar