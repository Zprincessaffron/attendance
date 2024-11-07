import express from 'express';
import { createProject, getProjectsByEmployeeId,getProjectsByCreatedBy,getProjectsByTeamLead,getAllProjects,getProjectsByDepartment,updateProject } from '../controllers/projectControllers.js';

const router = express.Router();

// Create a new employee
router.post('/create', createProject);
router.get('/projects/:employeeId', getProjectsByEmployeeId);
router.get('/projects/createdby/:createdBy', getProjectsByCreatedBy);
router.get('/teamLead/:teamLead', getProjectsByTeamLead);
router.get('/all', getAllProjects);
router.get('/department/:department', getProjectsByDepartment);
router.put('/:id', updateProject);







export default router;
