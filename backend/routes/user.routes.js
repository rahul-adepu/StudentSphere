const Student = require('../models/student.model');
const User = require('../models/user.model');
const express = require('express');

const userRouter = express.Router();


userRouter.get('/', (req, res) => {
    res.send("Hello from userROuter")
})

userRouter.post('/register', async (req, res) => {
    const { name, mobile, role, password, standard, admissionNo } = req.body;

    try {

        const createUser = await User.create({ name, mobile, role, password });
        res.send("User Created Successfully")

        if (role == "student") {
            const studentDetails = await Student.create({ standard, admissionNo, studentId: createUser._id })
            console.log("Student details inserted Successfully")
        }
    } catch (error) {
        res.send(error.message)
    }
})



module.exports = userRouter;