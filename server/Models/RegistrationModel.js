import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema({
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
    photo: String
   
},
    { timestamps: true }
);

const RegistrationModel = mongoose.model("Registration", RegistrationSchema);

export default RegistrationModel;