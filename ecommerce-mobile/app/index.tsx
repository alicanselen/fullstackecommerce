import { Text, View , FlatList } from "react-native";
import products from  '../assets/products.json'
import ProductListItem from "../components/productListItem";
import { Button, ButtonText } from "@/components/ui/button";

export default function HomeScreen(){
    return (
        <FlatList
        data={products}
        numColumns={2}
        contentContainerClassName="gap-2"
        columnWrapperClassName="gap-2"
        renderItem={({item})=><ProductListItem product={item}/>}
        />
    )
}