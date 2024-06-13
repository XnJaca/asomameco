import { Router } from 'express';
import { createUser, getUsers, updateUser } from '../controller/userController';
import { authenticateToken } from '../middleware/authMiddleware';
const router = Router();

router.get('/', authenticateToken, getUsers);
router.post('/', authenticateToken, createUser);
router.put('/:id', updateUser);

export const userRouter = router;
