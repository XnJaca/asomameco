import { Router } from 'express';
import { createNewEvent, deleteExistingEvent, getEvent, getEvents, updateExistingEvent } from '../controller/eventController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateToken, getEvents);
router.get('/:id', authenticateToken, getEvent);
router.post('/', authenticateToken, createNewEvent);
router.put('/:id', authenticateToken, updateExistingEvent);
router.delete('/:id', authenticateToken, deleteExistingEvent);

export const eventRouter = router;
