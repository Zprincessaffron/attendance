import mongoose from 'mongoose';
import moment from 'moment-timezone';

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  date: { type: Date, required: true, default: () => new Date().setHours(0, 0, 0, 0) },  // Ensure date is at midnight
  checkInTime: { type: Date, default: moment().tz("Asia/Kolkata").toDate() },
  checkOutTime: { type: Date },
  workDetails: { type: String },
  totalHoursWorked: { type: Number }
});
// Create the Attendance model
export const Attendance = mongoose.model('Attendance', attendanceSchema);
