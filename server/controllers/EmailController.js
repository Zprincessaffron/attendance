import { Email } from "../models/Email.js";
import moment from 'moment-timezone';

// Controller function to handle creating a new email
export const sendEmail = async (req, res) => {
  try {
    const {
      subject,
      message,
      senderName,
      senderId,
      receiverName,
      receiverId,
      tags,
    } = req.body;
    const newEmail = new Email({
      subject,
      message,
      senderName,
      senderId,
      receiverName,
      receiverId,
      tags,
    });

    const savedEmail = await newEmail.save();
    res.status(201).json({ message: 'Email sent successfully', email: savedEmail });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
};

export const getEmailsByReceiverId = async (req, res) => {
    const { receiverId } = req.params;

    try {
        // Find emails where the receiverId is included in the receiverId array
        const emails = await Email.find({ receiverId: receiverId });
        
        // Check if emails were found
        if (emails.length === 0) {
            return res.status(404).json({ message: 'No emails found for this receiver ID.' });
        }

        res.json(emails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
