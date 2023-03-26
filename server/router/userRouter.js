const express = require('express')
const client = require('../connection/connection')
const bodyParser = require('body-parser')
const authenticate = require('../verifyToken.js')

const router = express.Router()
router.use(bodyParser.json())
router.use(authenticate)

// View all tasks
router.get('/viewTasks/:username', (req, res) => {
    const username = req.params.username
    const sqlQuery = `SELECT task_id, TO_CHAR(task_time, 'HH:MI AM') as task_time, 
    TO_CHAR(task_date, 'DD-MM-YYYY') as task_date, task, status FROM tasks where username=${username}`
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

//Add task
router.post('/addTasks', (req, res) => {
    const taskData = req.body
    const sqlQuery = `INSERT INTO tasks (username, task_id, task_time, task_date, task) 
    VALUES ('${taskData.username}',  '${taskData.task_id}', '${taskData.task_time}', '${taskData.task_date}', '${taskData.task}')`
    client.query(sqlQuery, (err, result) => {
        if (!err) {
            res.send('Task added')
        }
        else {
            console.log(err.message);
        }
    })
    client.end;
})

// Edit Task
router.put('/editTask', (req, res) => {
    const taskData = req.body
    const sqlQuery = `UPDATE tasks SET task_time='${taskData.task_time}', task_date='${taskData.task_date}', task='${taskData.task}' 
    WHERE task_id = '${taskData.task_id}'`
    client.query(sqlQuery, (err, result) => {
        if (!err) {
            res.send('Task Updated')
        }
        else {
            console.log(err.message);
        }
    })
    client.end;
})

// Edit Task status
router.put('/editStatus', (req, res) => {
    const taskData = req.body
    const sqlQuery = `UPDATE tasks SET status='${taskData.status}' WHERE task_id = '${taskData.task_id}'`
    client.query(sqlQuery, (err, result) => {
        if (!err) {
            res.send('Status Updated')
        }
        else {
            console.log(err.message);
        }
    })
    client.end;
})

// Delete Task
router.delete('/delete/:task_id', (req, res) => {
    const sqlQuery = `DELETE FROM tasks WHERE task_id='${req.params.task_id}'`
    client.query(sqlQuery, (err, result) => {
        if (!err) {
            res.send(`Deleted task ${req.params.task_id}`)
        }
        else
            console.log(err.message);
    })
    client.end
})


module.exports = router