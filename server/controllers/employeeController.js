import { Employee } from '../models/Employee.js';


// Function to generate employee ID based on department
const generateEmployeeId = (department) => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // Random 4 digits
    const prefix = 'HR';
    let departmentCode = '';
  
    // Convert department to lowercase for case-insensitive matching
    switch (department.toLowerCase()) {
      case 'developer':
        departmentCode = 'D';
        break;
      case 'analytics':
        departmentCode = 'A';
        break;
      case 'marketing':
        departmentCode = 'M';
        break;
      case 'teleperformance':
        departmentCode = 'T';
        break;
      default:
        throw new Error('Invalid department'); // Error if the department is not valid
    }
  
    return `${prefix}${departmentCode}${randomDigits}`;
  };
  
  // Create a new employee
  export const createEmployee = async (req, res) => {
    try {
      const { name, email, phone, dateOfBirth, gender, address, maritalStatus, department, role, dateOfJoining, bankAccount, Ifsc } = req.body;
  
      // Validate input
      if (!name || !email || !department || !role || !dateOfJoining) {
        return res.status(400).json({ message: 'Required fields missing' });
      }
  
      const employeeId = generateEmployeeId(department);
      console.log('Generated Employee ID:', employeeId);
  
      const newEmployee = new Employee({
        name,
        email,
        phone,
        dateOfBirth,
        gender,
        address,
        maritalStatus,
        department,
        role,
        dateOfJoining,
        bankAccount,
        employeeId,
        Ifsc,
        leavesTaken: 0 // Initialize leaves taken as 0
      });
  
      const savedEmployee = await newEmployee.save();
      res.status(201).json({ message :`Employee created successfully ${employeeId}`});
    } catch (error) {
      console.error('Error creating employee:', error);
      res.status(500).json({ message: 'Error creating employee', error: error.message });
    }
  };

// Get all employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error });
  }
};

// Get employee by employeeId
export const getEmployeeById = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error });
  }
};

// Update leaves taken by employeeId
export const updateLeavesTaken = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { leavesTaken } = req.body;

    const employee = await Employee.findOneAndUpdate(
      { employeeId },
      { leavesTaken },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee.leavesTaken);
  } catch (error) {
    res.status(500).json({ message: 'Error updating leaves', error });
  }
};
