


import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    Class: {
        type: String,
        required: true,
    },
    Course: {
        type: String,
        required: true,
    },
    // Lectures: {
    //     type: String,
    //     required: true,
    // },
    // Faculty: {
    //     type: String,
    //     required: true,
    // },
    CourseId :{
        type: String,
        required: true,
        
    },
   
},{timestamps: true}
);

const CoursesModel = mongoose.model("Courses", courseSchema);
export default CoursesModel;