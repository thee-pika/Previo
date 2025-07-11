import mongoose from "mongoose";

const paperSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    course: {
        type: [String],
        required: true,
        enum: ["BCA", "BBA", "B.Sc", "B.Com", "BCZ", "B.A"]
    },
    semester: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5, 6]
    },
    subject: {
        type: String,
        required: true,
        enum: ["Maths", "Physics", "Chemistry", "Biology", "English", "Hindi", "Social Science", "Computer Science", "Accountancy", "Business Studies", "Economics", "History", "Geography", "Political Science", "Philosophy", "Psychology", "Sociology", "English Literature", "French", "Arabic", "Telugu", "Hindi", "English", "Maths", "Physics", "Chemistry", "Biology", "English", "Hindi", "Computer Science", "Accountancy", "Business Studies", "Economics", "History", "Medical Physics","Geography", "Political Science", "Arabic", "Telugu", "Urdu"]
    },
    year: {
        type: Number,
        required: true,
    },
    fileUrl: {
        type: String,
    },
    fileId: {
        type: String,
    },
});

const Paper = mongoose.model('Paper', paperSchema);

export default Paper;
