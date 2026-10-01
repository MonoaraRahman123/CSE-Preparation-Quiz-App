import express from "express";
import { demoNotifications } from "../data/seedData.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();
let notifs = [...demoNotifications];

router.get("/", authenticateToken, (req, res) => {
  const unreadCount = notifs.filter(n => !n.read).length;
  res.json({ success: true, unreadCount, notifications: notifs });
});

router.put("/:id/read", authenticateToken, (req, res) => {
  const notif = notifs.find(n => n._id === req.params.id);
  if (notif) notif.read = true;
  res.json({ success: true, notification: notif });
});

router.put("/mark-all-read", authenticateToken, (req, res) => {
  notifs.forEach(n => n.read = true);
  res.json({ success: true, message: "All notifications marked as read." });
});

export default router;
