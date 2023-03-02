import express from "express"
import ProductsManager from "./productManager.js"


const manager = new ProductsManager()
const app = express()

app.get('/productos',async( pet , res) => {
    const products = await manager.getProducts()
    
    if(pet.query["limit"]){
        res.json(products.slice(0,pet.query["limit"]))
        

    }else{
        
        res.json(products)
    }
    

})
app.get('/productos/:pid',async( pet , res) => {
    const id = pet.params.pid
    const producto = await manager.getProductById(id)
    res.json(producto)
})

const server = app.listen(8080)

