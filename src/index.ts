import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import authRouter from './routes/auth.routes';
// import citaRouter from './routes/cita.routes';
// import historiaRouter from './routes/historia.routes';
// import ordenRouter from './routes/orden.routes';
// import autorizacionRouter from './routes/autorizacion.routes';
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// MIDDLEWARE
app.use(express.json());

// RUTAS
app.use('/api/auth', authRouter);
// app.use('/api/cita', citaRouter);
// app.use('/api/historia', historiaRouter);
// app.use('/api/orden', ordenRouter);
// app.use('/api/autorizacion', autorizacionRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Servidor ejecutando exitosamente");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});