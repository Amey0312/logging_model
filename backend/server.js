require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const path = require("path");
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 5000;

// Serve static files from the Next.js build
app.use(express.static(path.join(__dirname, "../my-app/out")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../my-app/out/index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
