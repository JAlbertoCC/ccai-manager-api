import express from "express";
import morgan from "morgan";

// Routes
import languajeRoutes from "./routes/users.routes";

const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// Middlewares
/*Funciones intermedias entre una petición y una respuesta*/
app.use(morgan("dev"));

//Routes
app.use(languajeRoutes);

export default app;
