import ProductsManager from "./productManager.js";
import Product from "./product.js";



const manager = new ProductsManager();



const env = async() =>{
    let ConsultaProductos = await manager.getProducts();

    console.log(ConsultaProductos);
    // let prod = new Product( "tercero","kn;ldsndsncdsk;cn",111200,"Sin imagen","c",2235)
    // await manager.addProduct(prod);
    //await manager.actualizarProducto(3,"title","terceroUpdated")
    // await manager.actualizarProducto(2,"stock",21)
    // await manager.deleteProduct(2)
}

env();