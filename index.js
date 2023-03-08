const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;

const usersRouter = require('./src/routes/users');
const authRouter = require('./src/routes/auth');

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());

app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`));
