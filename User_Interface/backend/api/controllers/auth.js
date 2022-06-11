const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');
const { Doctor, Patient, User } = require('../../models/User');

const register = async (req, res) => {
  const {
    fullName,
    id,
    email,
    gender,
    degree,
    expertise,
    phoneNumber,
    password
  } = req.body;
  try {
    let user = await Doctor.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: { msg: 'User already exists' } });
    }
    const date = new Date();
    user = new Doctor({
      fullName,
      id,
      email,
      gender,
      degree,
      expertise,
      phoneNumber,
      password,
      date
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();
    return res.status(200).json({
      success: true
    });
  } catch (err) {
    res.status(500).send('Server 500 error');
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: { msg: 'Invalid Email' } });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ errors: { msg: 'Invalid Password' } });
    }
    const publicUserData = {
      id: user._id,
      type: user.__t,
      fullName: user.fullName,
      createdBy: user.createdBy
    };
    if (user.__t === 'patient') {
      publicUserData['isPasswordSet'] = user.isPasswordSet;
    }

    jwt.sign(
      publicUserData,
      config.get('jwtSecret'),
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token, user: publicUserData });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const changePassword = async (req, res) => {
  const { password, id } = req.body;
  Patient.findByIdAndUpdate(id, { password: password })
    .then((results) => res.json({ status: 'success' }))
    .catch((err) => {
      res.status(400).json({ ChangePatientPassword: err.message });
    });
};

module.exports = {
  register,
  login,
  changePassword
};
