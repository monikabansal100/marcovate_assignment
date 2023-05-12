const userModel = require("../models/userModel")
const {isValid,isVAlidRequestBody,isValidPassword, nameRegex,phoneRegex,emailRegex} = require("../validators/validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const createUser = async function(req,res){
    try{

        const data = req.body

        const { userName, phone, email, password, skills, budget, profession, skils_level} = data
       
        if (!isVAlidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Please give the Input to Create the User" })
        }

        if (!isValid(userName)) {
            return res.status(400).send({ status: false, message: 'userName is mandatory and should have non empty String' })
        }

        if (!nameRegex.test(userName)) {
            return res.status(400).send({ status: false, message: "please provide Valid userName" })
        }

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: 'Email is required' })
        }

        if (!emailRegex.test(email)) {
            return res.status(400).send({ status: false, message: "please provide Valid Email" })
        }

        const isEmailAlreadyUsed = await userModel.findOne({ email })
        if (isEmailAlreadyUsed) {
            return res.status(400).send({ status: false, message: "Email Already Registered" })
        }

        if (!isValid(phone)) {
            return res.status(400).send({ status: false, message: 'Phone Number is required' })
        }

        if (!phoneRegex.test(phone)) {
            return res.status(400).send({ status: false, message: "please provide Valid phone Number" })
        }

        const isPhoneAlreadyUsed = await userModel.findOne({phone})
        if (isPhoneAlreadyUsed) {
            return res.status(400).send({ status: false, message: "Phone Number Already Registered" })
        }


        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: 'Password is required' })
        }

        if(!isValidPassword(password)) { 
            return res.status(400).send({status: false, message: 'please provide Valid password with 1st letter should be Capital letter and contains spcial character with Min length 8 and Max length 15' })
        }

        let dataHash = await bcrypt.hash(data.password, 10)
        if(!dataHash) return res.status(400).send({status:false,message:"Cant hash password"})
        data.password = dataHash


        if (!isValid(profession)) {
            return res.status(400).send({ status: false, message: 'profession is required or invalid' })
        }


        if (!["engineering", "desiners", "devops", "product managers"].includes(profession)) {
            return res.status(400).send({status:false,message:"pls send correct ,profession only [engineering, desiners, devops, product managers] allowed"})
        }

        if(!nameRegex.test(skils_level))
        return res.status(400).send({status:false,message:"skils_level is required or invalid"})
            

        let savedData = await userModel.create(data)
        return res.status(201).send({ status: true, message: "User created successfully",data: savedData})

    }

    catch(error){
        res.status(500).send({msg: error.message})

    }

}


//-----------------------update user-----------------------


const updateUser = async function (req, res) {
    try {
  
      let userId = req.params.userId;
      let data = req.body
  
      const { userName, phone, email, password, skills, budget, profession, skils_level} = data
       
        if (!isVAlidRequestBody(data)) {
            return res.status(400).send({ status: false, message: "Please give the Input to Create the User" })
        }
  
   
  
      if (userName) {
          if (!nameRegex.test(userName)) {
            return res.status(400).send({ status: false, message: "please provide Valid userName" })
        } }
  
      if (email) {
        if (!emailRegex.test(email)) {
            return res.status(400).send({ status: false, message: "please provide Valid Email" })
        }

        const isEmailAlreadyUsed = await userModel.findOne({ email })
        if (isEmailAlreadyUsed) {
            return res.status(400).send({ status: false, message: "Email Already Registered" })
        }
      }
  
      if (phone) {
        if (!phoneRegex.test(phone)) {
            return res.status(400).send({ status: false, message: "please provide Valid phone Number" })
        }

        const isPhoneAlreadyUsed = await userModel.findOne({phone})
        if (isPhoneAlreadyUsed) {
            return res.status(400).send({ status: false, message: "Phone Number Already Registered" })
        }
      }
  
      if (password) {
  
        if(!isValidPassword(password)) { 
            return res.status(400).send({status: false, message: 'please provide Valid password with 1st letter should be Capital letter and contains spcial character with Min length 8 and Max length 15' })
        }

        let dataHash = await bcrypt.hash(data.password, 10)
        if(!dataHash) return res.status(400).send({status:false,message:"Cant hash password"})
        data.password = dataHash
      }

      if (!["engineering", "desiners", "devops", "product managers"].includes(profession)) {
        return res.status(400).send({status:false,message:"pls send correct ,profession only [engineering, desiners, devops, product managers] allowed"})
    }


      const updateUser = await userModel.findOneAndUpdate({ _id: userId }, { $set: { userName, phone, email, password, skills, budget, profession, skils_level} }, { new: true })
  
      return res.status(200).send({ staus: true, message: "Success", data: updateUser })
  
    } catch (err) {
      res.status(500).send({ status: false, message: err.message });
    }
  }



//-----------------------get user--------------------------

const getUser = async function(req,res){
    try{

        let data= req.query
        let { userId, userName, phone, email, password, skills, budget, profession, skils_level} = data
    
        const userData = await userModel.find(data)
        if(!userData)
        return res.status(404).send({status:false,message:"User not found"})

        res.status(200).send({status:true,message:"Success",data:userData})

    }
    catch(err){
        res.status(500).send({msg:err.message})
    }

}


//--------------------------login user--------------------

const loginUser = async function (req, res) {
    try {
        let loginData = req.body
        let { email, password } = loginData
 
        let user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ status: false, message: "Email Not found" });
        }
    
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).send({ status: false, message: "wrong password" })
        }

        //token credentials
        let token = jwt.sign(
            { userId: user._id},"marcovate" // => secret key
             );

        return res.status(200).send({ status: true, message: "Success", data: { userId: user._id, token: token } })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports ={ createUser,updateUser,loginUser,getUser}