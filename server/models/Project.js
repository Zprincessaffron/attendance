import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  teamMembers: [
    {
    type: String,
      required: true,
    },
  ],
  createdBy: {
    type: String,
    required: true,
  },
  teamLead: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  progress: {
    type: String,
    required: true,
    default:"0"
  },
  createdDate: {
    type: Date,
    default: Date.now, // Automatically set the project creation date
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
  deadlineDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'completed'], // Define possible values
    default: 'active', // Initial value
    required: true
}
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
