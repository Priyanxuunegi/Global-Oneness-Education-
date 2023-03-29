import PyqAndNotes from "../Models/pyqAndNotes.js";

export const addNotesandPYQ = async (req, res) => {
    try {
        const { pdfid, name, board, type, subject, classes, size,teacherId } = req.body;
        const newNotes = new PyqAndNotes({
        pdfid,
        name,
        board,
        type,
        subject,
        classes,
        size,
        teacherId

        });
        const savedNotes = await newNotes.save();
        res.status(200).json({ notes: savedNotes });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

// get notes matching to teacher id 
export const getPreviousUploadedNotes = async (req, res) => {
    try{
        const teacherId = req.params.teacherId;
        const allnotes = await PyqAndNotes.find({teacherId:teacherId});
        if(allnotes){
            res.status(200).json({allnotes:allnotes});
        }else{
            res.status(404).json({message:"No notes found"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
}

// delete notes matching to pdf id
export const deleteNotesAndPYQ = async (req, res) => {
    try{
        const pdfid = req.params.pdfid;
        const deletedNotes = await PyqAndNotes.findOneAndDelete({pdfid:pdfid});
        if(deletedNotes){
            res.status(200).json({message:"Notes Deleted"});
        }else{
            res.status(404).json({message:"No notes found"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:err.message});
    }
}