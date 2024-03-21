import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Success from './Success';
import ResetPassword from './ResetPassword';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
 
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/success' element={<Success />}></Route>
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
