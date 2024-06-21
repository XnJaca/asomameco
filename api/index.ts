import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { authRouter } from './routes/authRoutes';
import { eventRouter } from './routes/eventRoutes';
import { roleRouter } from './routes/roleRoutes';
import { userRouter } from './routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3100;

app.use(cors({

    // all the origins are allowed
    origin: '*',
}));

app.use(express.json());
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/role', roleRouter);
app.use('/events', eventRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
