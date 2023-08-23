import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from './hooks/useAuthContext';
import Navbar from './components/Navbar';

function App() {

  const { user } = useAuthContext()

  return (
    <BrowserRouter>
      <div className='container'>
        <div className="row align-items-center">
        <Navbar />
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to='/login' />  }></Route>
            <Route path="/login" element={!user ? <Login /> : <Navigate to='/' /> }></Route>
            <Route path="/signup" element={!user ? <Signup />: <Navigate to='/' /> }></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
