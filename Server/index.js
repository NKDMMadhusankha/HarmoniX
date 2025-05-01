require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authController = require('./controllers/authController');
const authRoutes = require('./routes/authRoutes'); // Make sure this path is correct
const musicianAuthRoutes = require('./routes/musicianAuthRoutes');
const contactRoute = require('./routes/contact');
const studioRoutes = require('./routes/studioRoutes'); // Add this line

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors({
origin: 'http://localhost:5173', // Replace with your frontend's origin
methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
credentials: true,
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
// Removed deprecated options
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
if (err.name === 'MongooseServerSelectionError') {
console.error('MongoDB Connection Error: Could not connect to any servers in your MongoDB Atlas cluster. Make sure your current IP address is on your Atlas cluster\'s IP whitelist: https://www.mongodb.com/docs/atlas/security-whitelist/');
} else {
console.error('MongoDB connection error:', err);
}
});

// Routes
app.get('/', (req, res) => {
res.send('Hello World!');
});

// Registration route
app.post('/api/auth/register', authController.register);

// New auth routes
app.use('/api/auth', authRoutes); // This must match your frontend request
app.use('/api/musician', musicianAuthRoutes);

const musicianProfileRoutes = require('./routes/musicianProfileRoutes');
app.use('/api/musician', musicianProfileRoutes);

app.use('/api/contact', contactRoute);
app.use('/api/studio', studioRoutes); // Add this line

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
})