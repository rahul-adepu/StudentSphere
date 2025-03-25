const mongoose = require('mongoose');

const classTeacherSchema = mongoose.Schema({
    standard: {
        type: Number,
        unique: true
    },
    classTeacherId: String
})

const ClassTeacher = mongoose.model('classteacher', classTeacherSchema)

module.exports = ClassTeacher;