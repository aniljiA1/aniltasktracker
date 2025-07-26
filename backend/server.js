// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth');
// const taskRoutes = require('./routes/tasks');
// const { authenticateJWT } = require('./middleware/auth');

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());


// app.use('/api', authRoutes);
// app.use('/api/tasks', authenticateJWT, taskRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// //app.get('/', (req, res) => {
//   //res.send('Server is running!');
// //});

// //app.listen(PORT, () => {
//   //console.log(`Server running on port ${PORT}`);
// //});

const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
