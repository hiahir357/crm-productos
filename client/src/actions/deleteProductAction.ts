import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteProduct } from "../services/ProductService";



export async function action({params} : ActionFunctionArgs) {

    console.log("Desde delete action")
    if (params.id !== undefined) {
        await deleteProduct(+params.id)
    }

    return redirect("/")
}