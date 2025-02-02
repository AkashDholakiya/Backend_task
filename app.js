import express from 'express';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import connect from './database/connect.js';
import faqRoute from './routes/faqRoute.js';
import adminRoutes from "./routes/adminRoute.js";
import { fileURLToPath } from 'url';

dotenv.config()
 
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(adminRoutes);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 


app.use("/api/v1/faqs", faqRoute);

app.get('/', (req, res) => {
    res.send('Welcome to the FAQ API');
});
 
app.listen(3000, () => {
    connect();
    console.log('Server is running on port 3000');
});

export default app;