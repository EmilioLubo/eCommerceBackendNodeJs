import { Router } from "express";
import ProductManager from "../daos/managers/productManager.js";

const router = Router();

const manager = new ProductManager();

router.get('/', async(req, res) => {
  try {
    let query = {};
    if(req.query){
        const { limit = 10, page = 1, sort = 'desc', stock = -1} = req.query;
        if(stock >= 0){
            query.stock = stock;
        }
        const sortValue = { price: sort === 'desc' ? -1 : 1 };
        const options = { limit, page, sort: sortValue }
        const result = await manager.getAll(query, options);
        if(result != null){
            if(typeof result === 'string'){
                res.status(400).send({
                    status: 'Error',
                    message: result
                })
            }
            if(page > result.totalPages){
                res.status(400).send({
                    status: 'Error',
                    message: `No existe la página ${page} en los registros`
                })
            }else if(result.docs.length > 0){
                res.send({
                    status: 'Success',
                    message: result
                })
            }else{
                res.send({
                    status: "Success",
                    message: "No existen productos en la BD"
                })
            }
        }else{
            res.status(400).send({
                status: 'Error',
                message: 'Error al consultar la BD'
            })
        }
    }
  } catch (error) {
    res.status(400).send({
        status: 'Error',
        message: error.message
    })
  }  
})

router.get('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const result = await manager.getById(id);
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
        let product;
        if(req.body){
            product = req.body;
        }else{
            product = {};
        }
        const result = await manager.add(product)
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
                message: 'Error al agregar el producto'
            })
        }
    } catch (error) {
        res.status(400).send({
            status: 'Error',
            message: error.message
        })
    }  
  })

  router.put('/:id', async(req, res) => {
    try {
        let product;
        const id = req.params.id;
        if(req.body){
            product = req.body;
        }
        const result = await manager.update(id, product);
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
                message: 'Error al actualizar el producto'
            })
        }
    } catch (error) {
        res.status(400).send({
            status: 'Error',
            message: error.message
        })
    }  
  })

  router.delete('/:id', async(req, res) => {
    try {
      const id = req.params.id;
      const result = await manager.delete(id);
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
            message: 'Error al eliminar el producto'
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
