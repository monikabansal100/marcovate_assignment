const skillsModel = require("../models/skillsModel")


const createSkills = async function(req,res){
    try{
        let data= req.body
     

        let savedData = await skillsModel.create(data)
        return res.status(201).send({ status: true, message: "Skills created successfully",data: savedData})

    }

    catch(error){
        res.status(500).send({msg: error.message})

    }

}


module.exports = { createSkills}