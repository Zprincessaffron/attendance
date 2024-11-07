import React, { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from '../../context/EmployeeContext'
import '../../styles/teamlead/TLeaveRequest.css' 
import axios from 'axios';
import moment from 'moment';
import { FaTicket } from "react-icons/fa6";
import '../../styles/teamlead/THome.css'
import { RiProjectorLine } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import Loader from '../loader/Loader';
import ShiningText from '../text/ShiningText';
import ProgressBar from '../bar/ProgressBar';
import { Tooltip } from 'react-tooltip'

function DHome() {
  const { setTodayAttendance, TodayAttendance,pendingLeave,setPendingLeave,setMydetail,activeProjects,setActiveProjects,allEmployeesData, setAllEmployeesData,loading,setLoading,projects, setProjects, employeeData, teamMembers, setTeamMembers, teamMembersData, setTeamMembersData } = useContext(EmployeeContext)
  const [ getData , setGetData]=useState(false)


  

  async function getProjects() {
    console.log("opening function1");
  
    // Attempt to fetch projects with retry logic
    const maxRetries = 5; // Maximum number of retries
    let retries = 0;
  
    while (retries < maxRetries) {
      try {
        const response = await axios.get(`/project/all`);
        setProjects(response.data.data);
        console.log(response.data.data)
        // Call setTeamMembersFunc after getting projects
        setTimeout(() => {
          setTeamMembersFunc(response.data.data);
        }, 2000);
        break; // Exit loop on success
      } catch (error) {
        console.error("Error in getProjects:", error);
        retries++;
        console.log(`Retrying getProjects due to error: Attempt ${retries}`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait before retrying
      }
    }
  }


  async function setTeamMembersFunc(project) {
    
    if(projects.length = 0 ){
      setGetData("hello")
      console.log("trying again....")
    }else{
      console.log("opening function2");
    const maxRetries = 2; // Maximum number of retries
    let retries = 0;
  
      try {
        console.log("projects",project)
        const activeProjects = project.filter(project => project.status === 'active');
        console.log("active projects",activeProjects)
        // Check if there are any active projects
        if (activeProjects.length > 0) {
          setActiveProjects(activeProjects)
          
          getEmployeesData(); 
        } else {
          console.log("No active projects found.");
          retries++;
          console.log(`Retrying setTeamMembersFunc: Attempt ${retries}`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait before retrying
        }
      } catch (error) {
        console.error("Error in setTeamMembersFunc:", error);
        retries++;
        console.log(`Retrying setTeamMembersFunc due to error: Attempt ${retries}`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait before retrying
      }
    }
  } 
  async function getEmployeesData() {
    console.log("opening function3");
  
    // Attempt to fetch employees data with retry logic
    const maxRetries = 5; // Maximum number of retries
    let retries = 0;
  
    while (retries < maxRetries) {
      try {
        const response = await axios.get(`/employee/teamlead`);
        console.log(response.data);
        const employees = response.data;
        const employeeIds = employees.map(employees => employees.employeeId);
        setTeamMembers(employeeIds)
  
        // Filter employees based on teamMembers
       setTeamMembersData(employees)
        break; // Exit loop on success
      } catch (error) {
        console.error("Error in getEmployeesData:", error);
        retries++;
        console.log(`Retrying getEmployeesData due to error: Attempt ${retries}`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait before retrying
      } finally {
       // Set loading to false here
        if(teamMembersData.length != 0 ){
          setGetData(true)
        }else{
          setLoading(false); 
        } 
      }
    }
  }
  
  async function getAllemployeesData(){
    try {
      const response = await axios.get(`/employee/all`);
      setAllEmployeesData(response.data);
    } catch (error) {
      console.error("Error:", error);
     
    }

  }
  async function getMyDetail(){
    try {
      const response = await axios.get(`/employee/filter/${employeeData.employeeId}`);
      setMydetail(response.data);
    } catch (error) {
      console.error("Error:", error);
     
    }

  }
  async function getPendingLeaveData(){
    try {
      const response = await axios.get(`/leave/pending`);
      const employees = response.data.data
      setPendingLeave(employees)

      
    } catch (err) {

      console.log(err)
      console.log(err)
    }
  }

  async function getTodayAttendanceData(){
    try {
      const response = await axios.get(`/attendance/today/all`);
      const employees = response.data

      setTodayAttendance(employees)
      
      
    } catch (err) {

      console.log(err)
      console.log(err)
    }
  }
  // useEffect to initiate the process
  useEffect(() => {
    setTimeout(() => {
      if(loading == true){
        getProjects();
        getAllemployeesData()
        getMyDetail()
        getTodayAttendanceData()
        getPendingLeaveData()
      }
    }, 2000);
  }, [getData]);
  

  return (
    <div>
      <div className='outlet_title'>
        <div>
          <ShiningText text="Home"/>

        </div>


      </div>
      {loading?
      (
        <div className='thome_loader'>
          <Loader/>
        </div>
      )
      :(
        <div className='thome_main'>
        <div className='thome_div1'>
          <div className='thome_div11'>
            <div className='thome_div111'>
              Leave Request
            </div>
            <div className='thome_div112'>
            <p>{pendingLeave.length}</p>
              <div><FaTicket /></div>
            </div>

          </div>

          <div className='thome_div11 second'>
            <div className='thome_div111'>
              Today Presents
            </div>
            <div className='thome_div112'>
            <p>{TodayAttendance.length} / {allEmployeesData.length}</p>
            <div><IoPerson /></div>
            </div>

          </div>
          <div className='thome_div11 third'>
            <div className='thome_div111'>
              Active Projects
            </div>
            <div className='thome_div112'>
              <p>{activeProjects.length}</p>
              <div><RiProjectorLine /></div>
            </div>

          </div>


        </div>
        <div className='thome_div2'>
          <div className='thome_div21'>
            <div className="thome-table-container">
              <h2 className="thome-title">TEAM leaders</h2>
              <table className="thome-team-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Employee Name</th>
                    <th >Employee Id</th>
                                     </tr>
                </thead>
                <tbody>
                  {teamMembersData.map((employee, index) => (
                    <tr key={employee.id}>
                      <td>{index + 1}</td>
                      <td>
                        <span className="thome-employee-name">{employee.name}</span>
                        <br />
                        <small className="thome-employee-role">{employee.role}</small>
                      </td>
                      <td>
                        <span style={{cursor:"pointer"}} className={`thome-status thome-`} data-tooltip-id="my-tooltip" data-tooltip-content={employee.name}>
                          {employee.employeeId}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
          <div className='thome_div22'>
            <div className="projects-table-container">
              <h2 className="projects-title">Projects</h2>
              <table className="projects-table">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Started Date</th>
                    <th>Ended Date</th>
                    <th>Progress</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                {activeProjects.map((project) => (
                    <tr key={project.id}>
                      <td>{project.projectName}</td>
                      <td>{project.startDate.split("T")[0]}</td>
                      <td>{project.endDate ? project.endDate.split("T")[0] : "-"}</td>
                      <td>
                        {/* <div className="progress-bar-container">
                          <div
                            className="progress-bar"
                            style={{ width: `${project.progress}%` }}
                          >
                            
                          </div>
                        </div> */}
                        <ProgressBar value={project.progress}/>

                        
                      </td>
                      <td><p className={`table_status ${project.status}`}>{project.status}</p></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
      )}
    </div>
  )
}

export default DHome