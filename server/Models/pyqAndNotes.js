import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
    pdfid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    board: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    classes: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    teacherId: {
        type: Number,
        required: true,}
});

const PyqAndNotes = mongoose.model("PyqAndNotes", NotesSchema);
export default PyqAndNotes;