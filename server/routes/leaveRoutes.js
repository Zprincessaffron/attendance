import express from 'express';
import {
  createLeaveRequest,
  updateLeaveStatusById,
  getEmployeeLeaveRequests,
  getAllLeaveRequests,
  getAllPendingLeaveRequests,
  getAllApprovedLeaveRequests,
  getAllRejectedLeaveRequests

} from '../controllers/leaveController.js';

const router = express.Router();

// Create a new leave request
router.post('/', createLeaveRequest);

// Update leave status (Approve/Reject)
router.put('/update/:leaveId', updateLeaveStatusById);

// Get all leave requests for a specific employee
router.get('/get/:employeeId', getEmployeeLeaveRequests);

router.get('/approved', getAllApprovedLeaveRequests);
router.get('/all', getAllLeaveRequests);
router.get('/pendinng', getAllPendingLeaveRequests);
router.get('/rejected', getAllRejectedLeaveRequests);



export default router;
