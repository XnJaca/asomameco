import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { authRouter } from './routes/authRoutes';
import { userRouter } from './routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
