import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';  // Ensure bcryptjs is imported correctly


const authEmployeeSchema = new mongoose.Schema({
    employeeId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: String, required: true, default: 'AuthEmployee' },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Add email field
    resetPasswordOTP: { type: String },  // Field for OTP
    resetPasswordExpires: { type: Date }, // Expiry time for OTP
  });
  
  
  const AuthEmployee = mongoose.model('AuthEmployee', authEmployeeSchema);
  
  export default AuthEmployee;
  