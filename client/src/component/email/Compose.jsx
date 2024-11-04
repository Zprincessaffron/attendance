import React, { useContext, useEffect, useState } from "react";
import "../../styles/email/Inbox.css";
import { useNavigate } from "react-router-dom";
import { EmployeeContext } from "../../context/EmployeeContext";
import axios from "axios";
import moment from 'moment-timezone';
import '../../styles/email/Compose.css'
import { MdOutlineDelete } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import ShiningText from "../text/ShiningText";

const Compose = () => {
  const { employeeData, allEmployeesData } = useContext(EmployeeContext);
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [tag,setTag]=useState('') 
  
  useEffect(() => {
    setEmailSuggestions(allEmployeesData);
  }, [allEmployeesData]);

  const [email, setEmail] = useState({
    to: [],
    subject: '',
    message: '',
  });
   console.log(email.to[0])
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "to") {
      setInputValue(value);
      const filteredSuggestions = emailSuggestions.filter((suggestion) =>
        suggestion.employeeId.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 0);
    } else {
      setEmail((prevEmail) => ({ ...prevEmail, [name]: value }));
    }
  };

  const handleSuggestionClick = (employee) => {
    if (!email.to.includes(employee.employeeId)) {
      setEmail((prevEmail) => ({
        ...prevEmail,
        to: [...prevEmail.to, employee.employeeId],
      }));
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const handleRemoveRecipient = (id) => {
    setEmail((prevEmail) => ({
      ...prevEmail,
      to: prevEmail.to.filter((recipient) => recipient !== id),
    }));
  };

  async function handleSend() {
    try {
      const response = await axios.post('/email/send', {
        subject: email.subject,
        message: email.message,
        senderName: employeeData.name,
        senderId: employeeData.employeeId,
        receiverId: email.to,
        receiverName: "prem",
        tags: tag
      });
      console.log(response.data);
      handleDiscard()
    } catch (err) {
      console.error(err);
    }
  }

  const handleDiscard = () => {
    setEmail({
      to: [],
      subject: '',
      message: '',
    });
    setInputValue("");
  };
  function handleTagChange(val){
    setTag(val)

  }

  return (
    <div>
      <div className='outlet_title'>
        <div>
          <ShiningText text='compose'/>
        </div>
      </div>
      <div className="table-container">
        <div className="compose-container">
          <div>
          <h2>New Message</h2>
          <div className="compose-tags">
              <button className={`work ${tag == 'work'?"true":""}`} onClick={()=>handleTagChange('work')}>Work</button>
              <button className={`alert ${tag == 'alert'?"true":""}`}  onClick={()=>handleTagChange('alert')}>Alert</button>
              <button   className={`news ${tag == 'news'?"true":""}`}   onClick={()=>handleTagChange('news')}>News</button>
          </div>

            </div>
          <div className="input-group">
            <div className="selected-recipients">
              {email.to.map((recipient, index) => (
                <div key={index} className="recipient-chip">
                  {recipient}
                  <IoMdClose
                    className="remove-icon"
                    onClick={() => handleRemoveRecipient(recipient)}
                  />
                </div>
              ))}
              <input
                type="text"
                name="to"
                placeholder="To"
                value={inputValue}
                onChange={handleChange}
                onFocus={() => setShowSuggestions(inputValue.trim() !== "")}
                className="compose-input"
                autoComplete="off"
              />
            </div>
            {showSuggestions && (
              <ul className="suggestions-list">
                {suggestions.map((employee, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(employee)}>
                    {employee.employeeId} - {employee.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={email.subject}
            onChange={handleChange}
            className="compose-input"
          />
          <textarea
            name="message"
            placeholder="Write your message..."
            value={email.message}
            onChange={handleChange}
            className="compose-textarea"
          ></textarea>
          <div className="compose-buttons">
            <button className="discard-button" onClick={handleDiscard}>
              <MdOutlineDelete />
            </button>
           
            <button className="send-button" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compose;
