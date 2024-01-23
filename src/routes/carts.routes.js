import { Router } from "express";
import CartManager from "../daos/managers/cartManager.js";

const router = Router();

const manager = new CartManager();

router.get('/', async(req, res) => {
    try {
        const carts = await manager.getAll();
        if(carts != null){
            if(carts.length > 0){
                res.send({
                    status: "Success",
                    message: carts
                })
            }else{
                res.send({
                    status: "Success",
                    message: "No existen carritos en la BD"
                })
            }
        }else{
            res.status(400).send({
                status: "Error",
                message: 'Error al consultar la BD'
            })
        }
    } catch (error) {
        res.status(400).send({
            status: 'Error',
            message: error.message
        })
    }
})

router.get('/:cartId', async(req, res) => {
    try {
        const cartId = req.params.cartId;
        const result = await manager.getById(cartId);
        if(result != null){
            if(typeof result === 'string'){
                res.status(404).send({
                    status: 'Error',
                    message: result
                })
            }else{
                res.send({
                    status: "Success",
                    message: result
                })
            }
        }else{
            res.status(404).send({
                status: 'Error',
                message: 'Error al consultar la BD'
            })
        }
    } catch (error) {
        res.status(400).send({
            status: 'Error',
            message: error.message
        })
    }
})

router.post('/', async(req, res) => {
    try {
        const cart = await manager.add();
        if(cart){
            res.send({
                status: "Success",
                message: cart
            })
        }else{
            res.status(400).send({
                status: "Error",
                message: 'Error al crear el carrito'
            })
        }
    } catch (error) {
        res.status(400).send({
            status: 'Error',
            message: error.message
        })
    }
})

router.post('/:cartId/products/:productId', async(req, res) => {
    try {
        const cartId = req.params.cartId;
        const productId = req.params.productId;
        const quantity = req.body ? req.body.quantity : 1;
        const result = await manager.addProductToCart(cartId,productId,quantity)
        if(result != null){
            if(typeof result === 'string'){
                res.status(400).send({
                    status: 'Error',
                    message: result
                })
            }else{
                res.send({
                    status: "Success",
                    message: result
                })
            }
        }else{
            res.status(400).send({
                status: "Error",
                message: 'Error al agregar el producto en el carrito'
            })
        }
    } catch (error) {
        res.status(400).send({
            status: 'Error',
            message: error.message
        })
    }
})

router.put('/:cartId', async(req, res) => {
    try {
        const cartId = req.params.cartId;
        let productsList = [];
        if(req.body){
            productsList = req.body.products;
        }
        const result = await manager.updateProductList(cartId, productsList);
        if(result != null){
            if(typeof result === 'string'){
                res.status(400).send({
                    status: 'Error',
                    message: result
                })
            }else{
                res.send({
                    status: "Success",
                    message: result
                })
            }
        }else{
            res.status(400).send({
                status: "Error",
                message: 'Error al actualizar los productos del carrito'
            })
        }
    } catch (error) {
        res.status(400).send({
            status: 'Error',
            message: error.message
        })
    }
})

router.put('/:cartId/products/:productId', async(req, res) => {
    try {
        const cartId = req.params.cartId;
        const productId = req.params.productId;
        let quantity = 1;
        if(req.body){
            quantity = req.body.quantity;
        }
        const result = await manager.updateProductQty(cartId, productId, quantity);
        if(result != null){
            if(typeof result === 'string'){
                res.status(400).send({
                    status: 'Error',
                    message: result
                })
            }else{
                res.send({
                    status: "Success",
                    message: result
                })
            }
        }else{
            res.status(400).send({
                status: "Error",
                message: 'Error al actualizar la cantidad del producto en el carrito'
            })
        }
    } catch (error) {
        res.status(400).send({
            status: 'Error',
            message: error.message
        })
    }
})

router.delete('/:cartId', async(req, res) => {
    try {
        const cartId = req.params.cartId;
        const result = await manager.deleteProductsList(cartId);
        if(result != null){
            if(typeof result === 'string'){
                res.status(400).send({
                    status: 'Error',
                    message: result
                })
            }else{
                res.send({
                    status: "Success",
                    message: result
                })
            }
        }else{
            res.status(400).send({
                status: "Error",
                message: 'Error al eliminar los productos del carrito'
            })
        }
    } catch (error) {
        res.status(400).send({
            status: 'Error',
            message: error.message
        })
    }
})

router.delete('/:cartId/products/:productId', async(req, res) => {
    try {
        const cartId = req.params.cartId;
        const productId = req.params.productId;
        const result = await manager.deleteProduct(cartId, productId);
        if(result != null){
            if(typeof result === 'string'){
                res.status(400).send({
                    status: 'Error',
                    message: result
                })
            }else{
                res.send({
                    status: "Success",
                    message: result
                })
            }
        }else{
            res.status(400).send({
                status: "Error",
                message: 'Error al eliminar el producto del carrito'
            })
        }
    } catch (error) {
        res.status(400).send({
            status: 'Error',
            message: error.message
        })
    }
})

export default router;
