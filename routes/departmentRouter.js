const Router=require('express')
const departmentController = require('../controllers/departmentController')
const authMiddleware = require('../middleware/authMiddleware')
const router=Router()
router.get("/",departmentController.getAll)
router.post("/",authMiddleware('admin'),departmentController.create)
router.patch("/:id",authMiddleware("admin",departmentController.update))
router.delete("/id",authMiddleware("admin"),departmentController.delete)

module.exports=router