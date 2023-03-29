import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
    },
    adminId: {
        type: Number,
        required: true,
    },
    usertype:{
        type: String,
        default: "admin"
    } 
},{timestamps: true}
);

const AdminModel = mongoose.model("Admin", adminSchema);
export default AdminModel;