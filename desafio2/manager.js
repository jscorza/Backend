import fs from "fs"
import { promises as ff } from 'fs';
import { promisify } from 'util';
const readFile = promisify(ff.readFile);
const writeFile = promisify(ff.writeFile);



class ProductsManager {
    
    getProducts = async () => {
            if (fs.existsSync(path)) {
                const data = await fs.promises.readFile(path, 'utf-8');
                const products = JSON.parse(data);
                return products;
            }
            else{
                return [] //No hay productos porque no hay archivo, pero eso no nos limita a enviar un arreglo vacío.
            }
        }

    async checkProductByCode(code){
        let products = await this.getProducts();
        let prod = products.find(prod => prod.code === code)
        if(prod === undefined){
            return false
        }else{
            return true
            }
        }

    addProduct = async (product) => {
        if(await this.checkProductByCode(product.code)){
            console.log("ERR, CODE ALREADY USED")
        }else{
            const prod =  await this.getProducts();
        if(prod.length===0){
            product.id=1;
        }else{
            product.id = prod[prod.length-1].id+1;
        }
        prod.push(product);
        await fs.promises.writeFile(path,JSON.stringify(prod,null,'\t'));
        }  
    }

    getProductById = async (id) => {
        let products = await this.getProducts();
        let prod = products.find(prod => prod.id === id)
        if(prod === undefined){
            console.log("Not Found")
        }else{
            return prod
        }
    }





    async actualizarProducto(id, atributo, nuevoValor) {
        try {
        let products = [];
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, 'utf-8');
            products = JSON.parse(data);
        }
    
        const producto = products.find(producto => producto.id === id);
    
        if (!producto) {
            throw new Error('No se encontró el producto');
        }
    
        producto[atributo] = nuevoValor;


        console.log(`El producto con id ${id} ha sido actualizado`);
        await writeFile(path, JSON.stringify(products), 'utf8');
        } catch (error) {
        console.error(error);
        console.log( 'Ha ocurrido un error al actualizar el producto');
        }
    }

    async deleteProduct(id) {
        try {
        let products = [];
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, 'utf-8');
            products = JSON.parse(data);
        }
    
        const index = products.findIndex(producto => producto.id === id);
    
        if (index === -1) {
            throw new Error('No se encontró el producto');
        }
    
        products.splice(index, 1);
    
        console.log(`El producto con id ${id} ha sido eliminado`);
        await writeFile(path, JSON.stringify(products), 'utf8');
        } catch (error) {
        console.error(error);
        console.log('Ha ocurrido un error al eliminar el producto');
        }
    }
    

}




class Product{
    constructor(title,description,price,thumbnail,code,stock){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock 
        this.id = 0
        
        
    }
}

const path = "noexiste.txt"
const manager = new ProductsManager();


// const env = async() =>{
//     let primeraConsultaProductos = await manager.getProducts();

//     console.log(primeraConsultaProductos);
//     let prod = new Product( "otrooo","Este es un producto prueba",200,"Sin imagen","abc124",25)
    
    

//     await manager.addProduct(prod);
//     console.log( await manager.getProducts())
//     console.log("producto id 1 :"    )
//     console.log( await manager.getProductById(1))
//     await manager.actualizarProducto(2,"title","el segundooooooo")
//     await manager.deleteProduct(1)
//     console.log("los productos final: ")
//     console.log( await manager.getProducts())


// }

// env();