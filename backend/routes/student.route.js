const express = require('express');
const User = require('../models/user.model');
const Student = require('../models/student.model');

const studentRoutes = express.Router();

studentRoutes.get("/getAllStudents", async (req, res) => {
    const student = {};

    const gettingFromUsersCollections = await User.find({ role: "student" })
    // console.log(gettingFromUsersCollections)
    res.json(gettingFromUsersCollections)
})

studentRoutes.get('/getStudentById/:id', async (req, res) => {
    const output = {};

    const { id } = req.params;
    // console.log(id)

    const gettingStudentBytheirIdFromUsers = await User.findById(id)
    const gettingStudentBytheirIdFromStudents = await Student.findOne({ studentId: id })
    // console.log(gettingStudentBytheirIdFromUsers)
    res.json({ gettingStudentBytheirIdFromUsers, gettingStudentBytheirIdFromStudents })

})

module.exports = studentRoutes;