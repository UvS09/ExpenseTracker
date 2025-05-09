const app = require('./src/app');
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/db/connectDB');
const { HealthCheckRoute } = require('./src/routes/healthcheck.route');
const { AuthRouter } = require('./src/routes/auth.route');
dotenv.config();
const PORT = process.env.PORT || 3000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', HealthCheckRoute);
app.use('/api/user', AuthRouter);



connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });
