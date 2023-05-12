const mongoose = require("mongoose")

const skillsLevelSchema = new mongoose.Schema({
  
    skils_level: {
        type: String,
        required: true,
        enum: ["entry level", "mid level", "senior", "manager"],
        trim: true
    }
   

}, { timestamps: true })


module.exports = mongoose.model("skillsLevel", skillsLevelSchema)