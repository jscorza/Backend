import fs from "fs"
import { promises as ff } from 'fs';
import { promisify } from 'util';
const readFile = promisify(ff.readFile);
const writeFile = promisify(ff.writeFile);



export default class ProductsManager {
    constructor(path){
        
        this.path=path
    }
    getProducts = async () => {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
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
        await fs.promises.writeFile(this.path,JSON.stringify(prod,null,'\t'));
        }  
    }

    getProductById = async (id) => {
        let products = await this.getProducts();
        let prod = products.find(prod => prod.id == id)
        if(prod === undefined){
            console.log("Not Found")
        }else{
            return prod
        }
    }





    async actualizarProducto(id, atributo, nuevoValor) {
        try {
        let products = [];
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            products = JSON.parse(data);
        }
    
        const producto = products.find(producto => producto.id === id);
    
        if (!producto) {
            throw new Error('No se encontró el producto');
        }
    
        producto[atributo] = nuevoValor;


        console.log(`El producto con id ${id} ha sido actualizado`);
        await writeFile(this.path, JSON.stringify(products), 'utf8');
        } catch (error) {
        console.error(error);
        console.log( 'Ha ocurrido un error al actualizar el producto');
        }
    }

    async deleteProduct(id) {
        try {
        let products = [];
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            products = JSON.parse(data);
        }
    
        const index = products.findIndex(producto => producto.id === id);
    
        if (index === -1) {
            throw new Error('No se encontró el producto');
        }
    
        products.splice(index, 1);
    
        console.log(`El producto con id ${id} ha sido eliminado`);
        await writeFile(this.path, JSON.stringify(products), 'utf8');
        } catch (error) {
        console.error(error);
        console.log('Ha ocurrido un error al eliminar el producto');
        }
    }
    

}