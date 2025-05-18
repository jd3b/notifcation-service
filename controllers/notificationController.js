const notificationService = require("../services/notificationService");

const sendNotification = async (req, res) => {
  const { type, recipient, message, userId } = req.body;

  if (!type || !recipient || !message || !userId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await notificationService.sendNotification(
      type,
      recipient,
      message,
      userId
    );
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed", details: error });
  }
};

const getUserNotifications = async (req, res) => {
  try {
    const userId = req.params.userId; 
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const notifications = await notificationService.getUserNotifications(userId);
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error", error); 
    res
      .status(500)
      .json({ error: "Failed", details: error });
  }
};


module.exports = {
  sendNotification,
  getUserNotifications,
};
