import express from 'express'
import { registerController , loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from '../controllers/authController.js'
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

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router