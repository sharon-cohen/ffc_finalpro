const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  }
});

const DoctorSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true
  },
  expertise: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const PatientSchema = new mongoose.Schema({
  height: {
    type: String
  },
  weight: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  allergies: {
    type: [
      {
        type: String
      }
    ]
  },
  isADHD: {
    type: Boolean
  },
  additionalInformation: {
    type: String
  },
  summary: {
    type: String
  },
  isPasswordSet: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('user', UserSchema);
const Doctor = User.discriminator('doctor', DoctorSchema);
const Patient = User.discriminator('patient', PatientSchema);

module.exports = {
  Doctor,
  Patient,
  User
};
