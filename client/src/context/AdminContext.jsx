import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 

//   const login = () => {
//     sessionStorage.setItem('isAuthenticated', 'true'); // Change here
//     setIsAuthenticated(true);
//     navigate('/admindashboard/jobs');
//   };

//   const logout = () => {
//     sessionStorage.removeItem('isAuthenticated'); // Change here
//     setIsAuthenticated(false);
//     navigate('/adminlogin');
//   };

//   useEffect(() => {
//     const authStatus = sessionStorage.getItem('isAuthenticated'); // Change here
//     console.log("Checking auth status on mount:", authStatus);
//     if (authStatus === 'false') { // Changed to string comparison
//       setIsAuthenticated(false);
//     } else {
//       setIsAuthenticated(true);
//     }
//   }, []);

  return (
    <AdminContext.Provider value={{ setIsAuthenticated, isAuthenticated }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
