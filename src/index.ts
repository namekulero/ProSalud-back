import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import authRouter from './routes/auth.routes';
// import citaRouter from './routes/cita.routes';
// import historiaRouter from './routes/historia.routes';
// import ordenRouter from './routes/orden.routes';
// import autorizacionRouter from './routes/autorizacion.routes';

const https = require('https');
const fs = require('fs');
const opciones = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  passphrase: 'prosalud'
};

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

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

https
  .createServer(opciones, app)
  .listen(port, () => {
    console.log(`Servidor escuchando en https://localhost:${port}`);
  });