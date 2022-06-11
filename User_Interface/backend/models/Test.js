const mongoose = require('mongoose');
const { Patient } = require('./User');
const { Notification } = require('./Notification');

const TestSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  doctor: { type: String },
  testName: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    default: (Math.random() + 1).toString(36).substring(7)
  },
  date: {
    type: String,
    required: true
  },
  guide: {
    type: String
  },
  status: {
    type: String,
    default: 'new'
  },
  confirmationStatus: {
    type: String,
    default: 'response_required'
  },
  gameLog: {
    type: [
      {
        type: String
      }
    ],
    default: []
  },
  sensorLog: {
    type: [
      {
        type: String
      }
    ],
    default: []
  },
  foodGuide: {
    type: [
      {
        food: String,
        amountType: String,
        amount: Number,
        timeBeforeTest: Number,
        timeType: String,
        description: String
      }
    ]
  }
});
TestSchema.set('timestamps', true);

const Test = mongoose.model('test', TestSchema);

// this will run the test watch below only when status is new or planned...
const pipeline = [
  {
    $match: { 'fullDocument.status': { $in: ['new', 'planned'] } }
  }
];

Test.watch(pipeline, { fullDocument: 'updateLookup' }).on(
  'change',
  async (data) => {
    const test = data.fullDocument;
    const { gameLog, sensorLog, status, testName } = test;
    const areLogsDefined = !!gameLog.length && !!sensorLog.length;
    const isNewOrPlanned = status === 'new' || status === 'planned';
    if (areLogsDefined && isNewOrPlanned) {
      const patient = await Patient.findOne({ _id: test.patient.toString() });
      const doctorID = patient.createdBy.toString();
      const notification = new Notification({
        doctor: doctorID,
        content: `Test is DONE - ${testName}`,
        status: 'new'
      });
      await Test.findOneAndUpdate(
        { _id: test._id.toString() },
        {
          status: 'done'
        }
      );
      await notification.save();
      sockets[doctorID]?.emit('test:confirm', doctorID);
    }
  }
);

module.exports = { Test };
