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
        (error, results, fields) => {
            if(error) return cb(error);
            return cb(null, results);
        }
        );
}

exports.login = (email, cb) => {
    db.query(`select * from registration where email = ?`, [email], (error, results) => {
        if(error) return cb(error);
        return cb(null, results[0]);
    });
}