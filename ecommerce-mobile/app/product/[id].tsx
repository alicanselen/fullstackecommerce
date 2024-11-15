
import { Stack, useLocalSearchParams } from "expo-router";
import products from  '@/assets/products.json'
import { Card } from "@/components/ui/card";
// UI bileşeni olan Card'ı import ediyoruz
import { Image } from "@/components/ui/image";
// UI bileşeni olan Image'ı import ediyoruz
import { Text } from "@/components/ui/text";
// UI bileşeni olan Text'i import ediyoruz
import { VStack } from "@/components/ui/vstack";
// UI bileşeni olan VStack'ı import ediyoruz
import { Heading } from "@/components/ui/heading";
// UI bileşeni olan Heading'i import ediyoruz
import { Box } from "@/components/ui/box";
// UI bileşeni olan Box'ı import ediyoruz
import { Button , ButtonText } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/api/products";
import { ActivityIndicator } from "react-native";
import { useCart } from "@/store/cartStore";

export default function ProductDetailsScreen(){


    const {id} = useLocalSearchParams<{ id :string}>();
    const addProduct = useCart((state)=>state.addProduct);
    const cartItems = useCart((state)=>state.items);

    const {data:product , isLoading , error} = useQuery({
        queryKey:['products' , id],
        queryFn:()=>fetchProductById(Number(id)),
    });

    const addToCart = ()=>{
        addProduct(product);
    };

    if(isLoading)
        {
            return <ActivityIndicator/>;
        }

    if(error){
        return <Text>Urun Bulunamadi Veya Satici Tarafindan Kaldirildi</Text>
    }


    return(
        <Card className="p-5 rounded-lg max-w-[560px] flex-1">
            <Stack.Screen  options={{title:product.name}}/>
                    {/* Ürünün resmini gösteriyoruz, resmin boyutu ve yuvarlak köşe ayarı var */}
                    <Image
                        source={{
                            uri: product.image, // Ürün görseli linki
                        }}
                        className="mb-6 h-[240px] w-full rounded-md"
                        alt={`${product.name} image`} // Görselin alternatif metni
                        resizeMode="contain" // Resmi, belirlenen alana sığacak şekilde ölçeklendir
                    />
                    {/* Ürün adını küçük yazı tipiyle gösteriyoruz */}
                    <Text className="text-sm font-normal mb-2 text-typography-700">
                        {product.name}
                    </Text>
                    {/* Ürün fiyatı ve açıklaması için bir dikey sıralama */}
                    <VStack className="mb-6">
                        {/* Fiyatı başlık olarak gösteriyoruz */}
                        <Heading size="md" className="mb-4">
                            ${product.price}
                        </Heading>
                        {/* Ürün açıklamasını gösteriyoruz */}
                        <Text size="sm">
                            {product.description}
                        </Text>
                    </VStack>
                    {/* Butonları yatayda sıralamak için Box bileşeni */}
                    <Box className="flex-col sm:flex-row">
                        {/* Sepete ekleme butonu */}
                        <Button onPress={addToCart} className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
                            {/* Buton metni */}
                            <ButtonText size="sm">Add to cart</ButtonText>
                        </Button>
                        {/* Wishlist butonu, outline stiliyle */}
                        <Button
                            variant="outline"
                            className="px-4 py-2 border-outline-300 sm:flex-1"
                        >
                            {/* Buton metni */}
                            <ButtonText size="sm" className="text-typography-600">
                                Wishlist
                            </ButtonText>
                        </Button>
                    </Box>
                </Card>
    )
}