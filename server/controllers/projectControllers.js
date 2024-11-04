import Project from '../models/Project.js'
import moment from 'moment';

// Create a new project with team members
export const createProject = async (req, res) => {
  try {
    const { projectName, teamMembers, createdBy, teamLead, startDate, deadlineDate,department } = req.body;

    // Validate input data
    if (!projectName || !teamMembers || !createdBy || !startDate || !deadlineDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the start date is before the deadline


    // Create the new project
    const newProject = new Project({
      projectName,
      teamMembers, 
      createdBy, 
      startDate,
      deadlineDate,
      teamLead,
      department
    });

    // Save the project to the database
    const savedProject = await newProject.save();

    res.status(201).json({ message: 'Project created successfully', data: savedProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating project', error });
  }
};
export const getProjectsByEmployeeId = async (req, res) => {
    try {
      const { employeeId } = req.params; // Get employeeId from the route parameter
  
      // Find projects where the employeeId is in the teamMembers array
      const myProjects = await Project.find({
        teamMembers: { $in: [employeeId] }
      });
  
      if (myProjects.length === 0) {
        return res.status(404).json({ message: 'No projects found for this employee' });
      }
  
      res.status(200).json({
        message: 'Projects retrieved successfully',
        data: myProjects
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving projects', error });
    }
  };

  
  

// Get projects by createdBy (director)
export const getProjectsByCreatedBy = async (req, res) => {
    try {
      const { createdBy } = req.params; // Get 'createdBy' from the route parameter
  
      // Find projects where the createdBy field matches the given employee ID
      const projects = await Project.find({ createdBy });
  
      if (!projects.length) {
        return res.status(404).json({ message: 'No projects found for this Teamlead' });
      }
  
      res.status(200).json({
        message: 'Projects retrieved successfully',
        data: projects
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving projects', error });
    }
  };

  // Get projects by createdBy (Team Lead)
export const getProjectsByTeamLead = async (req, res) => {
  try {
    const { teamLead } = req.params; // Get 'createdBy' from the route parameter

    // Find projects where the createdBy field matches the given employee ID
    const projects = await Project.find({ teamLead });

    if (!projects.length) {
      return res.status(404).json({ message: 'No projects found for this Teamlead' });
    }

    res.status(200).json({
      message: 'Projects retrieved successfully',
      data: projects
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving projects', error });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find(); // Fetch all projects
    res.status(200).json({ message: 'Projects retrieved successfully', data: projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving projects', error });
  }
};

// Get projects by department
export const getProjectsByDepartment = async (req, res) => {
  try {
    const { department } = req.params;

    if (!department) {
      return res.status(400).json({ message: 'Department parameter is required' });
    }

    const projects = await Project.find({ department }); // Filter projects by department
    res.status(200).json({ message: `Projects for department: ${department} retrieved successfully`, data: projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving projects by department', error });
  }
};