import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
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
    class: {
        type: Number,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    guardianNumber: {
        type: Number,
        required: true,
    },
    school: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    joiningDate: {
        type: Date,  //'2002-12-09'
        required: true,
    },
    courses: {
        type: [],
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    studentId: {
        type: Number,
        required: true,
    },
    photo: String,
    usertype:{
        type: String,
        default: "student"
    } 
},
    { timestamps: true }
);

const StudentModel = mongoose.model("Student", studentSchema);

export default StudentModel;