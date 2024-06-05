import Coversation from "../models/coversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message } = JSON.parse(req.body.data);
    const senderId = req.user._id;

    let conversation = await Coversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Coversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      // await Coversation.findByIdAndUpdate(conversation._id, {
      //   $push: { messages: newMessage._id },
      // });
      conversation.messages.push(newMessage._id);
    }

    //SOCKET IO FUNCTIONALITY WILL BE ADDED HERE

    //This is a better way to save multiple documents at once
    //Since we saving it in parallel
    await Promise.all([newMessage.save(), conversation.save()]);

    res.status(200).json(newMessage);
  } catch (err) {
    console.log("Error in sendMessage controller: ", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id; //coming from protectRoute middleware
    const coversation = await Coversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); //Not messsage ids but actual messages

    if (!coversation) {
      return res.status(200).json([]);
    }
    const messages = coversation.messages;
    res.status(200).json(messages);
  } catch (err) {
    console.log("Error in getMessages controller: ", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
