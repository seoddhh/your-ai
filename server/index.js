const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const questionsRouter = require('./routes/questions');
const answersRouter = require('./routes/answers');

app.use('/api/questions', questionsRouter);
app.use('/api/answers', answersRouter);

// Health Check
app.get('/', (req, res) => {
    res.send('Your AI Server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
