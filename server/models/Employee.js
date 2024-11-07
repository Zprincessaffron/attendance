import mongoose from 'mongoose';

// Function to generate employee ID
function generateEmployeeId(department) {
  const prefix = "HR";
  let departmentCode = "";
  
  switch(department.toLowerCase()) {
    case 'developer': departmentCode = 'D'; break;
    case 'analytics': departmentCode = 'A'; break;
    case 'marketing': departmentCode = 'M'; break;
    case 'teleperformance': departmentCode = 'T'; break;
    default: departmentCode = 'X'; // Fallback if unknown department
  }

  // Generate random 4-digit number
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // 4-digit random number

  return `${prefix}${departmentCode}${randomNumber}`;
}

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String },
  city: { type: String },
  pincodde: { type: String },
  address: { type: String },
  aadhar: { type: String },
  pan: { type: String },
  maritalStatus: { type: String },
  department: { type: String, required: true },
  role: { type: String, required: true },
  dateOfJoining: { type: Date, required: true },
  employeeId: { type: String, unique: true, required: true },
  bankAccount: { type: String },
  bankName: { type: String },
  position: { type: String, required: true },
  Ifsc: { type: String },
  leavesTaken: { type: Number, default: 0 } // Default value of 0 for leaves taken
});

// Pre-save middleware to generate employee ID before saving
employeeSchema.pre('save', function (next) {
  if (!this.employeeId) {
    this.employeeId = generateEmployeeId(this.department);
  }
  next();
});

export const Employee = mongoose.model('Employee', employeeSchema);