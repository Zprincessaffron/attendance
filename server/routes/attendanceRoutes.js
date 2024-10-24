import express from 'express';
import { checkIn, checkOut, getAllAttendanceRecordsByEmployeeId, getAttendanceByDate,getTodayAttendanceForDevelopment } from '../controllers/attendanceController.js'

const router = express.Router();

router.post('/checkin', checkIn);         
router.post('/checkout', checkOut);      
router.get('/:employeeId', getAllAttendanceRecordsByEmployeeId);
router.get('/date/:date', getAttendanceByDate); 
router.get('/today/dev', getTodayAttendanceForDevelopment);         


export default router;