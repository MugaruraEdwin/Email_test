import React, {useState} from "react";
import axios from 'axios';
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post('http://localhost:3001/login', {
            email,
            password,
          })
          .then((result) => {
            if (result.data.status === 'Success') {
                navigate('/home');
              }else {
              setError(result.data); // Set error message received from the server
            }
          })
          .catch((err) => console.log(err));
      };
    
    return(
        <div className="login">
            <h3>User Login </h3>
            <form  id="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                    <label className="email_label">Email</label>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className="form-group">
                    <label>Pass</label>
                    <input type="password" name="password"  value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
                    </div>
                    <button type="submit" name="login_submit">Login</button>
            </form>
        </div>
    )
}


export default Login;