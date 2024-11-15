import "@/global.css";
import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout(){
    return (
        <QueryClientProvider client={queryClient}>
        <GluestackUIProvider>
            <Stack>
                <Stack.Screen name="index" options={{title:'Anasayfa'}}/>
                <Stack.Screen name="product/[id]" options={{title:'Urun Detayi'}}/>
            </Stack>
        </GluestackUIProvider>
        </QueryClientProvider>
    )
}