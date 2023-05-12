const mongoose = require("mongoose")

const skillsSchema = new mongoose.Schema({
  
    skils: {
        type: [String],
        required: true,
        trim: true,
        enum: ["javascript", "nodejs", "mongodb", "aws s3", "redis", "cashing", "html", "css"]
    }
   

}, { timestamps: true })


module.exports = mongoose.model("skills", skillsSchema)