const mongoose = require("mongoose")

const professionSchema = new mongoose.Schema({
  
    profession: {
        type: [String],
        required: true,
        trim: true,
        enum: ["engineering", "desiners", "devops", "product managers"]
    },
   

}, { timestamps: true })


module.exports = mongoose.model("profession", professionSchema)