import mongoose from 'mongoose';

const feedbackFormSchema = mongoose.Schema({
    feedback:{
        type: String,
        required: true
    },
    teacher:{
        type: String,
        required: true
    },
    senderClass:{
        type: Number,
        required: true
    },
    ghostId:{
        type: String,
        required: true
    }
})

const FeedbackModel = mongoose.model('feedbackForm', feedbackFormSchema);
export default FeedbackModel;