import { fetchProductById } from "@/api/products"
import ProductListItem from "../productListItem";

export default async function ProductsPage({params :{id}}:{params:{id:string}}) {

    const product  = await fetchProductById(Number(id));
    return (
        <div className="max-w-[1200px] mx-auto w-full">
            <ProductListItem product = {product}/>        
        </div>
    )
}