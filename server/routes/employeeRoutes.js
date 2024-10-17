import express from 'express';
import { createEmployee, getAllEmployees, getEmployeeById, updateLeavesTaken } from '../controllers/employeeController.js';

const router = express.Router();

// Create a new employee
router.post('/add', createEmployee);

// Get all employees
router.get('/all', getAllEmployees);

// Get employee by employeeId
router.get('/:employeeId', getEmployeeById);

// Update leaves taken by employeeId
router.put('/leaves/:employeeId', updateLeavesTaken);


export default router;
