// src/components/EmailDetail.js
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import moment from 'moment-timezone';

const EmailDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { date,isOpened,message,senderId,senderName,subject,tags } = location.state;

  const handleBack = () => {
    navigate(-1); // Navigate back to the email list
  };
  console.log(date)

  return (
    <div>

      <div className='outlet_title'>
        <div>
          Inbox
        </div>


      </div>
      <div className="table-container">
      <div className="email-detail">
      <div className="detail-header">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
       
      </div>
      <div className="detail-info">
        <div className="sender-info">
         <div>
         <strong>{senderName}</strong> 
         <p>{senderId}</p>
         </div>
         {tags && <span className={`email-label ${tags.toLowerCase()}`}>{tags}</span>}
          
          <span className="email-date">{date.split('T')[0]} | {moment.utc(date).tz("Asia/Kolkata").format("hh:mm A")} </span>
        </div>
      </div>
      <div className="detail-content">
      <h2 className="email-subject">{subject}</h2>
        <p>{message}</p>
      </div>
    </div>

      </div> 
    </div>
  );
};

export default EmailDetail;
