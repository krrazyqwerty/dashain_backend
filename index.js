const express = require("express");
const mongoose = require("mongoose");
// const cors = require('cors');
require("dotenv").config();
const connectDB = require("./config/databse");
const { getEventDetails } = require("./controllers/eventController");
const app = express();
const http = require("http");
const server = http.createServer(app);

// routes
const userRoutes = require("./routes/userRoutes");
const familyRoute = require("./routes/familyRoutes");
const eventRoutes = require("./routes/eventRoutes");
const photoRoutes = require("./routes/photoRoutes");

// socket
const socketHandler = require("./socket/socketConnect");
const messageRoutes = require("./routes/messageRoutes");
socketHandler(server);

// app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("This is a Test!");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/family", familyRoute);
app.use("/api/event", eventRoutes);
app.use("/api/photo", photoRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/event", getEventDetails);

connectDB();
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
