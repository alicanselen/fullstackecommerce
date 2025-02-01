import { useState, useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchOrderById } from "@/api/orders";
import { fetchProductById } from "@/api/products";
import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";

interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export default function OrderDetails() {
  const queryClient = useQueryClient();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [error, setError] = useState<string | null>(null);
  const [productIds, setProductIds] = useState<number[]>([]);

  // 1. Sipariş detaylarını çek
  const { data: order, isLoading: orderLoading, error: orderError } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      try {
        if (!id) throw new Error('Sipariş ID bulunamadı');
        const response = await fetchOrderById(Number(id));
        console.log('Order Response:', response);
        return response;
      } catch (error: any) {
        console.error('Order fetch error:', error);
        throw error;
      }
    }
  });

  // 2. ProductId'leri çıkar
  useEffect(() => {
    try {
      if (order?.items) {
        const ids = (order.items as OrderItem[]).map(item => {
          if (typeof item.productId !== 'number') {
            throw new Error(`Geçersiz ürün ID'si: ${JSON.stringify(item)}`);
          }
          return item.productId;
        });
        
        console.log('Product IDs:', ids);
        setProductIds(ids);
      }
    } catch (error: any) {
      console.error('Product ID extraction error:', error);
      setError(error.message);
    }
  }, [order]);

  // 3. Ürün detaylarını çek
  const { data: products, isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ["products", productIds],
    queryFn: async () => {
      if (!productIds.length) return [];
      try {
        const results = await Promise.all(
          productIds.map(id => fetchProductById(id))
        );
        console.log('Products:', results);
        return results;
      } catch (error: any) {
        console.error('Products fetch error:', error);
        throw error;
      }
    },
    enabled: productIds.length > 0
  });

  // Loading states
  if (orderLoading) return <ActivityIndicator />;
  if (productsLoading) {
    return (
      <Box>
        <ActivityIndicator />
        <Text>Ürün detayları yükleniyor...</Text>
      </Box>
    );
  }

  // Error handling
  if (error || orderError || productsError) {
    const errorMessage = error || 
      (orderError as Error)?.message || 
      (productsError as Error)?.message || 
      'Bir hata oluştu';

    return (
      <Box className="p-4">
        <Text className="text-red-500 font-bold">Hata</Text>
        <Text>{errorMessage}</Text>
        <Button 
          onPress={() => {
            setError(null);
            queryClient.invalidateQueries(["order", id]);
            queryClient.invalidateQueries(["products", productIds]);
          }}
        >
          <ButtonText>Tekrar Dene</ButtonText>
        </Button>
      </Box>
    );
  }

  if (!order || !products) return <Text>Veri bulunamadı</Text>;

  return (
    <Card className="p-5 rounded-lg max-w-[560px] flex-1">
      <Stack.Screen options={{ title: `Sipariş #${order.id}` }} />

      <VStack className="gap-4">
        <Heading size="lg">Sipariş Detayı</Heading>

        <Box>
          <Text className="font-bold">Durum:</Text>
          <Text>{order.status}</Text>
        </Box>

        <Box>
          <Text className="font-bold">Tarih:</Text>
          <Text>{new Date(order.createdAt).toLocaleDateString()}</Text>
        </Box>

        <Box>
          <Text className="font-bold mb-2">
            {order.items.length > 1 ? "Ürünler:" : "Ürün:"}
          </Text>
          {products && products.map((product, index) => (
            <Box 
              key={product.id} 
              className="mb-3 border border-gray-200 p-4 rounded-lg flex-row items-center"
            >
              <Image
                source={{ uri: product.image }}
                style={{ width: 70, height: 70, borderRadius: 8 }}
              />
              <Box className="flex-1 px-4">
                <Text className="font-bold text-lg">{product.name}</Text>
                <Text className="text-gray-600">Adet: {order.items[index].quantity}</Text>
              </Box>
              <Box className="items-end">
                <Text className="font-bold text-lg">${order.items[index].price}</Text>
              </Box>
            </Box>
          ))}

          <Box className="mt-4 pt-4 border-t border-gray-200">
            <Text className="font-bold text-lg">Toplam:</Text>
            <Text className="text-xl font-bold">
              ${order.items?.reduce((total, item) => total + (item.price * item.quantity), 0) || 0}
            </Text>
          </Box>
        </Box>

        <Box>
          <Text className="font-bold">Toplam Fiyat:</Text>
          <Text>${order.items?.reduce((total, item) => total + (item.price * item.quantity), 0) || 0}</Text>
        </Box>
      </VStack>

      {order.status === "delivered" && (
        <Box className="mt-6">
          <Button onPress={() => console.log("Yorum ekle")}>
            <ButtonText>Yorum Ekle</ButtonText>
          </Button>
        </Box>
      )}
    </Card>
  );
}