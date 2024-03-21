
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [emailError, setEmailError] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === '') {
            setEmailError('Email address is required');
            return;
        } else {
            setEmailError('');
        }

        // Check if passwords are entered
        if (currentPassword === '') {
            setError('Current password is required');
            return;
        }
        if (newPassword === '') {
            setError('New password is required');
            return;
        }

    axios.post('http://localhost:3001/reset-password', { email, currentPassword, newPassword })
    .then(response => {
        if (response.data.success) {
            setSuccess(true); // Password reset successful
            setError('');
            navigate('/');
        } else {
            // Check for specific error messages
            if (response.status === 404) {
                setError('Email does not match any existing credentials.');
            } else if (response.status === 401) {
                setError('Incorrect current password.');
            } else {
                setError('An error occurred. Please try again later.');
            }
            setSuccess(false);
        }
    })
    .catch(err => {
        // Handle other errors
        if (err.response && err.response.status === 401) {
            setError('Incorrect current password or email.');
        } else {
            setError('An error occurred. Please try again later.');
        }
        console.error("Error:", err);
        setSuccess(false);
    });

    }
    return (
        <div className='login'>
            <h3>Reset Password</h3>
            <form id="login-form" onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>Password reset successful!</p>}
                <div className="form-group">
                    <label>Email Address</label>
                    <input style={{marginLeft: '26px'}} type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <span className="error" id="emailerror">{emailError}</span>
                </div>
                <div className="form-group">
                    <label>Current Password</label>
                    <input  type="password" name="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label>New Password</label>
                    <input style={{marginLeft: '22px'}} type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
                </div>
                <button type="submit" name="login_submit" style={{marginLeft: '190px'}}>Reset Password</button>
            </form>
        </div>
    );
}

export default ResetPassword;
