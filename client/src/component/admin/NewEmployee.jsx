import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/admin/NewEmployee.css'
import ShiningText from '../text/ShiningText';
import { toast } from 'react-toastify';
import Loader from '../loader/Loader';

function EmployeeForm() {
  const [popup,setPopup] = useState(false)
  const [responseData,setResponseData]=useState([])
  const [loading,setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    maritalStatus: '',
    department: 'development',
    role: 'developer',
    dateOfJoining: '',
    bankAccount: '',
    bankName: '',
    ifsc: '',
    city: '',
    pincode: '',
    position: '',
    pan: '',
    aadhar: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPopup(true)
    setLoading(true)
    try {
        console.log(formData)
      const response = await axios.post('/employee/add', formData);
      console.log('Employee added:', response.data);
      toast('employee added')
      registerEmployee(response.data.data)
      setResponseData(response.data.data)
      
    } catch (error) {
      console.error('There was an error adding the employee!', error);
    }
  };
async function registerEmployee (employee){
    let ac = ''
    if(employee.position == 'employee'){
        ac = 100
    }
    if(employee.position == 'teamlead'){
        ac = 200
    }
    if(employee.position == 'director'){
        ac = 300
    }
    console.log("acesscode",ac)
    console.log("dob",employee.dateOfBirth)

    try {
        await axios.post('/auth/register',{
            employeeId : employee.employeeId,
            name: employee.name,
            email: employee.email,
            password: employee.dateOfBirth.split("T")[0],
            role : employee.role,
            department : employee.department,
            accessCode : ac
        })
        toast('employee registered')
        setLoading(false)
    } catch (error) {
        
        
    }

}
  return (
    <div>
        {popup ?(
            <div className='ne_popup_main'>
                <>
                {loading?(
                    <>
                    <Loader/>
                    </>
                ):(
                    <div>
                    <h2>Employee Added Sucessfully</h2>
                    <div> Employee Id is : {responseData.employeeId} </div>
                    <div>Employee Password is : { responseData.dateOfBirth.split("T")[0]}</div>
                    <div className='button_div'>
                        <button onClick={()=>setPopup(false)}>close</button>
                    </div>
                </div>
                )}
                </>

            </div>
        ):null}
    <div className='outlet_title'>
      <div>
        <ShiningText text="New EMployee"/>

      </div>


    </div>
  
      <div className='thome_main'>
       <div className="employee-form-container">
       <form onSubmit={handleSubmit}>
         <div className="form-section">
           <label>Name *</label>
           <input type="text" name="name" value={formData.name} onChange={handleChange} required />

           <label>Email *</label>
           <input type="email" name="email" value={formData.email} onChange={handleChange} required />

           <label>Phone *</label>
           <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
         </div>

         <div className="form-section">
           <label>Date of Birth *</label>
           <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />

           <label>Gender *</label>
           <select name="gender" value={formData.gender} onChange={handleChange} required>
             <option value="">Select Gender</option>
             <option value="male">Male</option>
             <option value="female">Female</option>
             <option value="other">Other</option>
           </select>

           <label>Marital Status *</label>
           <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required>
             <option value="">Select Status</option>
             <option value="single">Single</option>
             <option value="married">Married</option>
             <option value="divorced">Divorced</option>
           </select>
         </div>

         <div className="form-section">
           <label>Department *</label>
           <select name="department" value={formData.department} onChange={handleChange} required>
             <option value="development">Development</option>
             <option value="marketing">Marketing</option>
             <option value="sales">Sales</option>
           </select>

           <label>Role *</label>
           <input type="text" name="role" value={formData.role} onChange={handleChange} required />
         </div>

         <div className="form-section">
           <label>Date of Joining *</label>
           <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} required />

           <label>Bank Account *</label>
           <input type="text" name="bankAccount" value={formData.bankAccount} onChange={handleChange} required />

           <label>Bank Name *</label>
           <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} required />

           <label>IFSC *</label>
           <input type="text" name="ifsc" value={formData.ifsc} onChange={handleChange} required />
         </div>

         <div className="form-section">
         <label>Address *</label>
         <input type="text" name="address" value={formData.address} onChange={handleChange} required />
           <label>City *</label>
           <input type="text" name="city" value={formData.city} onChange={handleChange} required />

           <label>Pincode *</label>
           <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
         </div>

         <div className="form-section">
          
           <label>Position *</label>
           <select name="position" value={formData.position} onChange={handleChange} required>
             <option value="employee">employee</option>
             <option value="teamlead">teamlead</option>
             <option value="director">director</option>
           </select>
           <label>PAN *</label>
           <input type="text" name="pan" value={formData.pan} onChange={handleChange} required />

           <label>Aadhar *</label>
           <input type="text" name="aadhar" value={formData.aadhar} onChange={handleChange} required />
         </div>

      <button type="submit">Add Employee</button>
     </form>
    </div>

        </div>
        </div>
  );
}

export default EmployeeForm;
