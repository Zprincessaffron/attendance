import React, { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from '../../context/EmployeeContext'
import '../../styles/teamlead/TLeaveRequest.css'
import '../../styles/teamlead/TProject.css'
import { FaRegCalendar } from "react-icons/fa";
import '../../styles/director/DProject.css'
import axios from 'axios';
import moment from 'moment';
function DProject() {
  const { projects } = useContext(EmployeeContext)
  const [popup, setPopup] = useState(false)
  const [currentItem, setCurrentItem] = useState()
  const [sortedProjects, setSortedProjects] = useState([])
  const [selectedValue, setSelectedValue] = useState('All');

  // Function to handle radio button change
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value)
    const values = event.target.value.toLowerCase()
   if(values == 'all'){ 
    setSortedProjects(projects)
    console.log("projects",projects)
   }else{
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
      {popup ? (
        <>
          <div className='e_leavereq_pop'>
            <div className='e_leavereq_pop_1'>
              <div className='e_leavereq_pop_2'>
                <h5>{currentItem.projectName}</h5>
                <div className='t_project_pop21'>
                  <div >
                    <span>Created By:</span> <span>{currentItem.createdBy}</span>
                  </div>
                  <div >
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
                    <span>Status:</span> <span>{currentItem.status}</span>
                  </div>
                  <div>
                    <span>Progress:</span> <span><div className="progress-bar-container">
                      <div
                        className="progress-bar"
                        style={{ width: `${currentItem.progress}%` }}
                      ></div>
                    </div></span>
                  </div>
                  <div>
                    <span>Team Members:</span> <span>{currentItem.teamMembers.join(', ')}</span>
                  </div>
                </div>
              </div>
              <div className='e_leavereq_pop_3'>
                <button className='e_leavereq_pop_33' onClick={() => setPopup(false)} >Close</button>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <div className='outlet_title'>
        <div>
          Projects
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
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
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