const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./controllers/users.js');
const contactRouter = require('./controllers/contacts.js');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/contacts', contactRouter);

app.listen(process.env.PORT, () => {
    console.log('app is ready');
});