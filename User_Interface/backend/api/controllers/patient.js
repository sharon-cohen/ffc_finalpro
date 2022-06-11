const express = require('express');
const { Patient } = require('../../models/User');
const { Treatment } = require('../../models/Treatment');
const bcrypt = require('bcryptjs');
const ObjectId = require('mongoose').Types.ObjectId;

const router = express.Router();

router.post('/create', async (req, res) => {
  const { id } = req.user;
  const { patientForm } = req.body;
  const salt = await bcrypt.genSalt(10);
  const encryptPassword = await bcrypt.hash(patientForm.id, salt);
  const patient = new Patient({
    createdBy: id,
    ...patientForm,
    password: encryptPassword
  });
  await patient.save();
  const treatment = new Treatment({
    doctor: id,
    patient: patient._id,
    status: 'new'
  });
  await treatment.save();
  res.status(200).json({ success: true });
});

router.get('/', async (req, res) => {
  const { id } = req.user;
  const patients = await Patient.find({ createdBy: ObjectId(id) });
  return res.status(200).json({ patients });
});

module.exports = router;
