import NotesModel from "../Models/NotesModel.js";
import PyqAndNotes from "../Models/pyqAndNotes.js";

export const AddImportantNotes = async (req, res, next) => {
    const { studentId, ImportantNotes } = req.body;

    try {
        console.log("data to be pulled of ", studentId, ImportantNotes);
        const find = await NotesModel.findOne({ studentId: studentId });
        if (find) {
            const avail = find.ImportantNotes.includes(ImportantNotes);
            //if already marked then call is done to remove it
            if (avail) {
                await find.updateOne({ $pull: { ImportantNotes: ImportantNotes } })
                await find.save();

                const updateddata =  await NotesModel.findOne({ studentId: studentId })
                console.log("req to pull" ,updateddata);
                res.status(200).json(updateddata);

            } else {
                find.ImportantNotes.push(ImportantNotes);
                await find.save();
                res.status(200).json(find);
            }
        } else {
            const newNotes = new NotesModel({
                studentId: studentId,
                ImportantNotes: [ImportantNotes],
            });
            await newNotes.save();
            res.status(200).json(newNotes);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", err: error });

    }
}

export const AddImportantPYQ = async (req, res) => {
    try {
        const { studentId, ImportantPYQ } = req.body;
        console.log("data to be pulled of ", studentId, ImportantPYQ);
        const find = await NotesModel.findOne({ studentId: studentId });
        if (find) {
            const avail = find.ImportantPYQ.includes(ImportantPYQ);
            //if already marked then call is done to remove it
            if (avail) {
                await find.updateOne({ $pull:{ ImportantPYQ : ImportantPYQ} })
                await find.save();

                const updateddata =  await NotesModel.findOne({ studentId: studentId })
                console.log("req to pull" ,updateddata);
                await res.status(200).json(updateddata);
            } else {
                find.ImportantPYQ.push(ImportantPYQ);
                await find.save();
                res.status(200).json(find);
            }

        } else {
            const newNotes = new NotesModel({
                studentId: studentId,
                ImportantNotes: [ImportantPYQ],
            });
            await newNotes.save();
            res.status(200).json(newNotes);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

}

export const getAllImportantNotes = async (req, res) => {
    try {
        const { studentId } = req.body;
        const find = await NotesModel.findOne({ studentId: studentId });
        if (find) {
            res.status(200).json(find);
        }
        else {
            res.status(200).json(null);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const getAllImportantPYQ = async (req, res) => {
    try {

        const { studentId } = req.params;

        const find = await NotesModel.findOne({ studentId: studentId });
        if (find) {
            res.status(200).json(find);
        }
        else {
            res.status(200).json(null);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const getAllDocuments = async (req, res) => {
    const { classes } = req.params;
    try {
        const find = await PyqAndNotes.find({ classes: classes });
        if (find) {
            res.status(200).json(find);
        }
        else {
            res.status(200).json(null);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}