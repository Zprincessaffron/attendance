import { Leave } from '../models/Leave.js';

// Create a new leave request
export const createLeaveRequest = async (req, res) => {
    try {
      const { employeeId, leaveReason } = req.body;
  
      const newLeaveRequest = new Leave({
        employeeId,
        leaveReason,
        leaveStatus: 'Pending', // Ensure leave status is set to 'Pending' by default
      });
  
      const savedLeaveRequest = await newLeaveRequest.save();
      res.status(201).json({ message: 'Leave request created successfully', data: savedLeaveRequest });
    } catch (error) {
      res.status(500).json({ message: 'Error creating leave request', error });
    }
  };
// Update the leave status (Approve/Reject) based on leave request ID
export const updateLeaveStatusById = async (req, res) => {
    try {
      const { leaveId } = req.params; // Leave request ID from the URL
      const { leaveStatus } = req.body; // New leave status (Approved/Rejected)
  
      // Find the leave request by leaveId
      console.log('Searching for pending leave request with ID:', leaveId);
      
      const leaveRequest = await Leave.findOne({
        _id: leaveId,
        leaveStatus: 'Pending', // Only update pending leave requests
      });
  
      if (!leaveRequest) {
        console.log('No pending leave request found with ID:', leaveId);
        return res.status(404).json({ message: 'Pending leave request not found for this ID' });
      }
  
      console.log('Leave request found:', leaveRequest);
  
      // Update status to Approved/Rejected
      leaveRequest.leaveStatus = leaveStatus; 
  
      // Save the updated leave request
      const updatedLeaveRequest = await leaveRequest.save();
      res.status(200).json({ message: 'Leave status updated successfully', data: updatedLeaveRequest });
    } catch (error) {
      res.status(500).json({ message: 'Error updating leave status', error });
    }
  };
  
  
  // Get all leave requests for a specific employee
export const getEmployeeLeaveRequests = async (req, res) => {
    try {
      const { employeeId } = req.params; // Employee ID
  
      const leaveRequests = await Leave.find({ employeeId });
      if (!leaveRequests || leaveRequests.length === 0) {
        return res.status(404).json({ message: 'No leave requests found for this employee' });
      }
  
      res.status(200).json(leaveRequests);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching leave requests', error });
    }
  };
  


  // Get all leave requests
export const getAllLeaveRequests = async (req, res) => {
    try {
      const leaveRequests = await Leave.find(); // Get all leave requests
      res.status(200).json({ data: leaveRequests });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching all leave requests', error });
    }
  };

  
  // Get all pending leave requests
export const getAllPendingLeaveRequests = async (req, res) => {
    try {
      const pendingRequests = await Leave.find({ leaveStatus: 'Pending' }); // Filter by pending status
      res.status(200).json({ data: pendingRequests });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching pending leave requests', error });
    }
  };

  // Get all approved leave requests
export const getAllApprovedLeaveRequests = async (req, res) => {
    try {
      const approvedRequests = await Leave.find({ leaveStatus: 'Approved' }); // Filter by approved status
      res.status(200).json({ data: approvedRequests });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching approved leave requests', error });
    }
  };

  
  // Get all rejected leave requests
export const getAllRejectedLeaveRequests = async (req, res) => {
    try {
      const rejectedRequests = await Leave.find({ leaveStatus: 'Rejected' }); // Filter by rejected status
      res.status(200).json({ data: rejectedRequests });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching rejected leave requests', error });
    }
  };
  