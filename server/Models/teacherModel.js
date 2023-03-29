import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    courses: {
        type: [],
        required: true,
    },
    classes: {
        type: [],
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    teacherId: {
        type: Number,
        required: true,
    },
    joiningDate: {
        type: Date,  //'2002-12-09'
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    photo: String,
    usertype:{
        type: String,
        default: "teacher"
    }
},
    { timestamps: true }
);

const TeacherModel = mongoose.model("Teacher", teacherSchema);
export default TeacherModel;