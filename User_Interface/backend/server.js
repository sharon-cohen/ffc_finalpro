const express = require('express');
const { Server } = require('socket.io');

const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

const registerTestHandlers = require('./api/socket-handlers/testHandler');

const userRoute = require('./routes/user-route');
const authRoute = require('./routes/auth-route');

const patientRoutes = require('./api/controllers/patient');

const testRoutes = require('./api/controllers/test');
const notificationsRoutes = require('./api/controllers/notification');
const treatmentRoutes = require('./api/controllers/treatment');
const authMiddleware = require('./middleware/auth');
const fileupload = require('express-fileupload');

connectDB();

require('./jobs/test-job');

app.use(express.json());
app.use(fileupload());
app.use(cors({ origin: '*' }));
app.use('/auth/', authRoute);
app.use('/api/*', authMiddleware);
app.use('/api/users', userRoute);
app.use('/api/patient/', patientRoutes);
app.use('/api/test', testRoutes);
app.use('/api/treatment', treatmentRoutes);
app.use('/api/notifications', notificationsRoutes);

const server = app.listen(5000, function () {
  console.log('listening on *:5000');
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    allowedHeaders: ['x-auth-token'],
    credentials: true
  }
});

global.io = io;
global.sockets = {};

const onConnection = (socket) => {
  const user = {};
  socket.on('data', (id) => {
    user.id = id;
    sockets[id] = socket;
  });
  socket.on('disconnect', () => {
    delete sockets[user.id];
  });

  registerTestHandlers(io, socket, sockets);
};

io.on('connection', onConnection);
