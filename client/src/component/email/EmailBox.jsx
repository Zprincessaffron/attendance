import React, { useState, useRef, useContext, useEffect } from "react";
import "../../styles/email/EmailBox.css";
import { IoClose } from "react-icons/io5";
import { FaMinus } from "react-icons/fa6";
import { AiOutlineMinus } from "react-icons/ai";
import { EmployeeContext } from "../../context/EmployeeContext";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
const EmailBox = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const emailBoxRef = useRef(null);
  const { showEmailBox,setShowEmailBox,employeeData, allEmployeesData } = useContext(EmployeeContext)
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [tag,setTag]=useState('') 
  // Toggle minimized state
  const toggleMinimize = () => { 
    setIsMinimized(!isMinimized);
  };

  // Handle drag and drop
  const startDrag = (e) => {
    const box = emailBoxRef.current;
    const offsetX = e.clientX - box.getBoundingClientRect().left;
    const offsetY = e.clientY - box.getBoundingClientRect().top;

    const onMouseMove = (moveEvent) => {
      setPosition({
        x: moveEvent.clientX - offsetX,
        y: moveEvent.clientY - offsetY,
      });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };


  ///handling inputs and sending emails
  
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
      {!isMinimized && (
        <div
          className="email-box"
          style={{ top: `${position.y}px`, left: `${position.x}px` }}
          ref={emailBoxRef}
        >
          <div className="header" onMouseDown={startDrag}>
            Email Box
           <div className='email_minusdiv'>
           <button className="minimize-button" onClick={toggleMinimize}>
              <AiOutlineMinus/>
            </button>
            <button className="minimize-button" onClick={()=>setShowEmailBox(false)}>
              <IoClose/>
              </button>
           </div>
          </div>
          <div className="content">
            
          <div>
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


           <div className="emailbox_sendbtn">


<button className="button_emailboxx"   onClick={handleSend}>
  <div className="outline"></div>
  <div className="state state--default">
    <div className="icon">
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g style={{ filter: "url(#shadow)" }}>
          <path
            d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z"
            fill="currentColor"
          ></path>
          <path
            d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z"
            fill="currentColor"
          ></path>
        </g>
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0" dy="1" stdDeviation="0.6" floodOpacity="0.5" />
          </filter>
        </defs>
      </svg>
    </div>
    <p>
      <span style={{ "--i": 0 }}>S</span>
      <span style={{ "--i": 1 }}>e</span>
      <span style={{ "--i": 2 }}>n</span>
      <span style={{ "--i": 3 }}>d</span>
    
    </p>
  </div>
  <div className="state state--sent">
    <div className="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        strokeWidth="0.5px"
        stroke="black"
      >
        <g style={{ filter: "url(#shadow)" }}>
          <path
            fill="currentColor"
            d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z"
          ></path>
          <path
            fill="currentColor"
            d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z"
          ></path>
        </g>
      </svg>
    </div> 
    <p>
      <span style={{ "--i": 5 }}>S</span>
      <span style={{ "--i": 6 }}>e</span>
      <span style={{ "--i": 7 }}>n</span>
      <span style={{ "--i": 8 }}>t</span>
    </p>
  </div>
</button>




           </div>
          </div>
        </div>
      )}
      {isMinimized && (
        <div className="minimized-box" onClick={toggleMinimize}>
          Email Box
        </div>
      )}
    </div>
  );
};

export default EmailBox;
