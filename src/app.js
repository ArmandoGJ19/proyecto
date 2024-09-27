import express from "express";
import citasRoutes from "./routes/citas.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

import {createRoles} from "./libs/initialSetup.js";
import cors from "cors";

const app = express();
// Configuración de CORS
const corsOptions = {
    origin: '*', // Permite todas las orígenes
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
    allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization', 'x-access-token']
};
app.use(cors(corsOptions));
createRoles();
app.use(express.json());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
app.use('/api/citas',citasRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)


export default app;