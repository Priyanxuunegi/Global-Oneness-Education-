import FeedbackModel from "../Models/feedbackForm.js";

export const addFeedback = async (req, res) => {
    const { feedback, teacher, senderClass ,ghostId } = req.body;
    try {
        const newFeedback = new FeedbackModel({ feedback, teacher ,senderClass,ghostId});
        const savedFeedback = await newFeedback.save();
        res.status(200).json("Feedback Submitted Successfully");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}