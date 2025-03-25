const checkAuth = require('../middlewares/checkAuth');
const Admission = require('../models/admission.model');
const ClassTeacher = require('../models/classteacher.model');
const Student = require('../models/student.model');
const User = require('../models/user.model');
var jwt = require('jsonwebtoken');
const express = require('express');

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
    const { name, mobile, role, password, standard, admissionNo } = req.body;

    try {

        const createUser = await User.create({ name, mobile, role, password });
        res.send("User Created Successfully")

        if (role == "student") {
            const studentDetails = await Student.create({ standard, admissionNo, studentId: createUser._id })
            const AdmissionDetails = await Admission.create({ admissionNo, studentId: createUser._id })
            console.log("Student details inserted Successfully")
        }
        else if (role == "class teacher") {
            await ClassTeacher.create({ standard, classTeacherId: createUser._id })
            console.log("Class teacher created successfully")
        }

    } catch (error) {
        res.send(error.message)
    }
})

userRouter.post('/login', async (req, res) => {
    const { mobile, password } = req.body;
    const findingMobile = await User.findOne({ mobile })

    if (!findingMobile) {
        return res.send("User Not Found!! Please Register")
    }

    try {
        const loginSuccess = await User.findOne({ mobile, password });
        console.log("I am in login success",loginSuccess)
        if (!loginSuccess) {
            return res.send("Wrong Credentials")
        }
        else {
            var token = jwt.sign({ role: loginSuccess.role, userId: loginSuccess._id }, 'rahul');
            console.log(token)
            res.status(200).json({ message: "Login Successfull", token })
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})




module.exports = userRouter;