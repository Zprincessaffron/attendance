import express from "express";
import cors from "cors";
import {mongoose} from "mongoose";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken"
import employeeRoutes from './routes/employeeRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import leaveRoutes from './routes/leaveRoutes.js'
import authEmployeeRoutes from './routes/authEmployeeRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import emailRoutes from './routes/emailRoutes.js'



const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());



// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use routes
app.use('/employee', employeeRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/leave', leaveRoutes);
app.use('/auth', authEmployeeRoutes)
app.use('/project', projectRoutes);
app.use('/email', emailRoutes);



// Use routes




// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});