const mongoose = require('mongoose');

const admissionSchema = mongoose.Schema({
    admissionNo: {
        type: String,
        unique: true,
        required: true
    },
    studentId: String
})

const Admission = mongoose.model('admission', admissionSchema)

module.exports = Admission;