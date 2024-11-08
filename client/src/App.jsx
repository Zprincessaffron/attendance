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
import Compose from './component/email/Compose';
import DLandingPage from './component/director/DLandingPage';
import DDashboard from './component/director/DDashboard';
import DHome from './component/director/DHome';
import DAttendance from './component/director/DAttendance';
import DTodayAttendance from './component/director/DTodayAttendance';
import DEmployeeAttendance from './component/director/DEmployeeAttendance';
import DLeaveRequest from './component/director/DLeaveRequest';
import DEmployeeLeave from './component/director/DEmployeeLeave';
import DProject from './component/director/DProject';
import DTeams from './component/director/DTeams';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Reflect from './component/login/Reflect';
import { Tooltip } from 'react-tooltip';
import Profile from './component/profile/Profile';
import ATodayAttendance from './component/admin/ATodayAttendance';
import AEmployeeAttendance from './component/admin/AEmployeeAttendance';
import ALeaveRequest from './component/admin/ALeaveRequest';
import AEmployeeLeave from './component/admin/AEmployeeLeave';
import AProject from './component/admin/AProject';
import ATeam from './component/admin/ATeam';
import NewEmployee from './component/admin/NewEmployee';
import ForgotPassword from './component/login/ForgotPassword';
import OtpVerify from './component/login/OtpVerify';
import ADirectorDetails from './component/admin/ADirectorDetails';
import AEmployeesDetails from './component/admin/AEmployeesDetails';
function App() {
  return (
    <>
    <Router>
      <AdminProvider>
      <EmployeeProvider>
        
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verify" element={<OtpVerify />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDash />} >
          <Route path="home" element={<AHome />} />
          <Route path="attendance" element={<AAttendance />} />
          <Route path="todayattendance" element={<ATodayAttendance />} />
          <Route path="employeeattendance" element={<AEmployeeAttendance/>} />
          <Route path="leaverequest" element={<ALeaveRequest />} />
          <Route path="employeeleave" element={<AEmployeeLeave />} />
          <Route path="leave" element={<ALeave />} />
          <Route path="project" element={<AProject />} />
          <Route path="team" element={<ATeam />} />
          <Route path="newemployee" element={<NewEmployee />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="email-detail" element={<EmailDetail />} />
          <Route path="compose" element={<Compose />} />
          <Route path="director-details" element={<ADirectorDetails />} />
          <Route path="employees-details" element={<AEmployeesDetails />} />

          </Route>
          
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['300']} />}>
          <Route path="/director" element={<DDashboard />} >
          <Route path="home" element={<DHome />} />
          <Route path="attendance" element={<DAttendance/>} />
          <Route path="todayattendance" element={<DTodayAttendance/>} />
          <Route path="employeeattendance" element={<DEmployeeAttendance/>} />
          <Route path="leaverequest" element={<DLeaveRequest />} />
          <Route path="employeeleave" element={<DEmployeeLeave />} />
          <Route path="project" element={<DProject />} />
          <Route path="team" element={<DTeams />} />
          <Route path="profile" element={<Profile />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="email-detail" element={<EmailDetail />} />
          <Route path="compose" element={<Compose />} />
     

          </Route>
          
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['200']} />}>
          <Route path="/tl" element={<TeamLeadDash />} >
          <Route path="home" element={<THome />} />
          <Route path="myattendance" element={<TAttendance/>} />
          <Route path="todayattendance" element={<TodayAttendance/>} />
          <Route path="employeeattendance" element={<TEmployeeAttendance/>} />
          <Route path="myleave" element={<TLeave />} />
          <Route path="leaverequest" element={<TLeaveRequest />} />
          <Route path="employeeleave" element={<TEmployeeLeave />} />
          <Route path="project" element={<TProject />} />
          <Route path="team" element={<TTeammembers />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="email-detail" element={<EmailDetail />} />
          <Route path="compose" element={<Compose />} />
          <Route path="profile" element={<Profile />} />

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
          <Route path="compose" element={<Compose />} />
          <Route path="profile" element={<Profile />} />

          




          </Route>
          
        </Route>

        {/* Example of shared access between admin and team lead */}
        {/* <Route element={<ProtectedRoute allowedRoles={['admin', 'team_lead']} />}>
          <Route path="/shared-page" element={<TeamLeadPage />} />
        </Route> */}
        
      </Routes>
      </EmployeeProvider>
      </AdminProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Tooltip id="my-tooltip" /> 
    </Router>
    </>
  )
}

export default App