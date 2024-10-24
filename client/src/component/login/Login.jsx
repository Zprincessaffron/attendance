import React, { useContext, useState } from 'react';
import axios from 'axios'; // To make HTTP requests
import { useNavigate } from 'react-router-dom'; // For navigation after login
import { jwtDecode } from "jwt-decode";
import { EmployeeContext } from '../../context/EmployeeContext';
const Login = () => {
  const { employeeData,setEmployeeData }=useContext(EmployeeContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // To navigate after successful login

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sending credentials to backend
      const response = await axios.post('/auth/login', {
        "employeeId":"HRD1234",
        // "employeeId":"HRD1111",
        "password":"12345678",
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
     if(accessCode == 100){
        navigate('/employee/home')
     }
     if(accessCode == 200){
      navigate('/tl/home')
   }


    } catch (err) {
      // Handle errors here (e.g., invalid credentials)
      setError('Invalid credentials, please try again');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
