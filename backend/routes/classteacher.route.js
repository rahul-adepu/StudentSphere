const express = require('express');
const checkAuth = require('../middlewares/checkAuth');
const Student = require('../models/student.model');
const User = require('../models/user.model');

const classTeacherRoutes = express.Router();


classTeacherRoutes.get('/getAllStudents', checkAuth, async (req, res) => {
    const { standard } = req.body;

    const studentDataFromStudentCollection = await Student.find({ standard })
    console.log("studentDataFromStudentCollection", studentDataFromStudentCollection)

    const allStudentsFromClass = await Promise.all(studentDataFromStudentCollection.map(async (student) => {
        return await User.findOne({ _id: student.studentId })
    }))

    console.log("allStudentsFromclass", allStudentsFromClass);
    res.send("Success");

})


module.exports = classTeacherRoutes;