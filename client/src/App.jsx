import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminProvider from './context/AdminContext'
import Login from './component/login/Login';
import ProtectedRoute from './context/ProtectedRoute';
import AdminDash from './component/admin/AdminDash';
import TeamLeadDash from './component/teamLead/TeamLeadDash';
import EmployeeDash from './component/employee/EmployeeDash';
import AHome from './component/admin/AHome';
import AAttendance from './component/admin/AAttendance';
import ALeave from './component/admin/ALeave';
import EHome from './component/employee/EHome';
import EAttendance from './component/employee/EAttendance';
import ELeave from './component/employee/ELeave';
import { EmployeeProvider } from './context/EmployeeContext';
import EProject from './component/employee/EProject';
import THome from './component/teamLead/THome';
import TAttendance from './component/teamLead/TAttendance';
import TLeave from './component/teamLead/TLeave';
import TProject from './component/teamLead/TProject';
import TodayAttendance from './component/teamLead/TodayAttendance';
import TEmployeeAttendance from './component/teamLead/TEmployeeAttendance';
import TLeaveRequest from './component/teamLead/TLeaveRequest';
import TEmployeeLeave from './component/teamLead/TEmployeeLeave';
import TTeammembers from './component/teamLead/TTeammembers';
import ETeams from './component/employee/ETeams';
import Inbox from './component/email/Inbox';
import EmailDetail from './component/email/EmailDetail';
function App() {
  return (
    <>
    <Router>
      <AdminProvider>
      <EmployeeProvider>
        
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDash />} >
          <Route path="home" element={<AHome />} />
          <Route path="attendance" element={<AAttendance />} />
          <Route path="leave" element={<ALeave />} />
          
          </Route>
          
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['200']} />}>
          <Route path="/tl" element={<TeamLeadDash />} >
          <Route path="home" element={<THome />} />
          <Route path="attendance" element={<TAttendance/>} />
          <Route path="todayattendance" element={<TodayAttendance/>} />
          <Route path="employeeattendance" element={<TEmployeeAttendance/>} />
          <Route path="leave" element={<TLeave />} />
          <Route path="leaverequest" element={<TLeaveRequest />} />
          <Route path="employeeleave" element={<TEmployeeLeave />} />
          <Route path="project" element={<TProject />} />
          <Route path="team" element={<TTeammembers />} />
          </Route>
          
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['100']} />}>
          <Route path="/employee" element={<EmployeeDash />} >
          <Route path="home" element={<EHome />} />
          <Route path="attendance" element={<EAttendance />} />
          <Route path="leave" element={<ELeave />} />
          <Route path="projects" element={<EProject />} />
          <Route path="teams" element={<ETeams />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="email-detail" element={<EmailDetail />} />




          </Route>
          
        </Route>

        {/* Example of shared access between admin and team lead */}
        {/* <Route element={<ProtectedRoute allowedRoles={['admin', 'team_lead']} />}>
          <Route path="/shared-page" element={<TeamLeadPage />} />
        </Route> */}
      </Routes>
      </EmployeeProvider>
      </AdminProvider>
    </Router>
    </>
  )
}

export default App