import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import authRouter from './routes/auth.routes';
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.json());

// RUTAS
app.use('/api/auth', authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Servidor ejecutando exitosamente");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});