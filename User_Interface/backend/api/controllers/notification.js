const express = require('express');
const { Notification } = require('../../models/Notification');

const router = express.Router();

router.get('', async (req, res) => {
  const { id } = req.user;
  const notifications = await Notification.find(
    {
      $or: [{ patient: id }, { doctor: id }]
    },
    {},
    {
      sort: {
        date: -1
      }
    }
  );
  return res.status(200).json(notifications);
});

router.post('/status', async (req, res) => {
  const { notifications: n } = req.body;
  await Notification.updateMany(
    { _id: n },
    { status: 'read' },
    {
      sort: 'date'
    }
  );
  res.status(200).json({ success: true });
});

router.post('/ticket', async (req, res) => {
  const { content, userSendType, sendToUserID } = req.body;
  const notification = new Notification({
    [userSendType]: sendToUserID,
    content,
    sender: req.user.fullName,
    status: 'new'
  });
  await notification.save();
  sockets[sendToUserID]?.emit('test:update');
  res.status(200).json({ success: true });
});

module.exports = router;
