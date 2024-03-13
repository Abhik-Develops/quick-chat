import express from 'express';
import UserController from './../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';
import { registerValidator, loginValidator, sendPasswordResetEmailValidator, resetPasswordValidator, chnagePasswordValidator } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.get('/', protect, UserController.allUsers)
router.post('/', registerValidator, UserController.registerUser);
router.get('/verify-email/:id/:token', UserController.userEmailVerify);
router.post('/login', loginValidator, UserController.authUser);
router.post('/send-password-reset-email', sendPasswordResetEmailValidator, UserController.sendPasswordResetEmail);
router.post('/reset-password/:id/:token', resetPasswordValidator, UserController.userPasswordReset);
router.put('/update', protect, UserController.userProfileUpdate);
router.post('/change-password', protect, chnagePasswordValidator, UserController.userPasswordChange);

export default router;