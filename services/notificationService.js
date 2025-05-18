const nodemailer = require("nodemailer");
const twilio = require("twilio");
const Notification = require("../models/notificationModel");

const nodemailerConfig = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};
const transporter = nodemailer.createTransport(nodemailerConfig);

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

/**
 * Sends an email notification.
 */
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: nodemailerConfig.auth.user,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return { success: true, message: "Email sent successfully", info: info };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email", error: error };
  }
};

/**
 * Sends an SMS notification.
 */
const sendSMS = async (to, body) => {
  try {
    const message = await twilioClient.messages.create({
      body,
      to,
      from: twilioPhoneNumber,
    });
    console.log("SMS sent:", message.sid);
    return {
      success: true,
      message: "SMS sent successfully",
      sid: message.sid,
    };
  } catch (error) {
    console.error("Error sending SMS:", error);
    return { success: false, message: "Failed to send SMS", error: error };
  }
};

/**
 * Stores a notification in the database (using Mongoose).
 */
const storeNotification = async (userId, type, message) => {
  try {
    const newNotification = new Notification({ userId, type, message });
    const savedNotification = await newNotification.save();
    console.log("Notification stored:", savedNotification);
    return savedNotification;
  } catch (error) {
    console.error("Error storing notification:", error);
    throw error;
  }
};

/**
 * Retrieves notifications for a user from the database (using Mongoose).
 */
const getUserNotifications = async (userId) => {
  try {
    const notifications = await Notification.find({ userId }).exec();
    console.log(`Notifications for user ${userId}:`, notifications);
    return notifications;
  } catch (error) {
    console.error("Error retrieving notifications:", error);
    throw error;
  }
};

/**
 * Main function to handle sending notifications.  This function orchestrates
 * the sending of the notification and the storing of the notification data.
 */
const sendNotification = async (type, recipient, message, userId) => {
  let result;
  try {
    switch (type) {
      case "email":
        result = await sendEmail(recipient, "Notification", message);
        break;
      case "sms":
        result = await sendSMS(recipient, message);
        break;
      case "in-app":
        result = { success: true, message: "In-app notification stored" };
        break;
      default:
        throw new Error("Invalid notification type");
    }

    if (result.success) {
      const storedNotification = await storeNotification(userId, type, message);
      return {
        message: result.message,
        notification: storedNotification,
      };
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("Error in sendNotification service:", error);
    throw error;
  }
};

module.exports = {
  sendNotification,
  getUserNotifications,
};
