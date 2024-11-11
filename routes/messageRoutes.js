const express = require("express");
const messageRoutes = express.Router();
const authValidation = require("../middleware/authMiddleware");
const { 
    sendMessage, 
    getMessages, 
    deleteMessage 
} = require("../controllers/messageController");

// Routes
messageRoutes.post("/send", authValidation, sendMessage);
messageRoutes.get("/", authValidation, getMessages);
messageRoutes.delete("/:messageId", authValidation, deleteMessage);

module.exports = messageRoutes;
