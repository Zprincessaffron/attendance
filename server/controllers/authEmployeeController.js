import AuthEmployee from '../models/AuthEmployee.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcryptjs'; 
import sendEmail from '../utils/sendEmail.js'

// Register a new employee
export const registerAuthEmployee = async (req, res) => {
    const { employeeId, name, email, password, role, department } = req.body;
  
    try {
      // Check if the employee ID or email already exists
      const existingEmployee = await AuthEmployee.findOne({ employeeId });
      if (existingEmployee) {
        return res.status(400).json({ message: 'Employee ID or Email already exists' });
      }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new employee record
      const newEmployee = new AuthEmployee({
        employeeId,
        name,
        email,
        password: hashedPassword,
        role,
        department
      });
  
      // Save to the database
      await newEmployee.save();
  
      // Respond with success
      res.status(201).json({ message: 'Employee registered successfully'});
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Error registering employee', error: error.message });
    }
  };
  
  
// Login employee
export const loginAuthEmployee = async (req, res) => {
    const { employeeId, password } = req.body;
  
    try {
      // Find employee by employeeId
      const employee = await AuthEmployee.findOne({ employeeId });
      if (!employee) {
        return res.status(400).json({ message: 'Employee not found' });
      }
  
      // Use bcrypt.compare() to compare the entered password with the hashed password
      const isMatch = await bcrypt.compare(password, employee.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token if passwords match
      const token = jwt.sign(
        { employeeId: employee.employeeId, role: employee.role, department: employee.department,name:employee.name },
        'Hello',    );
  
      // Respond with token
      res.status(200).json({
        message: 'Login successful',
        token: token,
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  };


// Generate OTP and Send via Email for Password Reset
export const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
  
      // Find authEmployee by email
      const authEmployee = await AuthEmployee.findOne({ email });
      if (!authEmployee) {
        return res.status(404).json({ message: 'AuthEmployee not found' });
      }
  
      // Generate OTP using crypto
      const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
  
      // Save OTP and expiration time (5 minutes from now)
      authEmployee.resetPasswordOTP = otp;
      authEmployee.resetPasswordExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
  
      await authEmployee.save();
  
      // Send OTP via email using the sendEmail function
      sendEmail(
        email,
        'Password Reset OTP',
        `Your OTP for password reset is: ${otp}\nThis OTP is valid for 5 minutes.`
      );
  
      res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
      console.error('Error sending OTP:', error);
      res.status(500).json({ message: 'Error sending OTP', error: error.message });
    }
  };

// Verify OTP and Update Password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Find authEmployee by email
    const authEmployee = await AuthEmployee.findOne({ email });
    if (!authEmployee) {
      return res.status(404).json({ message: 'AuthEmployee not found' });
    }

    // Check if OTP is valid and not expired
    if (
      authEmployee.resetPasswordOTP !== otp ||
      authEmployee.resetPasswordExpires < Date.now()
    ) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Hash the new password
    authEmployee.password = await bcrypt.hash(newPassword, 10);

    // Clear the OTP and expiration time
    authEmployee.resetPasswordOTP = undefined;
    authEmployee.resetPasswordExpires = undefined;

    await authEmployee.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error });
  }
};
