const express = require("express")
const  router = express.Router()
const userController = require("../controllers/userController")
const professionController = require("../controllers/professionController")
const skillsController = require("../controllers/skillsController")
const skillsLevelController = require("../controllers/skillsLevelController")
const { Authentication, Authorization } = require("../middlewares/auth")


//===================user_routes===============================//

router.post("/register", userController.createUser)
router.post("/profession", professionController.createProfession)
router.post("/skills", skillsController.createSkills)
router.post("/skills_level", skillsLevelController.createskillsLevel)
router.post("/login", userController.loginUser)
router.get("/getUser", userController.getUser)
router.put("/update/:userId",Authentication, Authorization, userController.updateUser)



module.exports = router



