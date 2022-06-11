const cron = require('node-cron');
const { Test } = require('../models/Test');
const { Notification } = require('../models/Notification');
const { Patient } = require('../models/User');

function addHours(numOfHours = 1, date = new Date()) {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
  return date;
}

cron.schedule('*/30 * * * *', async function () {
  try {
    const tests = await Test.find({
      status: { $in: ['new', 'planned'] }
    });
    await Promise.all(
      tests.map(async (t) => {
        const testEndsOn = addHours(1, new Date(parseInt(t.date, 10)));
        console.log(testEndsOn);
        if (testEndsOn < new Date().getTime()) {
          t.status = 'problem';
          await t.save();
          const patient = await Patient.findOne({ _id: t.patient.toString() });
          const doctorID = patient.createdBy.toString();
          const notification = new Notification({
            doctor: doctorID,
            content: `Problem with Test - ${t.testName}`,
            status: 'new'
          });
          await notification.save();
          sockets[doctorID]?.emit('test:confirm', doctorID);
        }
      })
    );
  } catch (error) {
    console.log('Verifying Tests *Failed*', error);
  }
});
