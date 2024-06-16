import { LoaderFunctionArgs, redirect } from "react-router-dom"
import { getProductById } from "../services/ProductService"

export async function loader({params} : LoaderFunctionArgs) {
    console.log(params)
    if(params.id !== undefined) {
        const product = await getProductById(+params.id)
        if (!product) {
            return redirect("/")
        }
        return product
    }
}