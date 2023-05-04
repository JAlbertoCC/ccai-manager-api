import express from "express";
import morgan from "morgan";
import cors from "cors";

// Routes
import usereRoutes from "./routes/users.routes";
import authRoutes from "./routes/auth.router";
import { verifyToken } from "./middleware/validate-token";

const app = express();

// settings
app.set('port', process.env.PORT || 3001);

// Middlewares
/*Funciones intermedias entre una petición y una respuesta*/
app.use(morgan("dev"));
app.use(express.json());
app.use(cors())

//Routes
app.use(usereRoutes);
app.use(authRoutes);

export default app;
