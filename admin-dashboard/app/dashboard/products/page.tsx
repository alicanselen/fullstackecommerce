import { listProducts } from "@/api/products"
import ProductListItem from "./productListItem";

export default async function ProductsPage(){

    const products = await listProducts();
    return (
        <div className="flex flex-row flex-wrap gap-4 max-w-[960px] mx-auto w-full">
            {products.map((product)=> <ProductListItem key = {product.id} product = {product}/>)}
        </div>
    );
}