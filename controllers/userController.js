const userModel = require('../models/userModel');

exports.getAllUsers = (req, res, next) => {
    userModel.getAllUsers((err, users) => {
        if(err) {
            res.status(404).json({
                status: 'fail',
                message: 'Users not found'
            });
        }

        users.password = undefined;

        return res.status(200).json({
            status: 'success',
            count: users.length,
            data: users
        });
    });
}

exports.getUser = (req, res, next) => {
    userModel.getSingleUser(req.params.id, (err, user) => {
        if(err) {
            res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        user.password = undefined;

        return res.status(200).json({
            status: 'success',
            data: user
        });
    });
}

exports.updateUser = (req, res, next) => {
    userModel.updateUser(req.body, (err, user) =>{
        if(err) {
            res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }


        return res.status(200).json({
            status: 'success',
            message: 'updated successfully',
            data: user
        });
    })
}

exports.deleteUser = (req, res, next) => {
    userModel.deleteUser(req.body, (err, user) => {
        if(err) {
            res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        return res.status(200).json({
            status: 'success',
            data: {}
        });
    });
}

