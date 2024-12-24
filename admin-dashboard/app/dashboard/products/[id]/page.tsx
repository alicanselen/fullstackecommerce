import { fetchProductById } from "@/api/products"
import ProductListItem from "../productListItem";

export default async function ProductsPage({params :{id}}:{params:{id:string}}) {

    const product  = await fetchProductById(Number(id));
    return (
        <div className="max-w-screen-xl mx-auto w-full">
            <ProductListItem product = {product}/>        
        </div>
    )
}