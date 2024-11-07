import { Attendance } from "../models/Attendance.js";
// Employee Check-in
import moment from 'moment-timezone';
export const checkIn = async (req, res) => {
  try {
    const { employeeId } = req.body;

    // Get today's date at midnight in IST (Asia/Kolkata)
    const todayDate = moment().tz('Asia/Kolkata').toDate(); 

    // Check if the employee has already checked in today
    const existingAttendance = await Attendance.findOne({
      employeeId,
      date: {
        $gte: todayDate,  // Match any attendance from today
        $lt: moment(todayDate).add(1, 'days').toDate() // Less than the next day's midnight
      }
    });

    if (existingAttendance) {
      return res.status(400).json({ message: 'You have already checked in today.' });
    }

    // Create new attendance record with the IST check-in time
    const checkInTime = moment().tz('Asia/Kolkata').toDate(); 
    const newAttendance = new Attendance({
      employeeId,
      date: todayDate,
      checkInTime
    });

    const savedAttendance = await newAttendance.save();
    res.status(201).json({ message: 'Check-in time noted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error during check-in', error });
  }
};
// Employee Check-out
export const checkOut = async (req, res) => {
  try {
    const { employeeId, workDetails } = req.body;

    // Get today's date in IST at midnight
    const todayDate = moment().tz('Asia/Kolkata').startOf('day').toDate(); // Get the start of the day in IST

    // Find today's attendance record
    const todayAttendance = await Attendance.findOne({
      employeeId,
      date: todayDate // Compare using the correct IST date (start of the day)
    });

    if (!todayAttendance) {
      return res.status(400).json({ message: 'Check-out not possible. You either did not check in today or have already checked out.' });
    }

    // Check if the employee has already checked out today
    if (todayAttendance.checkOutTime) {
      return res.status(400).json({ message: 'You have already checked out today.' });
    }

    // Set check-out time (current time in IST)
    const checkOutTime = moment().tz('Asia/Kolkata').toDate(); 
    

    // Calculate total hours worked (using IST times)
    const totalHours = (checkOutTime - todayAttendance.checkInTime) / (1000 * 60 * 60); // Convert ms to hours

    // Update the attendance record with check-out time, work details, and total hours worked
    todayAttendance.checkOutTime = checkOutTime;
    todayAttendance.workDetails = workDetails;
    todayAttendance.totalHoursWorked = totalHours;

    // Save the updated attendance record
    const updatedAttendance = await todayAttendance.save();
    res.status(200).json(updatedAttendance);
  } catch (error) {
    res.status(500).json({ message: 'Error during check-out', error });
  }
};

export const getAllAttendanceRecordsByEmployeeId = async (req, res) => {
  try {
    const { employeeId } = req.params;  // Use the employeeId from the URL params

    // Find all attendance records for the employee
    const attendanceRecords = await Attendance.find({ employeeId });

    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res.status(404).json({ message: 'No attendance records found for this employee.' });
    }

    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance records', error });
  }
};

// Get All Attendance Records for a Particular Date
export const getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.params;  // Use the date from the URL params (e.g., "YYYY-MM-DD")

    // Convert the date to start of day and end of day for the query
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);  // Start of the day (midnight)

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);  // End of the day (just before midnight)

    // Find attendance records for the particular date
    const attendanceRecords = await Attendance.find({
      date: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });

    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res.status(404).json({ message: 'No attendance records found for this date.' });
    }

    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance records for the date', error });
  }
};


export const getTodayAttendanceForDevelopment = async (req, res) => {
  try {
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));

      const attendances = await Attendance.find({
          date: {
              $gte: startOfDay,
              $lte: endOfDay
          },
          employeeId: {
              $regex: /^.{2}D/, // Matches employeeId with 'D' as the third character
          }
      });

      res.status(200).json(attendances);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}


export const getTodayAttendance = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const attendances = await Attendance.find({
        date: {
            $gte: startOfDay,
            $lte: endOfDay
        }
    });

    res.status(200).json(attendances);
} catch (error) {
    res.status(500).json({ message: error.message });
}
}

export const getEmployeeMonthlyAttendance = async (req, res) => {
  const { employeeId } = req.params;

  try {
    // Get the current date and calculate the first and last dates of the current month
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Fetch attendance data for the current month using employeeId
    const attendanceRecords = await Attendance.find({
      employeeId,
      date: {
        $gte: firstDayOfMonth,
        $lte: lastDayOfMonth,
      },
    });

    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res.status(404).json({ message: 'No attendance records found for this employee in the current month.' });
    }

    res.status(200).json({ data: attendanceRecords });
  } catch (error) {
    console.error('Error fetching employee attendance:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
