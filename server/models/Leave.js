import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },
  leaveReason: {
    type: String,
    required: true,
  },
  leaveStatus: {
    type: String,
    default: 'Pending', // Initial status set to 'Pending'
  },
  requestDate: {
    type: Date,
    default: Date.now, // Automatically set the current date and time
  },
});

export const Leave = mongoose.model('Leave', leaveSchema);
