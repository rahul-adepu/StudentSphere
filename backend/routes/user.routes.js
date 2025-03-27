const Admission = require('../models/admission.model');
const ClassTeacher = require('../models/classteacher.model');
const Student = require('../models/student.model');
const User = require('../models/user.model');
var jwt = require('jsonwebtoken');
const express = require('express');
const authorizeRoles = require('../middlewares/checkAuth');

const userRouter = express.Router();

const generateAdmissionNo = async () => {
    const lastAdmission = await Admission.findOne().sort({ admissionNo: -1 });
    console.log("Last Admission", lastAdmission)
    if (!lastAdmission) return "A0001";

    const lastNumber = parseInt(lastAdmission.admissionNo.slice(1));
    const nextNumber = (lastNumber + 1).toString().padStart(4, '0');
    return `A${nextNumber}`;
};

userRouter.post('/register/classteacher', authorizeRoles(['admin']), async (req, res) => {
    const { name, mobile, password, standard } = req.body;

    try {

        const existingUser = await User.findOne({ mobile });
        if (existingUser) {
            return res.status(400).json({ message: "Mobile number already registered" });
        }

        const newUser = await User.create({ name, mobile, role: "class teacher", password });

        await ClassTeacher.create({ standard, classTeacherId: newUser._id });

        return res.status(201).json({ message: "Class teacher registered successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});





userRouter.post('/register/student', authorizeRoles(['class teacher']), async (req, res) => {
    const { name, mobile, password } = req.body;
    const { classTeacherMobile, standard } = req.user;

    try {
        const existingUser = await User.findOne({ name, mobile });
        if (existingUser) {
            return res.status(400).json({ message: "Mobile number already registered" });
        }

        const createUser = await User.create({ name, mobile, role: "student", password });

        const admissionNo = await generateAdmissionNo();

        await Student.create({
            standard,
            admissionNo,
            studentId: createUser._id,
            classTeacherMobile
        });

        await Admission.create({
            admissionNo,
            studentId: createUser._id
        });

        console.log("Student details created successfully");
        res.status(201).json({ message: "Student registered successfully" });

    } catch (error) {
        console.error("Registration failed:", error);
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
});


userRouter.post('/login', async (req, res) => {
    const { name, mobile, password } = req.body;
    const findingMobile = await User.findOne({ name, mobile })

    if (!findingMobile) {
        return res.send("User Not Found!! Please Register")
    }

    try {
        const loginSuccess = await User.findOne({ mobile, password });
        console.log("I am in login success", loginSuccess)
        if (!loginSuccess) {
            return res.send("Wrong Credentials")
        }
        else {

            const toGetStandardFromClassTeacherCollection = await ClassTeacher.findOne({ classTeacherId: loginSuccess._id })
            console.log("jjjjjjjjjjjjjjjjjjj",toGetStandardFromClassTeacherCollection)
            var token = jwt.sign({ role: loginSuccess.role, userId: loginSuccess._id, classTeacherMobile: loginSuccess.mobile, standard: toGetStandardFromClassTeacherCollection.standard }, 'rahul');
            console.log(token)
            res.status(200).json({ message: "Login Successfull", token })
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})




module.exports = userRouter;