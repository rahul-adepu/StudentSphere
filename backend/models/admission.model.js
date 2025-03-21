const mongoose = require('mongoose');

const admissionSchema = mongoose.Schema({
    admissionNo: Number,
    studentId: String
})

const Admission = mongoose.model('admission', admissionSchema)

module.exports = Admission;