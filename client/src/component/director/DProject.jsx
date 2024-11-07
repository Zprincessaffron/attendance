import React, { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from '../../context/EmployeeContext'
import '../../styles/teamlead/TLeaveRequest.css'
import '../../styles/teamlead/TProject.css'
import { FaRegCalendar } from "react-icons/fa";
import '../../styles/director/DProject.css'
import axios from 'axios';
import moment from 'moment';
import ShiningText from '../text/ShiningText';
import ProgressBar from '../bar/ProgressBar';
import ProjectPopupForm from '../teamLead/ProjectPopupForm';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';

function DProject() {
  const { projects } = useContext(EmployeeContext)
  const [popup, setPopup] = useState(false)
  const [currentItem, setCurrentItem] = useState()
  const [sortedProjects, setSortedProjects] = useState([])
  const [selectedValue, setSelectedValue] = useState('All');
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showNormal, setShowNormal] = useState(true)
  const [formData, setFormData] = useState({
    status: '',
    progress: 0,
    endDate: new Date()
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, endDate: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/project/${currentItem._id}`, formData);
      toast('project updated ')
      setShowNormal(true)
      setPopup(false)
    } catch (error) {
      console.error('There was an error submitting the data!', error);
    }
  };

  // Function to handle radio button change
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value)
    const values = event.target.value.toLowerCase()
    if (values == 'all') {
      setSortedProjects(projects)
      console.log("projects", projects)
    } else {
      const filterProjectsByDepartment = projects.filter(project => project.department === values);
      setSortedProjects(filterProjectsByDepartment)
    }


  };


  function handlePopup(item) {
    setCurrentItem(item)
    setPopup(true)
  }
  console.log(projects)

  useEffect(() => {
    setSortedProjects(projects)

  }, [])

  return (
    <div>
      {showProjectForm ? (<ProjectPopupForm setShowProjectForm={setShowProjectForm} />) : null}
      {popup ? (
        <>
          <div className="popup-overlay">
            {showNormal ? (
              <>
                <div className="popup-container">

                  <h2 className="popup-title">{currentItem.projectName}</h2>
                  <div className="popup-content">
                    <div>
                      <span>Created By:</span> <span>{currentItem.createdBy}</span>
                    </div>
                    <div>
                      <span>Created:</span> <span><FaRegCalendar /> {currentItem.createdDate.split('T')[0]}</span>
                    </div>

                    <div>
                      <span>Started:</span> <span><FaRegCalendar /> {currentItem.startDate.split('T')[0]}</span>
                    </div>
                    <div>
                      <span>Deadline:</span> <span><FaRegCalendar /> {currentItem.deadlineDate.split('T')[0]}</span>
                    </div>
                    <div>
                      <span>EndDate:</span> <span> {currentItem.endDate ? (<> <FaRegCalendar /> currentItem.endDate.split('T')[0] </>) : "Not completed"}</span>
                    </div>
                    <div>
                      <span>Status:</span> <span className={`status_popupp ${currentItem.status}`}>{currentItem.status}</span>
                    </div>
                    <div className='popup_progress'>
                      <span>Progress:</span> <span> <ProgressBar value={currentItem.progress} /> </span>
                    </div>
                  </div>
                  <div className='popup_bottomm'>
                    <button className="popup-close-button" onClick={() => setPopup(false)}>Close</button>
                   {currentItem.status != 'completed' ?( <button className="popup-update-button" onClick={() => setShowNormal(false)}>Update</button>):null}
                  </div>
                </div>
              </>
            )
          :(
            <>
              <div className="project-form-container">
                <form onSubmit={handleSubmit} className="employee-form">
                  {/* Status Selector */}
                  <label htmlFor="status">Status:</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="input-select">
                    <option value="active">active</option>
                    <option value="completed">completed</option>
                    <option value="pending">pending</option>
                  </select>

                  {/* Progress Bar */}
                  <label htmlFor="progress">Progress:</label>
                  <input
                    type="range"
                    name="progress"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={handleInputChange}
                    className="input-range"
                  />
                  <span>{formData.progress}%</span>

                  {/* End Date Picker */}
                  <label htmlFor="endDate">End Date:</label>
                  <DatePicker
                    selected={formData.endDate}
                    onChange={handleDateChange}
                    className="input-datepicker"
                  />
                  <div className='popup_bottomm'>
                  <button type="submit" className="popup-update-button">update</button>
                  <button type="button" className="popup-close-button" onClick={()=>setShowNormal(true)}>cancel</button>
                    </div>

                 
                </form>
              </div>
            </>
          )}


          </div>


        </>
      ) : null}

      <div className='outlet_title'>
        <div>
          <ShiningText text="Projects" />
        </div>
        <div>
          <button className='addproject_btn' onClick={() => setShowProjectForm(true)}>
            New Project
          </button>
        </div>


      </div>
      <div className='outlet_title'>
        <div>
          <div className="radio-input">
            <input
              value="All"
              name="value-radio"
              id="All"
              type="radio"
              checked={selectedValue === 'All'}
              onChange={handleRadioChange}
            />
            <label htmlFor="All">All</label>

            <input
              value="Development"
              name="value-radio"
              id="Development"
              type="radio"
              checked={selectedValue === 'Development'}
              onChange={handleRadioChange}
            />
            <label htmlFor="Development">Development</label>

            <input
              value="Digitalmarketing"
              name="value-radio"
              id="Digital"
              type="radio"
              checked={selectedValue === 'Digitalmarketing'}
              onChange={handleRadioChange}
            />
            <label htmlFor="Digital">Digital Marketing</label>

            <input
              value="Sales"
              name="value-radio"
              id="Sales"
              type="radio"
              checked={selectedValue === 'Sales'}
              onChange={handleRadioChange}
            />
            <label htmlFor="Sales">Sales</label>

          </div>
        </div>


      </div>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>S1.No</th>
              <th>Name</th>
              <th>Started</th>
              <th>Deadline</th>
              <th>Ended</th>
              <th>progress</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {sortedProjects.map((item, index) => (
              <tr key={index} onClick={() => handlePopup(item)} >
                <td>{index + 1}</td>
                <td>{item.projectName}</td>
                <td>{item.startDate.split('T')[0]}</td>
                <td>{item.deadlineDate.split('T')[0]}</td>
                <td>
                  {item.endDate ? item.endDate.split("T")[0] : "-"}
                </td>
                <td>
                  <ProgressBar value={item.progress} />
                </td>
                <td><p className={`table_status ${item.status}`}>{item.status}</p></td>
              </tr>
            ))}
          </tbody>
        </table>


      </div>
    </div>
  )
}

export default DProject