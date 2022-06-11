const express = require('express');
const { Treatment } = require('../../models/Treatment');
const { Notification } = require('../../models/Notification');

const router = express.Router();

router.post('/toggle-status/', async (req, res) => {
  const { status, treatment: id } = req.body;
  const treatment = await Treatment.findOneAndUpdate(
    { _id: id },
    {
      status: status
    }
  );
  const { doctor, patient } = treatment;
  const doctorID = doctor.toString();
  const patientID = patient.toString();

  const notification = new Notification({
    patient: patientID,
    content: `Treatment is ${status}`,
    date: new Date()
  });
  await notification.save();
  sockets[doctorID]?.emit('test:update');
  sockets[patientID]?.emit('test:update');
  return res.status(200).json({ success: true });
});
router.post('/complete/', async (req, res) => {
  const { treatmentSummary, treatmentID: id } = req.body;
  const treatment = await Treatment.findOneAndUpdate(
    { _id: id },
    {
      status: 'complete',
      summary: treatmentSummary
    }
  );
  const { patient, doctor } = treatment;
  const patientID = patient.toString();
  const doctorID = doctor.toString();

  const notification = new Notification({
    patient: patientID,
    content: `Treatment is Completed!`,
    date: new Date()
  });
  await notification.save();
  sockets[patientID]?.emit('test:update');
  sockets[doctorID]?.emit('test:update');
  return res.status(200).json({ success: true });
});

module.exports = router;
