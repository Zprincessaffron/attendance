import express from 'express';
import {
  registerAuthEmployee,
  loginAuthEmployee,
  forgotPassword,
  resetPassword,
} from '../controllers/authEmployeeController.js';

const router = express.Router();

// Register new authEmployee
router.post('/register', registerAuthEmployee);

// AuthEmployee login
router.post('/login', loginAuthEmployee);

// Forgot password - Generate and send OTP
router.post('/forgot-password', forgotPassword);

// Reset password using OTP
router.post('/reset-password', resetPassword);


export default router;
