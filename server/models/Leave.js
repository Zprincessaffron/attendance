import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },
  leaveReason: {
    type: String,
    required: false,
  },
  leaveType: {
    type: String,
    required: true,
  },
  leaveStatus: {
    type: String,
    default: 'Pending', // Initial status set to 'Pending'
  },
  fromDate: {
    type: Date,
    required: true, // 'fromDate' is required
  },
  toDate: {
    type: Date,
    required: true, // 'toDate' is required
  },
  numberOfLeaves: {
    type: Number,
    required: true, // Number of leave days is required
  },
  requestDate: {
    type: Date,
    default: Date.now, // Automatically set the current date and time
  },
});

export const Leave = mongoose.model('Leave', leaveSchema);