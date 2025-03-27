const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    standard: Number,
    admissionNo: String,
    classTeacherMobile: Number,
    studentId: String
})


const Student = new mongoose.model('Student', studentSchema);

module.exports = Student;