// src/components/EmailModule.js
import React, { useContext, useEffect, useState } from "react";
import "../../styles/email/Inbox.css";
import { useNavigate } from "react-router-dom";
import { EmployeeContext } from "../../context/EmployeeContext";
import axios from "axios";
import moment from 'moment-timezone';
const Inbox = () => {
      const [emails,setEmails]=useState([])
      const { employeeData }=useContext(EmployeeContext)
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 5;
      const totalPages = Math.ceil(emails.length / itemsPerPage);
      const today = new Date();
  
  // Format the date as a string (e.g., YYYY-MM-DD)
  const formattedDate = today.toISOString().split('T')[0]; // Outputs like '2024-10-24'
    
      const currentItems = emails.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
    
      const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
          setCurrentPage(newPage);
        }
      };
    
      const navigate = useNavigate();
    
      const handleEmailClick = (email) => {
        navigate("/employee/email-detail", { state: email });
      };

 async function getEmails() {
    try {
        const response = await axios.get(`/email/get/${employeeData.employeeId}`)
        console.log(response.data)
        setEmails(response.data)
        
      } catch (err) {
  
        console.log(err)
        console.log(err)
      }
  
    
 }
       
      useEffect(() => {
        getEmails()
       
        
      }, [])
      
    
    return (
        <div>

            <div className='outlet_title'>
                <div>
                    Inbox
                </div>


            </div>
            <div className="table-container">
            <div className="email-module">
      <div className="top-controls">
        <div className="control-left">
          <input type="checkbox" className="email-checkbox" />
          <button className="dropdown-button">▾</button>
          <button className="refresh-button">⟳</button>
          <button className="more-button">⋮</button>
        </div>
        <div className="pagination">
          <span className="pagination-info">
            {`${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(
              currentPage * itemsPerPage,
              emails.length
            )} of ${emails.length}`}
          </span>
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
      <table className="email-table">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((email, index) => (
            <tr
              key={index}
              className="email-row"
              onClick={() => handleEmailClick(email)}
            >
              <td>
                <input type="checkbox" className="email-checkbox" />
              </td>
              <td>
                <span className="star-icon">★</span>
              </td>
              <td className="email-sender">
                {email.senderName}
                {email.label && (
                  <span className={`email-label ${email.labelClass}`}>
                    {email.tags}
                  </span>
                )}
              </td>
              <td className="email-subject">{email.subject}</td>
              <td className="email-attachment">
                <span className="email-date">{email.date.split('T')[0] == formattedDate ?moment.utc(email.date).tz("Asia/Kolkata").format("hh:mm A"):email.date.split('T')[0] }</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

            </div>
        </div>
    );
};

export default Inbox;
