const express = require('express');
const { connectDB } = require('./db');
const userRouter = require('./routes/user.routes');
const studentRoutes = require('./routes/student.route');
const classTeacherRoutes = require('./routes/classteacher.route');
const app = express();


app.use(express.json())
app.use('/user', userRouter);
app.use('/student', studentRoutes);
app.use('/classTeacher', classTeacherRoutes)

app.get('/', (req, res) => {
    res.send("Home Page")
})


app.listen(8000, async () => {
    await connectDB()
    console.log("Server is Running on Port 8000")
    console.log("Connected to DB")
})