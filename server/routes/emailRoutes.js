import express from 'express';
import { sendEmail,getEmailsByReceiverId } from '../controllers/EmailController.js';

const router = express.Router();

// POST route to create a new email
router.post('/send', sendEmail);
router.get('/get/:receiverId', getEmailsByReceiverId);



export default router;
