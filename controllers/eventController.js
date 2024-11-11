const Event = require("../models/Events");
const User = require("../models/User");

const createEvent = async (req, res) => {
  const { title, description, date } = req.body;
  const currentUserId = req.user._id;
  const newEvent = new Event({
    title,
    description,
    date,
    creator: currentUserId,
    participants: [currentUserId],
  });

  await newEvent.save();
  res.status(201).json({
    msg: "Event is Created Successfully",
    data: newEvent,
  });
};

const getEvent = async (req, res) => {
  const currentUserId = req.user._id;
  const myEvents = await Event.find({
    creator: currentUserId,
  });
  if (myEvents.length === 0) {
    return res.status(404).json({
      msg: "No Events were found",
    });
  }
  res.status(200).json({
    data: myEvents,
  });
};

const joinEvent = async (req, res) => {
  const eventId = req.params.eventId;
  const userId = req.user._id;

  const isEventExist = await Event.findById(eventId);
  if (!isEventExist) {
    return res.status(404).json({ msg: "Event not found" });
  }
  if (isEventExist.participants.includes(userId)) {
    return res.status(400).json({ msg: "User is already a participant" });
  }

  const creatorInfo = await User.findOne({
    _id: isEventExist.creator,
  });
  //   console.log(userId);
  //   console.log(creatorInfo.familyConnections);
  //   console.log(creatorInfo.familyConnections.includes(userId));
  if (!creatorInfo.familyConnections.includes(userId)) {
    return res
      .status(403)
      .json({ msg: "You are not a family member of event creator" });
  }
  isEventExist.participants.push(userId);
  await isEventExist.save();
  res.status(200).json({ msg: "User joined the event successfully" });
};

const getEventDetails = async (req, res) => {
  try {
    // console.log("Full req.user object:", req.user);
    // console.log("req.user._id:", req.user?._id);
    // if (!req.user || !req.user._id){
    //   return res.status(401).json({ msg:"User Unauthorized"})

      const eventId = req.params.eventId;
      console.log(req.user)
      const currentUserId = req.user._id;
      
      const event = await Event.findById(eventId);
      if (!event) {
          return res.status(404).json({ msg: "Event not found" });
        }
        const isParticipant = event.participants.includes(currentUserId);
        if (!isParticipant) {
            return res
            .status(403)
            .json({ msg: " Your are not authorized to view event" });
        }
        
        const isCreator = event.creator.toString() === currentUserId.toString();
        const isJoined = isParticipant;
        
        await event.populate("creator", "name email profilePicture");
        res.status(200).json({
            event,
            isCreator,
            isJoined,
        });
    }
     catch (err) {
        console.log(err);
        res.status(500).json({ msg: err.message });
    };}


module.exports = { createEvent, getEvent, joinEvent, getEventDetails }
