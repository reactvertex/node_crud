const { reject } = require('bcrypt/promises');
const dbConn = require('../../config/db.config');
const bcrypt = require('bcrypt');

const User = function(user){
    this.username = user.username,
    this.email = user.email,
    this.password = user.password,
    this.first_name = user.first_name,
    this.last_name = user.last_name
}

User.createUserQuery = (newUser) => {
    return new Promise((resolve, reject) =>{
        dbConn.query("INSERT INTO users SET ?", newUser, async (err, res) =>{
           if (err) {
            console.error("Database Error: ", err.message); 
            return reject(new Error('Failed to insert new user into the database'));
           } else {
            console.log("New user inserted with ID:", res.insertId);
            resolve(res.insertId);
           }
        })
    })
};

User.getUserByEmailQuery = (email) =>{
    return new Promise((resolve, reject) =>{
        dbConn.query("SELECT * FROM users WHERE email = ? ", [email], async (err, res)=>{
            if (err) {
                console.error("Database Error: ", err.message); 
                return reject(new Error('Failed to retrieve user from the database')); 
              }
              if (res.length === 0) {
                return resolve(null); 
              }
              resolve(res[0])
        });
    });
}
module.exports = User;