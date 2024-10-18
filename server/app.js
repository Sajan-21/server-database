const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { urlencoded } = require('body-parser');
dotenv.config();
const mongoConnect = require('../server/db/connect');
const userRouter = require('../server/routers/user-router');
const authRouter = require('../server/routers/auth-router');


app.use(express.static('../client'));
app.use(express.json());
app.use(urlencoded({extended : true}));
mongoConnect();
app.use(userRouter);
app.use(authRouter);


app.listen(process.env.PORT, () => {
    console.log(`server running at http://localhost:${process.env.PORT}`);
});