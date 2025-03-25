const jwt = require("jsonwebtoken");
const ClassTeacher = require("../models/classteacher.model");


const checkAuth = async (req, res, next) => {
    // console.log(req.headers)
    const token = req.headers?.authorization?.split(" ")[1];
    // console.log(token);

    if (!token) {
        return res.send("Please Login")
    }
    else {
        const output = jwt.verify(token, 'rahul', function (err, decoded) {
            if (decoded) {
                return decoded
            }
            else return res.send(err.message)
        });
        // console.log(output)
        if (output.role == "class teacher") {
            const fromClassTeacherCollection = await ClassTeacher.findOne({ classTeacherId: output.userId })
            // console.log(fromClassTeacherCollection)
            req.body = { ...output, standard: fromClassTeacherCollection.standard }
            next();
        }
        else {
            return res.send("You are Unauthorized")
        }
    }

}


module.exports = checkAuth