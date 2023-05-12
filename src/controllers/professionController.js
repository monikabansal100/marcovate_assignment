const professionModel = require("../models/professionModel")



const createProfession = async function(req,res){
    try{
        let data= req.body
     

        let savedData = await professionModel.create(data)
        return res.status(201).send({ status: true, message: "profession created successfully",data: savedData})

    }

    catch(error){
        res.status(500).send({msg: error.message})

    }

}


module.exports = { createProfession}