import { Router } from "express";
import { getRoles } from "../controller/roleController";
import { authenticateToken } from "../middleware/authMiddleware";


const router = Router();


router.get('/', authenticateToken, getRoles);

export const roleRouter = router;