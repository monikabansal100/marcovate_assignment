const skillsLevelModel = require("../models/skillsLevelModel")



const createskillsLevel = async function(req,res){
    try{
        let data= req.body
     

        let savedData = await skillsLevelModel.create(data)
        return res.status(201).send({ status: true, message: "skillsLevel created successfully",data: savedData})

    }

    catch(error){
        res.status(500).send({msg: error.message})

    }

}


module.exports = { createskillsLevel}