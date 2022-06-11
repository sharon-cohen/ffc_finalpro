module.exports = (io, socket, sockets) => {
  const createTest = (patientID) => {
    sockets[patientID]?.emit('test:create', { message: 'TEST_CREATE' });
  };
  const updateTest = (patientID) => {
    sockets[patientID]?.emit('test:update', { message: 'TEST_UPDATE' });
  };
  const deleteTest = (patientID) => {
    console.log(patientID);
    sockets[patientID]?.emit('test:delete', { message: 'TEST_DELETE' });
  };
  const confirmTest = (doctorID) => {
    console.log(doctorID);
    sockets[doctorID]?.emit('test:delete', { message: 'TEST_DELETE' });
  };

  socket.on('test:create', createTest);
  socket.on('test:update', updateTest);
  socket.on('test:delete', deleteTest);
  socket.on('test:confirm', confirmTest);
};
