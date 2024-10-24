import express from 'express';
import { createProject, getProjectsByEmployeeId,getProjectsByCreatedBy,getProjectsByTeamLead } from '../controllers/projectControllers.js';

const router = express.Router();

// Create a new employee
router.post('/create', createProject);
router.get('/projects/:employeeId', getProjectsByEmployeeId);
router.get('/projects/createdby/:createdBy', getProjectsByCreatedBy);
router.get('/teamLead/:teamLead', getProjectsByTeamLead);





export default router;
