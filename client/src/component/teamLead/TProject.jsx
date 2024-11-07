import React, { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from '../../context/EmployeeContext'
import '../../styles/teamlead/TLeaveRequest.css'
import '../../styles/teamlead/TProject.css'
import { FaRegCalendar } from "react-icons/fa";

import axios from 'axios';
import moment from 'moment';
import ShiningText from '../text/ShiningText';
import ProgressBar from '../bar/ProgressBar';
function TProject() {
  const { projects } = useContext(EmployeeContext)
  const [popup, setPopup] = useState(false)
  const [currentItem, setCurrentItem] = useState()


 
  function handlePopup(item) {
    setCurrentItem(item)
    setPopup(true)
  }
  console.log(projects)

  return (
    <div>
      {popup ? (
        <>
          <div className="popup-overlay">
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
              </div>
            </div>
          </div>

        </>
      ) : null}
      <div className='outlet_title'>
        <div>
          <ShiningText text="Projects" />
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
            {projects.map((item, index) => (
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

export default TProject