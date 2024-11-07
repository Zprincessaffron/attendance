import { Employee } from '../models/Employee.js';


// Function to generate employee ID based on department
const generateEmployeeId = (department) => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // Random 4 digits
    const prefix = 'HR';
    let departmentCode = '';
  
    // Convert department to lowercase for case-insensitive matching
    switch (department.toLowerCase()) {
      case 'development':
        departmentCode = 'D';
        break;
      case 'Sales':
        departmentCode = 'S';
        break;
      case 'marketing':
        departmentCode = 'M';
        break;
      default:
        throw new Error('Invalid department'); // Error if the department is not valid
    }
  
    return `${prefix}${departmentCode}${randomDigits}`;
  };
  
  // Create a new employee
  export const createEmployee = async (req, res) => {
    try {
      const { name, email, phone, dateOfBirth, gender, address, maritalStatus, department, role, dateOfJoining, bankAccount, Ifsc , position, city, pincode, aadhar, pan ,bankName } = req.body;
  
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
        position,
        bankName,
        aadhar,
        pan,
        pincode,
        city,
        leavesTaken: 0 // Initialize leaves taken as 0
      });
  
      const savedEmployee = await newEmployee.save();
      res.status(201).json({ message :`Employee created successfully ${employeeId}`, data:newEmployee});
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
export const getAllEmployeeFilterData = async (req, res) => {

  try {
    const employees = await Employee.find({},`name email role department`);
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

//get employee details from development
export const getEmployeeFromDev = async (req, res) => {
  try {
      // Regex to match the third letter being 'D'
      const employees = await Employee.find({ employeeId: /^.{2}D/ });

      // If no employees found, return a message
      if (employees.length === 0) {
          return res.status(404).json({ message: 'No employees found with third letter "D" in employeeId' });
      }

      // Return the filtered employee data
      res.status(200).json(employees);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching employees', error });
  }
}

//get employee details from development
export const getTeamLeadDetails = async (req, res) => {
  try {
      // Regex to match the third letter being 'D'
      const employees = await Employee.find({ position:"teamlead"});

      // If no employees found, return a message
      if (employees.length === 0) {
          return res.status(404).json({ message: 'No employees found with third letter "D" in employeeId' });
      }

      // Return the filtered employee data
      res.status(200).json(employees);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching employees', error });
  }
}