import cartsModel from '../models/carts.model.js'
import productsModel from '../models/products.model.js'

export default class CartManager {

    getAll = async() => {
        try {
            const carts = await cartsModel.find();
            return carts;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    getById = async(id) => {
        try {
            const cart = await cartsModel.findOne( { _id: id } ).lean();
            if(cart != null){
                return cart;
            }else{
                return `No existe un carrito con id ${id}`;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    add = async() => {
        try {
            const cart = await cartsModel.create({});
            return cart;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    addProductToCart = async(cartId, productId, quantity = 1) => {
        try {
            const cart = await cartsModel.findOne( { _id: cartId } ).lean();
            if(!cart)
                return `No existe un carrito con el id ${cartId}`;
            const product = await productsModel.findOne( { _id: productId } ).lean();
            if(!product)
                return `No existe un producto con el id ${productId}`;
            const result = await cartsModel.updateOne( { _id: cartId }, { $push: { products: { product: productId, quantity } } } );
            if(result.modifiedCount > 0){
                return await cartsModel.findOne( {_id: cartId} ).lean(); 
            }else{
                return 'No se ha podido agregar el producto';
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    updateProductList = async(id, itemsArray) => {
        try {
            const cart = await cartsModel.findOne( { _id: id } ).lean();
            if(!cart)
                return `No existe un carrito con el id ${id}`;
            const result = await cartsModel.updateOne( { _id: id }, { $set: { products: itemsArray } } );
            if(result.modifiedCount > 0){
                return await cartsModel.findOne( {_id: id} ).lean(); 
            }else{
                return 'No se ha podido actualizar la lista de productos';
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    updateProductQty = async(cartId, productId, quantity) => {
        try {
            const cart = await cartsModel.findOne( { _id: cartId } ).lean();
            if(!cart)
                return `No existe un carrito con el id ${cartId}`;
            const product = await productsModel.findOne( { _id: productId } ).lean();
            if(!product)
                return `No existe un producto con el id ${productId}`;
            const result = await cartsModel.updateOne( { _id: cartId, 'products.product': productId }, { $set: { 'products.$.quantity': quantity } } );
            if(result.modifiedCount > 0){
                return await cartsModel.findOne( {_id: cartId} ).lean(); 
            }else{
                return 'No se ha podido actualizar la cantidad del producto';
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    deleteProduct = async (cartId, productId) => {
        try {
            const cart = await cartsModel.findOne( { _id: cartId } ).lean();
            if(!cart)
                return `No existe un carrito con el id ${cartId}`;
            const product = await productsModel.findOne( { _id: productId } ).lean();
            if(!product)
                return `No existe un producto con el id ${productId}`;
            const result = await cartsModel.updateOne( { _id: cartId }, { products: { $pull: { product: productId } } } );
            if(result.modifiedCount > 0){
                return await cartsModel.findOne( {_id: cartId} ).lean(); 
            }else{
                return 'No se ha podido eliminar el producto';
            };
        } catch (error) {
            console.log(error);
            return null;
        }
        
    }    

    deleteProductsList = async (id) => {
        try {
            const cleatList = [];
            const cart = await cartsModel.findOne( { _id: id } ).lean();
            if(!cart)
                return `No existe un carrito con el id ${id}`;
            const result = await cartsModel.updateOne( { _id: id }, { $set: { products: cleatList } } );
            if(result.modifiedCount > 0){
                return await cartsModel.findOne( {_id: id} ).lean(); 
            }else{
                return 'No se ha podido vaciar el carrito';
            };
        } catch (error) {
            console.log(error);
            return null;
        }
        
    }    

}