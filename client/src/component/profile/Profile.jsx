// EmployeeProfile.jsx
import React, { useContext } from 'react';
import './Profile.css';
import ShiningText from '../text/ShiningText';
import { IoCallOutline } from "react-icons/io5";
import { CiMail,CiHome,CiLocationOn } from "react-icons/ci";
import { LiaCitySolid,LiaNotesMedicalSolid,LiaIdCard,LiaUser, LiaCalendar } from "react-icons/lia";
import { EmployeeContext } from '../../context/EmployeeContext';
const Profile = () => {
    const { myDetail } = useContext(EmployeeContext)
    console.log("myDetail",myDetail)
    const employee = {
        name: "Nicholas Swatz",
        employeeId: "ERD246534",
        email: "nicholasswatz@gmail.com",
        phone: "(629) 555-0123",
        dob: "Sep 26, 1988",
        gender: "Male",
        address: {
            street: "390 Market Street, Suite 200",
            city: "San Francisco",
            state: "CA",
            postcode: "94102",
        },
        maritalStatus: "Single",
        department: "Project Management",
        role: "Project Manager",
        dateOfJoining: "Jan 05, 2023",
        panNumber: "GER10654",
        position: "Team Lead",
        leavesTaken: 5
    };

    return (
 <div>
    <div>
        <ShiningText text='profile'/>

    </div>
    <div>
    <div className="employee-profile">
            <div className="profile-left">
                <div className="profile-header">
                    <img src="https://via.placeholder.com/100" alt="Profile" className="profile-image" />
                    <h2>{myDetail.name}</h2>
                    <p>#{myDetail.employeeId}</p>
                </div>
                <div className="profile-section">
                    <h3>About</h3>
                    <p><IoCallOutline/> Phone :  {myDetail.phone}</p>
                    <p><CiMail/>Email : {myDetail.email}</p>
                </div>
                <div className="profile-section">
                    <h3>Address</h3>
                    <p><CiHome/> Address : {myDetail.address}</p>
                    <p><LiaCitySolid/> City/State : {myDetail.city}</p>
                    <p><CiLocationOn/> Postcode :  605004</p>
                </div>
                <div className="profile-section">
                    <h3>Employee Details</h3>
                    <p><LiaNotesMedicalSolid/> Date of Birth :  {myDetail.dateOfBirth.split('T')[0]}</p>
                    <p><LiaIdCard/> National ID:  {myDetail.panNumber}</p>
                    <p><LiaUser/>Role:  {myDetail.role}</p>
                    <p><LiaCalendar/>Hire Date: {myDetail.dateOfJoining.split('T')[0]}</p>
                </div>
            </div>
            <div className="profile-right">
                <h3>Job Information</h3>
                <table className="job-info-table">
                    <thead>
                        <tr>
                            <th>Department</th>
                            <th>Position</th>
                            <th>Leaves Taken</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{myDetail.department}</td>
                            <td>{myDetail.position}</td>
                            <td>{myDetail.leavesTaken}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
 </div>
        




    );
};

export default Profile;
