const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  patient: String,
  doctor: String,
  content: String,
  date: {
    type: Number,
    default: new Date().getTime()
  },
  status: {
    type: String,
    default: 'new'
  },
  sender: {
    type: String,
    default: 'system'
  }
});

const Notification = mongoose.model('notification', NotificationSchema);

module.exports = { Notification };
