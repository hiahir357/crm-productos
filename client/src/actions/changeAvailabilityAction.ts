import { ActionFunctionArgs } from "react-router-dom";
import { updateAvailability } from "../services/ProductService";

export async function action({request} : ActionFunctionArgs) {
    console.log("Desde patch action")
    const data = Object.fromEntries(await request.formData())
    await updateAvailability(+data.id)

    return {}
}