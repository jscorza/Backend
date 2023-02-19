class ProductManager{
products

constructor(){
    this.products = []
}

getProducts(){
    return this.products;
}
getProductById(id){
    let prod = this.products.find(prod => prod.id === id);
    if(prod === undefined){
        console.log("Not Found")
    }else{
        return prod
    }
}





addProduct(product){
    if(checkForNullAttributes(product)){
        console.log("ERR, PRODCUT INFO INCOMPLETE")
    }else{
        if(this.checkProductByCode(product.code)){
            console.log("ERR, ProductCode already exists")
        }else{
        product.id = 1 + this.products.length
        this.products.push(product)}
    }
    
}
checkProductByCode(code){
    let prod = this.products.find(prod => prod.code ==  code);
    if(prod === undefined){
        return false
    }else{
        return true
    }
}





}
function checkForNullAttributes(obj) {
    for (let key in obj) {
      if (obj[key] === null || obj[key]=== undefined) {
        return true;
      }
    }
    return false;
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
pmanager = new ProductManager()
console.log(pmanager.getProducts())
pmanager.addProduct( new Product("producto prueba ","Este es un producto prueba",200,"sin","abc123",25))
console.log(pmanager.getProducts())
pmanager.addProduct( new Product("producto prueba","Este es un producto prueba",200,"sin","abc123",25))
console.log(pmanager.getProductById(1))