import express from 'express';
import { createEmployee, getAllEmployees, getEmployeeById, updateLeavesTaken, getEmployeeFromDev } from '../controllers/employeeController.js';

const router = express.Router();

// Create a new employee
router.post('/add', createEmployee);

// Get all employees
router.get('/all', getAllEmployees);

// Get employee by employeeId
router.get('/filter/:employeeId', getEmployeeById);

// Update leaves taken by employeeId
router.put('/leaves/:employeeId', updateLeavesTaken);
//get all employee data of development
router.get('/fromdev', getEmployeeFromDev);



export default router;