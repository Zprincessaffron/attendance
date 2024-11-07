// ProjectPopupForm.jsx
import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/director/ProjectPopupForm.css'
import { EmployeeContext } from '../../context/EmployeeContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const ProjectPopupForm = ({ setShowProjectForm }) => {
    const { teamMembers,teamMembersData,allEmployeesData,employeeData } = useContext(EmployeeContext)
console.log("teammembers",allEmployeesData)
    const [projectName, setProjectName] = useState('');
    const [tempTeamMembers, setTempTeamMembers] = useState([]);
    const [teamLead, setTeamLead] = useState('');
    const [department, setDepartment] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [deadlineDate, setDeadlineDate] = useState(null);

    const alltempTeamMembers = allEmployeesData
    const allTeamLeads = teamMembersData


    const handleAddTeamMember = (e) => {
        const member = e.target.value;
        if (member && !tempTeamMembers.includes(member)) {
            setTempTeamMembers([...tempTeamMembers, member]);
        }
    };

    const handleRemoveTeamMember = (member) => {
        setTempTeamMembers(tempTeamMembers.filter(m => m !== member));
    };


    async function handleCreateProject(e) {
        // const newProject = {
        //     projectName,
        //     teamMembers:tempTeamMembers,
        //     createdBy:employeeData.employeeId,
        //     teamLead,
        //     department,
        //     startDate:startDate.toISOString().split("T")[0],
        //     deadlineDate:deadlineDate.toISOString().split("T")[0]
        // };
        const newProject= {
            "projectName": "Website Redesign",
            "teamMembers": ["Hrd1111","HRD1234"],
            "createdBy": "Sarah Thompson",
            "startDate": "2024-11-10",
            "deadlineDate": "2025-01-15",
            "teamLead": "HRD2222",
            "department": "Development"
          }
        try {
            console.log(newProject)
            const response = await axios.post('http://localhost:5000/project/create',
                {
                    projectName,
                    teamMembers:tempTeamMembers,
                    createdBy:employeeData.employeeId,
                    teamLead, 
                    department,
                    startDate:startDate.toISOString().split("T")[0],
                    deadlineDate:deadlineDate.toISOString().split("T")[0]
                }
            );
            
            console.log('Success:', response.data);
        } catch (error) {
            if (error.response) {
                // The request was made, but the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
            } else if (error.request) {
                // The request was made, but no response was received
                console.error('No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error:', error.message);
            }
        }
        
    }

    return (
        <div className="popup-overlay">
            <div className="popup-form">
                <h2>Create New Project</h2>
                <form >
                    <label>Project Name</label>
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                    />

                    <label>Team Members</label>
                    <select onChange={handleAddTeamMember}>
                        <option value="">Select Team Member</option>
                        {alltempTeamMembers.map((member, index) => (
                            <option key={index} value={member.employeeId}>{member.employeeId} - {member.name}</option>
                        ))}
                    </select>
                    <ul className="selected-members">
                        {tempTeamMembers.map((member, index) => (
                            <li key={index}>
                                {member} <button type="button" onClick={() => handleRemoveTeamMember(member)}>Remove</button>
                            </li>
                        ))}
                    </ul>

                    <label>Team Lead</label>
                    <select value={teamLead} onChange={(e) => setTeamLead(e.target.value)} required>
                        <option value="">Select Team Lead</option>
                        {allTeamLeads.map((lead, index) => (
                            <option key={index} value={lead.employeeId}>{lead.employeeId} - {lead.name} </option>
                        ))}
                    </select>

                    <label>Department</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="department"
                                value="Development"
                                checked={department === 'Development'}
                                onChange={(e) => setDepartment(e.target.value)}
                            />
                            Development
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="department"
                                value="Marketing"
                                checked={department === 'Marketing'}
                                onChange={(e) => setDepartment(e.target.value)}
                            />
                            Marketing
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="department"
                                value="Sales"
                                checked={department === 'Sales'}
                                onChange={(e) => setDepartment(e.target.value)}
                            />
                            Sales
                        </label>
                    </div>

                    <label>Start Date</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="Select start date"
                    />

                    <label>Deadline Date</label>
                    <DatePicker
                        selected={deadlineDate}
                        onChange={(date) => setDeadlineDate(date)}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="Select deadline date"
                    />
                    <button type="button" onClick={handleCreateProject}>Create Project</button>
                    <button type="button" onClick={()=>setShowProjectForm(false)} className="close-btn">Close</button>
                </form>
            </div>
        </div>
    );
};

export default ProjectPopupForm;
