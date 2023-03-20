const express = require('express')
const client = require('../connection/connection')
const bodyParser = require('body-parser')

const router = express.Router()
router.use(bodyParser.json())

//Complete list of users
router.get('/get', (req, res) => {
    const sqlQuery = 'Select * from users';
    client.query(sqlQuery, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
        else {
            console.log(err.message);
        }
    })
    client.end;
})

// Tasks of admin
router.get('/get/:username', (req, res) => {
    const username = req.params.username;
    console.log(username);
    const sqlQuery = `SELECT * FROM tasks WHERE username = '${username}'`
    client.query(sqlQuery, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
        else {
            console.log(err.message);
        }
    })
    client.end
})

//Search a user
router.get('/:searchParameter', (req, res) => {
    console.log(req.params.searchParameter);
    const searchParameter = req.params.searchParameter.toLowerCase();
    const sqlQuery = `SELECT * FROM users WHERE lower(firstname)=${searchParameter} OR lower(username)=${searchParameter} OR lower(email)=${searchParameter}`
    client.query(sqlQuery, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
        else {
            console.log(err.message);
        }
    })
    client.end;
})

// Change User Role
router.put('/userRole', (req, res) => {
    const userData = req.body;
    console.log(userData);
    const sqlQuery = `UPDATE users SET user_type ='${userData.user_type}' WHERE username = '${userData.username}'`
    client.query(sqlQuery, (err, result) => {
        if (!err) {
            console.log(result);
            res.send('Updated Successfully')
        }
        else {
            console.log(err.message);
            res.send('Something went wrong')
        }
    })
    client.end;
})

//Delete a user
router.delete('/delete/:username', (req, res) => {
    const username = req.params.username
    let sqlQuery = `DELETE FROM tasks WHERE username='${username}'`
    client.query(sqlQuery, (err, result) => {
        if (!err) {
            console.log('Deleted Tasks');
        }
        else
            console.log(err.message);
    })
    client.end
    sqlQuery = `DELETE FROM users WHERE username='${username}'`
    client.query(sqlQuery, (err, result) => {
        if (!err) {
            res.send(`Deleted user ${req.params.username}`)
        }
        else
            console.log(err.message);
    })
    client.end
})

module.exports = router