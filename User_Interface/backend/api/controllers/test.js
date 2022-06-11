const express = require('express');
const { Test } = require('../../models/Test');
const { Notification } = require('../../models/Notification');
const { Patient } = require('../../models/User');
const { Treatment } = require('../../models/Treatment');

const router = express.Router();

router.post('/', async (req, res) => {
  const testInputs = req.body;
  const treatment = await Treatment.findOne({ patient: testInputs.patient });
  const { status } = treatment;
  const test = new Test({ ...testInputs, doctor: req.user.id });
  await test.save();
  if (status === 'new') {
    treatment.status = 'progress';
    const notification = new Notification({
      patient: testInputs.patient,
      content: `Treatment in progress`,
      date: new Date()
    });
    await notification.save();
    await Treatment.findOneAndUpdate(
      { patient: testInputs.patient },
      {
        status: 'progress'
      }
    );
  }
  const notification = new Notification({
    patient: testInputs.patient,
    content: `Test Created - ${testInputs.testName}`,
    date: new Date()
  });
  await notification.save();
  return res.status(200).json({ success: true });
});

router.get('/all', async (req, res) => {
  const patientTests = await Test.find({ doctor: req.user.id })
    .populate('patient')
    .sort({ date: -1 });
  return res.status(200).json({
    tests: patientTests
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const patientTests = await Test.find({ patient: id }).sort({ date: -1 });
  const treatment = await Treatment.findOne({ patient: id });
  return res.status(200).json({
    tests: patientTests,
    treatment
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const test = await Test.findOneAndDelete({ _id: id });
  const notification = new Notification({
    patient: test.patient.toString(),
    content: `Test Deleted - ${test.testName}`,
    date: new Date()
  });
  await notification.save();
  return res.status(200).json({ success: true });
});

router.post('/:id', async (req, res) => {
  const { id } = req.params;
  const testInputs = req.body;
  const test = await Test.findOneAndUpdate({ _id: id }, testInputs);
  const notification = new Notification({
    patient: test.patient.toString(),
    content: `Test updated - ${test.testName}`,
    date: new Date()
  });
  await notification.save();
  return res.status(200).json({ success: true });
});

router.post('/status/:id', async (req, res) => {
  const { id } = req.params;
  const test = await Test.findOneAndUpdate(
    { _id: id },
    { confirmationStatus: 'approve', status: 'planned' }
  );
  const patient = await Patient.findOne({ _id: test.patient.toString() });
  const notification = new Notification({
    doctor: patient.createdBy.toString(),
    content: `Test Confirmed by ${patient.fullName} - ${test.testName}`,
    date: new Date()
  });
  await notification.save();
  return res.status(200).json({ success: true });
});

module.exports = router;
