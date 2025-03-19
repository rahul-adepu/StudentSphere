const User = require('../models/user.model');
const express = require('express');

const userRouter = express.Router();


userRouter.get('/', (req, res) => {
    res.send("Hello from userROuter")
})

userRouter.post('/register', async (req, res) => {
    const { name, mobile, role, password } = req.body;

    try {
        const createUser = await User.create(req.body);
        res.send("User Created Successfully")
    } catch (error) {
        res.send(error.message)
    }
})



module.exports = userRouter;