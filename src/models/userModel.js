const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }, 
    profession: {
        type: [String],
        required: true,
        trim: true,
        enum: ["engineering", "desiners", "devops", "product managers"]
    },
    budget:{
        type: String,
        required: true,
        trim: true,
    },
    skills:{
        type: [String],
        required: true,
        trim: true,
    },
    skils_level: {
        type: String,
        required: true,
        trim: true
    }

}, { timestamps: true })


module.exports = mongoose.model("user", userSchema)