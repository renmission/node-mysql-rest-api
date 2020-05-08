const db = require('../config');

exports.register = (data, cb) => {
    db.query(
        `insert into registration(firstName, lastName, gender, email, password, number) values(?,?,?,?,?,?)`,
        [
            data.firstName,
            data.lastName,
            data.gender,
            data.email,
            data.password,
            data.number
        ],
        (err, users) => {
            if(err) return cb(err);
            return cb(null, users);
        }
        );
}

exports.login = (email, cb) => {
    db.query(`select * from registration where email = ?`, [email], (err, users) => {
        if(err) return cb(err);
        return cb(null, users[0]);
    });
}

exports.getAllUsers = cb => {
    db.query(`select id,firstName,lastName,gender,email,number from registration`, (err, users) => {
        if(err) return cb(err);
        return cb(null, users);
    });
}

exports.getSingleUser = (id, cb) => {
    db.query(`select * from registration where id = ?`, [id], (err, user) => {
        if(err) return cb(err);
        return cb(null, user[0]);
    });
}

exports.updateUser = (data, cb) => {
    db.query(
        `update registration set firstName=?, lastName=?, gender=?, email=?, number=? where id = ?`, 
        [  
            data.firstName,
            data.lastName,
            data.gender,
            data.email,
            data.number,
            data.id
        ], 
        (err, user) => {
            if(err) return cb(err);
            return cb(null, user[0]);
    });
}

exports.deleteUser = (data, cb) => {
    db.query(
        `delete from registration where id = ?`, 
        [data.id], 
        (err, user) => {
            if(err) return cb(err);
            return cb(null, user[0]);
        });
}