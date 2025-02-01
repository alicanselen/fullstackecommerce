import { Link, useRouter } from "expo-router";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, Pressable } from "react-native";
import { fetchOrders } from "@/api/orders";
import { Button, ButtonText } from "@/components/ui/button";
import { useAuth } from "@/store/authStore";


export default function Orders() {
  const router = useRouter();
  const { user } = useAuth.getState(); // user bilgisini al
  
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    select: (data) => {
      // Sadece giriş yapmış kullanıcının siparişlerini filtrele
      return data.filter(order => order.userId === user?.id);
    }
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Siparişler yüklenirken bir hata oluştu.</Text>;
  }

  if (!orders || orders.length === 0) {
    return (
      <Box className="flex-1 p-4 justify-center items-center">
        <Text className="text-xl mb-4">Henüz bir siparişiniz yok</Text>
        <Button
          onPress={() => router.push("/")}
          className="mb-4"
        >
          <ButtonText>Alışverişe Başla</ButtonText>
        </Button>
      </Box>
    );
  }

  return (
    <Box className="flex-1 p-4">
      <Heading className="text-xl mb-4">Siparişlerim</Heading>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/orders/${item.id}`} asChild>
            <Pressable>
              <Box className="bg-gray-100 p-3 rounded-md mb-2">
                <Text>Durum: {item.status}</Text>
                <Text>Tarih: {new Date(item.createdAt).toLocaleDateString()}</Text>
                <Text>Toplam Fiyat: ${item.totalPrice}</Text>
              </Box>
            </Pressable>
          </Link>
        )}
      />
    </Box>
  );
}