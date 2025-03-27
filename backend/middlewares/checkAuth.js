const jwt = require("jsonwebtoken");

const authorizeRoles = (allowedRoles = []) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Please Login" })
        }

        try {
            const decoded = jwt.verify(token, 'rahul')
            req.user = decoded;

            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ message: "Unauthorized!!! You Don't have access to this route. Please contact class teacher for registration" })
            }

            next();

        } catch (error) {
            return res.status(401).json({ message: "Invalid token" })
        }
    }
}


module.exports = authorizeRoles;