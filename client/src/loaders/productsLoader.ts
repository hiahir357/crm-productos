import { getProducts } from "../services/ProductService"


export async function loader() {
    console.log("desde loader...")
    const products = await getProducts()
    return products
    
}