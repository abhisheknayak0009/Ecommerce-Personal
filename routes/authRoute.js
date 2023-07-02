import express from 'express'
import { registerController , loginController, testController, forgotPasswordController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
// router object
const router = express.Router()

//routing
// Register || Method POST

router.post('/register', registerController)

//Login || POST
router.post('/login', loginController)

//Login || POST
router.post('/forgot-password', forgotPasswordController)

//testroutes
router.get('/test', requireSignIn, isAdmin, testController)

//protectedroutes
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ok: true});
});

router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ok: true});
});

export default router