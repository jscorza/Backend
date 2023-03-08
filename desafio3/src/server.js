import express from "express"
import ProductsManager from "./productManager.js"
import http from "http"


const path = "./files/productos.json"

const manager = new ProductsManager(path)
const app = express()

app.get('/products',async( pet , res) => {
    const products = await manager.getProducts()
    
    if(pet.query["limit"]){
        res.json(products.slice(0,pet.query["limit"]))
        

    }else{
        
        res.json(products)
    }
    

})
app.get('/products/:pid', async (pet, res) => {
    const id = pet.params.pid
    const producto = await manager.getProductById(id)
    if (producto === undefined) {
        res.json({ error: "El producto no fue encontrado" })
    } else {
        res.json(producto)
    }
})

const server = app.listen(8080)

