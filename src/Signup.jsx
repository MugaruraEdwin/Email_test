// import React, {useState} from "react";
// import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from "react-router-dom";

// function Signup(){
//     const [firstname, setFirstName] = useState('');
//     const [lastname, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {

//         e.preventDefault();
//         axios.post('http://localhost:3001/register', { firstname, lastname, email, password})
//         .then(result => {
//             console.log(result);
//             navigate('/');
//         })
//         .catch(err => console.log(err));
// }

    
//     return(
//         <div className="login">
//             <h3>Register User</h3>
//             <form  id="signup-form" onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label>Firstname</label>
//                         <input type="text" name="firstname" id="firstname"  value={firstname} onChange={(e) => setFirstName(e.target.value)}></input>
//                     </div>
//                     <div className="form-group">
//                         <label>Lastname</label>
//                         <input type="text" name="lastname" id="lastname"  value={lastname} onChange={(e) => setLastName(e.target.value)}></input>
//                     </div>
//                     <div className="form-group">
//                         <label>Email add</label>
//                         <input type="email" name="email" id="email"  value={email} onChange={(e) => setEmail(e.target.value)} ></input>
//                     </div>
//                     <div className="form-group">
//                         <label>Password</label>
//                         <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
//                     </div>
//                     <button style={{marginLeft: '130px'}} type="submit" name="signup_submit">SignUp</button>
//             </form>
//         </div>
//     )
// }


// export default Signup;

import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function Signup() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const generateInitialPassword = () => {
        // Extract first 2 characters of first name and last 2 characters of last name
        const initialPassword = firstname.slice(0, 2) + lastname.slice(-2);
        // Append '@2024' to the initial password
        return initialPassword + '@2024';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Generate initial password
        const initialPassword = generateInitialPassword();

        axios.post('http://localhost:3001/register', { firstname, lastname, email, password: initialPassword })
            .then(result => {
                console.log(result);
                navigate('/success');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="login">
            <h3>Register User</h3>
            <form id="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Firstname</label>
                    <input type="text" name="firstname" id="firstname" value={firstname} onChange={(e) => setFirstName(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>Lastname</label>
                    <input type="text" name="lastname" id="lastname" value={lastname} onChange={(e) => setLastName(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>Email add</label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} ></input>
                </div>
                {/* Use a hidden input field for the password */}
                <input type="hidden" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button style={{ marginLeft: '130px' }} type="submit" name="signup_submit">SignUp</button>
            </form>
        </div>
    )
}

export default Signup;
