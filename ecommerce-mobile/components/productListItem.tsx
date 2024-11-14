import { Text, View , FlatList } from "react-native";

export default function ProductListItem ({product}){
    return(
        <Text>{product.name}</Text>
    )
}