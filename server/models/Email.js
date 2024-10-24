import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const emailSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
    ref: 'User', // Assuming you have a User model; you can change this as needed
  },
  receiverName: {
    type: String,
    required: true,
  },
  receiverId: [
    {
    type: String,
      required: true,
    },
  ],
  isOpened: {
    type: Boolean,
    default: false,
  },
  tags: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Exporting the model using ES6 module syntax
export const Email = model('Email', emailSchema);
