import mongoose, { Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: {
    type: [
      {
        product : {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true
        },
        quantity : {
          type: Number,
          required: true,
          default: 1
        }
      }
    ]
  }
});

cartSchema.pre("find", function(){
  this.populate("products.product");
})

cartSchema.pre("findOne", function(){
  this.populate("products.product");
})

const cartsModel = model("carts", cartSchema);
export default cartsModel;