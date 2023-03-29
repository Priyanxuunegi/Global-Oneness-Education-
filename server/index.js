import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js';
import cors from "cors";
import AdminRoute from './Routes/AdminRoute.js';
import Registstion from './Routes/RegistrationRoutes.js';
import StudentRoute from './Routes/StudentRoutes.js';
import TeacherRoute from './Routes/TeacherRoutes.js';

const app = express();
const port = 5000;
dotenv.config();

//middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions ={
    origin:'https://globaloneness.netlify.app', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// heyy
app.get('/', (req, res) => res.send('Hello World! from server'));

mongoose.set("strictQuery", false);

mongoose
    .connect(process.env.MONGO_DB,
        { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => app.listen(process.env.PORT || port, () => {
        console.log(`Server is running on ${process.env.PORT || port}`);
        console.log("mongo connect ..")})).
    catch((error) => console.log(error.message));

//usage of routes
app.use('/auth', AuthRoute);
app.use('/admin', AdminRoute);
app.use('/registration', Registstion);
app.use('/student' , StudentRoute);
app.use('/teacher' , TeacherRoute);


