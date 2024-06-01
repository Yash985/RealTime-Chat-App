import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }); //Getting all users except the logged in user
    res.status(200).json(filteredUsers);
  } catch (err) {
    console.log("Error in getUsersForSidebar: ", err.message);
    res.status(500).json({ message: "Internal server Error" });
  }
};
