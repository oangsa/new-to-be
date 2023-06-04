import { Schema, model, models } from "mongoose";

const usetageSchema = new Schema({
    currentData: {
        total: Number,
        Day: Number,
        Month: Number
    },
    oldData: {
        Day: Number,
        Month: Number
    }
})

const Usetage = models.data || model("data", usetageSchema)

export default Usetage;