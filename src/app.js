// levantamos el servidor
import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { engine } from 'express-handlebars'
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

import __dirname from "./utils.js";

import cartsRouter from './routes/carts.routes.js';
import productsRouter from './routes/products.routes.js';
import viewsRouter from './routes/views.routes.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT;

const MONGO = process.env.DB_CONNECTION;

mongoose.set('strictQuery', false);
const connection = mongoose.connect(MONGO);

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(`${__dirname}/public`));

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`)
});

app.engine("handlebars", engine({
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);