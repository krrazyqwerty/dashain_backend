const Message = require("../models/Message");

// Send Message Controller
exports.sendMessage = async (req, res) => {
    try {
        const { receiverId, content } = req.body;
        const senderId = req.user._id;

        const newMessage = await Message.create({
            sender: senderId,
            receiver: receiverId,
            content
        });

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: newMessage
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error sending message",
            error: error.message
        });
    }
};

// Get Messages Controller
exports.getMessages = async (req, res) => {
    try {
        const userId = req.user._id;
        const { conversationWith } = req.query;

        const messages = await Message.find({
            $or: [
                { sender: userId, receiver: conversationWith },
                { sender: conversationWith, receiver: userId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            data: messages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching messages",
            error: error.message
        });
    }
};

// Delete Message Controller
exports.deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const userId = req.user._id;

        const message = await Message.findOneAndDelete({
            _id: messageId,
            sender: userId
        });

        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found or you're not authorized to delete it"
            });
        }

        res.status(200).json({
            success: true,
            message: "Message deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting message",
            error: error.message
        });
    }
};
