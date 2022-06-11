const bcrypt = require('bcryptjs');
const { Patient } = require('../../models/User');

const newPassword = async (req, res) => {
  const { id } = req.user;
  const { password } = req.body;
  const salt = await bcrypt.genSalt();
  const encryptedPassword = await bcrypt.hash(password, salt);
  const p = await Patient.findOne({ _id: id });
  await Patient.findOneAndUpdate(
    { _id: id },
    {
      password: encryptedPassword
    }
  );
  return res.status(200).json({ success: true });
};

module.exports = {
  newPassword
};
