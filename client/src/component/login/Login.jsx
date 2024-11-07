import React, { useContext, useState } from 'react';
import axios from 'axios'; // To make HTTP requests
import { useNavigate } from 'react-router-dom'; // For navigation after login
import { jwtDecode } from "jwt-decode";
import { EmployeeContext } from '../../context/EmployeeContext';
import "./Login.css"; 
import { CiUser } from "react-icons/ci";
import { TbPasswordMobilePhone } from "react-icons/tb";

import Lottie from 'lottie-react';
import animationData from '../../animation/animation1.json';

const Login = () => {
  const { employeeData,setEmployeeData }=useContext(EmployeeContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const [logged,setLogged] = useState(false)
  const navigate = useNavigate(); // To navigate after successful login
  console.log(email,password)
  const handleLogin = async (e) => {
    e.preventDefault();
    

    try {
      // Sending credentials to backend
      const response = await axios.post('/auth/login', {
        "employeeId":email.toUpperCase(),
        // "employeeId":"HRD1111",
        "password":password
      });

      // If login is successful, store data in localStorage
      const { data } = response;

      // Store token or any relevant data in localStorage
      const decodedToken = jwtDecode(data.token);

    // Extract relevant information from the token
    const { employeeId, role, department, name,accessCode  } = decodedToken;
    localStorage.setItem('token', data.token);


    // Store the extracted data in localStorage
    setEmployeeData(decodedToken)

    console.log("User data stored in local storage successfully.");

      // Navigate to dashboard or home page after login
      // navigate('/employee/home');
      setLogged(!logged)
      setTimeout(() => {
        if(accessCode == 100){
          navigate('/employee/home')
       }
       if(accessCode == 200){
        navigate('/tl/home')
     }
     if(accessCode == 300){
      navigate('/director/home')
   }
   if(accessCode == 'admin'){
    navigate('/admin/home')
 }
      }, 2000);


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
          <h2 className="title">Sign in</h2>
            <div className="input-field">
            <i className="fas fa-lock"><CiUser/></i>

              <input
                type="text"
                name='employeeId'
                value={email}
                placeholder='Employee ID'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
            <i className="fas fa-lock"><TbPasswordMobilePhone/></i>
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p className='login_forgetpw' onClick={()=>navigate('/forgot-password')}>forget password?</p>
            <button type="submit" className="login_btn">Login</button>
          </form>

        </div>
      </div>

    </div>
  );
};

export default Login;
