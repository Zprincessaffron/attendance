import { Attendance } from "../models/Attendance.js";
// Employee Check-in
export const checkIn = async (req, res) => {
  try {
    const { employeeId } = req.body;

    // Get the current date (midnight) to compare only the date part
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0); // Set to midnight to remove time part

    // Check if the employee has already checked in today
    const existingAttendance = await Attendance.findOne({
      employeeId,
      date: todayDate // Compare with the date part only
    });

    if (existingAttendance) {
      return res.status(400).json({ message: 'You have already checked in today.' });
    }

    // Create new attendance record with check-in time and today's date
    const newAttendance = new Attendance({
      employeeId,
      checkInTime: new Date(), // Store the current time as check-in time
      date: todayDate // Store the current date
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

    // Find today's attendance record
    const todayAttendance = await Attendance.findOne({
      employeeId,
      date: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)), // Start of today
        $lt: new Date(new Date().setHours(24, 0, 0, 0)) // End of today
      }
    });

    if (!todayAttendance) {
      return res.status(400).json({ message: 'Check-out not possible. You either did not check in today or have already checked out.' });
    }

    // Check if the employee has already checked out today
    if (todayAttendance.checkOutTime) {
      return res.status(400).json({ message: 'You have already checked out today.' });
    }

    // Set check-out time and calculate total hours worked
    const checkOutTime = new Date();
    const totalHours = (checkOutTime - todayAttendance.checkInTime) / (1000 * 60 * 60); // Time difference in hours

    todayAttendance.checkOutTime = checkOutTime;
    todayAttendance.workDetails = workDetails;
    todayAttendance.totalHoursWorked = totalHours;

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
