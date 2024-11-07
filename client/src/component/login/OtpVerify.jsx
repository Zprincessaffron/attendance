import React, { useContext, useState } from 'react';
import axios from 'axios'; // To make HTTP requests
import { useNavigate } from 'react-router-dom'; // For navigation after login
import { jwtDecode } from "jwt-decode";
import { EmployeeContext } from '../../context/EmployeeContext';
import "./Login.css";
import { useLocation } from 'react-router-dom';

const OtpVerify = () => {
  const { employeeData,setEmployeeData }=useContext(EmployeeContext)
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [logged,setLogged] = useState(false)
  const navigate = useNavigate(); 
  const location = useLocation();
  const email = location.state;
  console.log(email)
  const handleLogin = async (e) => {
    e.preventDefault();
    

    try {
      // Sending credentials to backend
      const response = await axios.post('/auth/reset-password', {
        "email":email,
        "otp":otp,
        newPassword
      });

      const datas = response.data
      console.log(datas)
      setLogged(!logged)
      setTimeout(() => {
        
      }, 1000);

    } catch (err) {
      setError('Invalid credentials, please try again');
    }
  };

  return (
<div className={`login_container ${logged}`}>
    <div className='login_conn_div1'>
      <h2>HEYRAM INFRASTRUCTURE</h2>
      <p>welcome to employee dashboard</p>
    
    </div>
       
      <div className="login_conn_div2">
       
        <div className="signin-signup">
        <form onSubmit={handleLogin}  action="#" className="sign-in-form">
          <h2 className="title">Forgot Password</h2>
            <div className="input-field">
            <i className="fas fa-lock"></i>

              <input style={{textTransform:"lowercase"}}
                type="text"
                name='otp'
                value={otp}
                placeholder='Enter otp'
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
            <i className="fas fa-lock"></i>

              <input style={{textTransform:"lowercase"}}
                type="password"
                name='newpassword'
                value={newPassword}
                placeholder='Enter new password'
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className="btn solid">Submit</button>
          </form>


        </div>
      </div>

    </div>





  );
};

export default OtpVerify;
