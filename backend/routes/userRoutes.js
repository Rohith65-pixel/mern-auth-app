import express from 'express'
import {
  authUser,
  logoutUser,
  registerUser,
  getUserProfile,
  updateUserProfile
} from '../controllers/userController.js'
import { protect } from '../MiddleWare/authMiddleware.js';

const router = express.Router();

router.post('/',registerUser);
router.post('/auth',authUser);
router.post('/logout',logoutUser);

router.get('/profile',protect,getUserProfile);
router.put('/profile',protect,updateUserProfile);

export default router;

/*  post /api/users         - Register a user
    post /api/users/auth    - Authenticate a user and get a Token
    post /api/users/logout  - Logout user and clear cookie
    get  /api/users/profile - get user profile
    put  /api/users/profile - update profile
*/
