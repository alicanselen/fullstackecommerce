import "@/global.css";
import { Link, Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Icon } from "@/components/ui/icon";
import { ShoppingCart, User ,ShoppingBag} from "lucide-react-native";
import { Pressable, Text } from "react-native";
import { useCart } from "@/store/cartStore";
import { useAuth } from "@/store/authStore";

const queryClient = new QueryClient();

export default function RootLayout() {
  const cartItemsNum = useCart((state) => state.items.length);
  const isLoggedIn = useAuth((s) => !!s.token);

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack
          screenOptions={{
            headerRight: () => (
              <Link href={"/cart"} asChild>
                <Pressable className="flex-row gap-2">
                  <Text>{cartItemsNum}</Text>
                  <Icon as={ShoppingCart} />
                </Pressable>
              </Link>
            ),

            headerLeft: () =>
              isLoggedIn ? (
                <Link href={"/orders"} asChild>
                  <Pressable className="flex-row gap-2">
                    <Text>Siparisler</Text>
                    <Icon as={ShoppingBag} />
                  </Pressable>
                </Link>
              ) : (
                <Link href={"/login"} asChild>
                  <Pressable className="flex-row gap-2">
                    <Icon as={User} />
                  </Pressable>
                </Link>
              ),
          }}
        >
          <Stack.Screen name="index" options={{ title: "Anasayfa" }} />
          <Stack.Screen name="product/[id]" options={{ title: "Ürün Detayı" }} />
          <Stack.Screen name="orders/[id]" options={{ title: "Sipariş Detayı" }} />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}