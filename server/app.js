const express = require('express');
const cors = require('cors')

const corsOptions = {
    origin: "*"
}

const client = require('./connection/connection.js')

const adminRouter = require('./router/adminRouter');
const userRouter = require('./router/userRouter')
const loginRouter = require('./router/loginRouter')

require('dotenv').config();
const app = express();
PORT = process.env.PORT

client.connect((err) => {
    if (!err) {
        console.log('Connected to the database');
    }
});

app.use(cors(corsOptions))
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/login', loginRouter)

app.listen(PORT, () => {
    console.log(`Server listening at PORT:${PORT}`);
})