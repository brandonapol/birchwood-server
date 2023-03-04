import { Express, Router } from 'express';
const router = Router();
import  funcs from '../controllers/userController'
import protect from '../middleware/authMiddleware';

router.post('/', funcs.registerUser)
router.post('/login', funcs.loginUser)
router.get('/getme', protect, funcs.getMe)

export default router