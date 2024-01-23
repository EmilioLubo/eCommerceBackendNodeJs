import { Router } from "express";
import ProductManager from "../daos/managers/productManager.js";
import productsModel from "../daos/model/products.model.js";
import CartManager from "../daos/managers/cartManager.js";

const router = Router();

const productManager = new ProductManager();
const cartManager = new CartManager();

router.get('/products', async(req,res) => {
    let products;
    let query= {};
    try{
        const { limit = 10, page = 1, sort = 'desc', stock = -1} = req.query;
        if(stock >= 0){
            query.stock = stock;
        }
        const sortValue = { price: sort === 'desc' ? -1 : 1 };
        const options = { limit, page, sort: sortValue };
        const result = await productManager.getAll(query, options);
        if(result != null && typeof result != 'string' && page <= result.totalPages){
            products = result;
        } else{
            products.docs = [];
        }
        res.render('products', products)
    }catch(error){
        res.status(404).send({
            status: 'Error',
            message: 'Error al cargar la página'
        })
    }
})

router.get('/cart/:id', async(req,res) => {
    const id = req.params.id;
    try {
        const cart = await cartManager.getById(id);
        if(cart != null && typeof cart != 'string'){
            res.render('cart', cart)
        }else{
            res.status(404).send({
                status: 'Error',
                message: 'Error al cargar la página'
            })
        }
    } catch (error) {
        res.status(404).send({
            status: 'Error',
            message: 'Error al cargar la página'
        })
    }
})

export default router;
