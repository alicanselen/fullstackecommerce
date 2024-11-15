import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useCart } from "@/store/cartStore";
import { View,FlatList } from "react-native";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Redirect } from "expo-router";
export default function CartScreen(){
    const item = useCart((state) => state.items);
    const resetCart = useCart((state)=> state.resetCart);

    const onCheckout = async () =>{
        //siparisler servera gonderilir

        resetCart();
    } 
    if(item.length ===0){
        return <Redirect href={'/'}/>
    }
    
    return (
<FlatList
    data={item}
    contentContainerClassName="gap-2 max-w-[960px] w-full mx-auto p-2"
    renderItem={({ item }) => (
        <HStack className="bg-white p-3">
            <VStack space="sm">
                <Text>{item.product.name}</Text>
                <Text>{item.product.price}</Text>
            </VStack>
            <Text className="ml-auto">{item.quantity}</Text>
        </HStack>
    )}
    ListFooterComponent={() => {
        return (
            <Button onPress={onCheckout}>
                <ButtonText>Ödeme Yap</ButtonText>
            </Button>
        );
    }}
/>

    )
}