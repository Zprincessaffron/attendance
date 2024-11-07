import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { EmployeeContext } from './EmployeeContext';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ allowedRoles }) => {
  const { employeeData } =  useContext(EmployeeContext)
  
  useEffect(() => {
    try {
        const token =  localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        // Extract relevant information from the token
        const { employeeId, role, department, name } = decodedToken;
        setUserRole(decodedToken.accessCode)
        setTimeout(() => {
          isTokenExpired(decodedToken)
        }, 100);
    } catch (error) {   
      setTokenExp(true)
    }
  }, [ ])
  const [tokenExp,setTokenExp] = useState()
  const [userRole,setUserRole]=useState()
  const isTokenExpired = (decodedToken) => {
    if (!token) {
      setTokenExp(true)
      return
    }
    const currentTime = Date.now() / 1000; // current time in seconds
    const exp = decodedToken.exp < currentTime
    setTokenExp(exp)
  };
  

  // If userRole is in allowedRoles, allow access; otherwise, redirect to login
  return tokenExp? <Navigate to='/'/> : allowedRoles.includes(userRole) ? <Outlet /> : <div>loading...</div>
};

export default ProtectedRoute;