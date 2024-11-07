import React, { useContext, useState } from 'react';
import axios from 'axios'; // To make HTTP requests
import { useNavigate } from 'react-router-dom'; // For navigation after login
import { jwtDecode } from "jwt-decode";
import { EmployeeContext } from '../../context/EmployeeContext';
import "./Login.css";

const ForgotPassword = () => {
  const { employeeData,setEmployeeData}=useContext(EmployeeContext)
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [logged,setLogged] = useState(false)
  const navigate = useNavigate(); // To navigate after successful login
  console.log(email)
  const handleLogin = async (e) => {
    e.preventDefault();
    

    try {
      // Sending credentials to backend
      const response = await axios.post('/auth/forgot-password', {
        "email":email,
      });

      const datas = response.data
      console.log(datas)

    
    console.log("User data stored in local storage successfully.");

      // Navigate to dashboard or home page after login
      // navigate('/employee/home');
      setLogged(!logged)
      setTimeout(() => {
        navigate('/otp-verify', { state: email });

        
      }, 1000);

    } catch (err) {
      // Handle errors here (e.g., invalid credentials)
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
                type="email"
                name='email'
                value={email}
                placeholder='Enter email'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p onClick={()=>navigate('/forgot-password')}>forget password?</p>
            <button type="submit" className="btn solid">Submit</button>
          </form>

        </div>
      </div>

    </div>





  );
};

export default ForgotPassword;
