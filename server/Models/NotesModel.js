import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
    studentId:{
        type: Number,
        required: true
    },
    ImportantNotes: {
        type: [],
        required: false,
    },
    ImportantPYQ: {
        type: [],
        required: false,
    },
});

const NotesModel = mongoose.model("Notes", NotesSchema);
export default NotesModel;