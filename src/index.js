import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = 4000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to database');
}).catch((error) => {
    console.error('Database connection error:', error);
});