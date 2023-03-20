const express = require('express')
const jwt = require('jsonwebtoken')
const client = require('../connection/connection')
const bodyParser = require('body-parser')

const router = express.Router()
router.use(bodyParser.json())

require('dotenv').config();

router.post('/', (req, res) => {
    const { username, password } = req.body;

    client.query(`SELECT password,user_type,firstname,lastname FROM users WHERE username='${username}'`, (err, result) => {
        if (!err) {
            if (result.rows[0] && result.rows[0].password === password) {
                const token = jwt.sign({username:username,user_type:result.rows[0].user_type},process.env.SECRET_KEY)
                const sendItems = {
                    user_type: result.rows[0].user_type,
                    firstname: result.rows[0].firstname,
                    lastname: result.rows[0].lastname,
                    token: token
                }
                res.send(sendItems)
            }
            else {
                res.send('Invalid Credentials')
            }
        }
        else {
            console.log(err.message);
        }
    })
    client.end;
})


router.post('/post', (req, res) => {
    const userData = req.body;
    console.log(userData);
    const sqlQuery = `INSERT INTO users (username, firstname, lastname, email, password) 
    VALUES ('${userData.username}', '${userData.firstname}', '${userData.lastname}', '${userData.email}', '${userData.password}')`
    client.query(sqlQuery, (err, result) => {
        if (!err) {
            console.log(result);
            res.send('Insertion successfull')
        }
        else {
            res.send('Username already taken')
        }
    })
    client.end;
})


module.exports = router