// estan definidos los recursos de la base de datos
import { Schema, model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  stock: { type: Number, required: true },
});

productSchema.plugin(mongoosePaginate)

const productsModel = model("products", productSchema);
export default productsModel