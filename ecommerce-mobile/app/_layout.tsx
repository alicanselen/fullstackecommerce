import "@/global.css";
import { Link, Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Icon } from "@/components/ui/icon";
import { ShoppingCart } from "lucide-react-native";
import { Pressable , Text} from "react-native";
import { useCart } from "@/store/cartStore";

const queryClient = new QueryClient();

export default function RootLayout(){
    const cartItemsNum = useCart((state)=>state.items.length);
    return (
        <QueryClientProvider client={queryClient}>
        <GluestackUIProvider>
            <Stack 
            screenOptions={{
                headerRight:  ()=> (
                    <Link href={'/cart'} asChild>
                        <Pressable className="flex-row gap-2">
                            <Text>{cartItemsNum}</Text>
                        <Icon as={ShoppingCart}/>
                        </Pressable>
                    </Link>
                )
            }}
            >
                <Stack.Screen name="index" options={{title:'Anasayfa'}}/>
                <Stack.Screen name="product/[id]" options={{title:'Urun Detayi'}}/>
            </Stack>
        </GluestackUIProvider>
        </QueryClientProvider>
    )
}