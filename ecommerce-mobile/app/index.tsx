import { Text, View , FlatList } from "react-native";
import products from  '../assets/products.json'
import ProductListItem from "../components/productListItem";
import { Button, ButtonText } from "@/components/ui/button";

export default function HomeScreen(){
    return (
        <Button variant="outline">
            <ButtonText>Basiniz Lutfen</ButtonText>
        </Button>
    )
}