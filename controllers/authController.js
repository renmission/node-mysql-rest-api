const userModel = require('../models/userModel');
const { hashSync, genSaltSync, compareSync } = require('bcryptjs');
const { sign } = require("jsonwebtoken");

const createSendToken = (user, statuCode, res) => {
    const token = sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    });

    user.password = undefined;

    res.status(statuCode).json({
        status: 'success',
        token,
        data: user
    });
}

exports.register = (req, res, next) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    userModel.register(body, (err, user) => {
        if(err) {
            console.log(err);
            return res.status(500).json({
                status: 'fail',
                message: 'Database connection error...'
            });
        }

        createSendToken(user, 200, res);
    });
}

exports.login = (req, res, next) => {
    const body = req.body;
    
    userModel.login(body.email, (err, user) => {

        if (!body.email || !body.password) {
            return res.status(400).json({
                message: 'Please provide email or password'
            });
        }

        if (err) return console.log(err);
        
        if(!user || !(compareSync(body.password, user.password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid email or password'
            });
        }

        createSendToken(user, 200, res);0
    });
}

