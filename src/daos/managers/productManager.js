import productsModel from "../models/products.model.js";

// cramos una subclase q se extiende de la principal
export default class ProductManager {
  
    getAll = async(query,options) => {
        try {
            const products = await productsModel.paginate( { ...query }, { ...options } );
            if(!products)
                return 'No se encontraron productos';
            return products;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    getById = async(id) => {
        try {
            const product = await productsModel.findOne( { _id: id } ).lean();
            if(!product)
                return `No existe un producto con id ${id}`;
            return product;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    add = async(item) => {
        try {
            const { title, description, price, thumbnail, stock} = item;
            if(!title || !description || !price || !thumbnail || !stock)
                return 'No se han provisto todos los datos necesarios';
            const product = await productsModel.create( item );
            if(!product)
                return 'No se pudo agregar el producto.'
            return product;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    update = async(id, item) => {
        try {
            if(item != null){
                const result = await productsModel.updateOne( { _id: id }, { $set: item } );
                if(result.modifiedCount > 0){
                    return await productsModel.findOne( { _id: id } ).lean();
                }else{
                    return 'No se pudo actualizar el producto';
                }
            }else{
                return 'No se a provisto ningún dato para actualizar';
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    delete = async (id) => {
        try {
            const result = await productsModel.deleteOne( { _id: id } );
            if(result.deletedCount > 0){
                return await productsModel.find().lean();
            }else{
                return 'No se pudo eliminar el producto';
            }
        } catch (error) {
            console.log(error);
            return null;
        }
        
    }
}
