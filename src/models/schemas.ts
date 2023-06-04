import { Schema, model, models } from "mongoose";

const studentSchema: Schema<student> = new Schema({
    studentData: {
        name: String,
        surname: String,
        studentId: Number,
        yearClass: Number,
        class: Number,
        reason: String,
        total: Number,
        oldMonth: Number,
        timestamps: Date,
    },
    loginData: {
        username: String,
        password: String
    }
})

const Note = models.rs || model("rs", studentSchema)

export default Note;