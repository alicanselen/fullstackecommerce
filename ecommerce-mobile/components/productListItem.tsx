import React from "react";
// React ve gerekli komponentleri import ediyoruz
import { View , FlatList, Pressable } from "react-native";
// React Native bileşenlerini import ediyoruz (View, FlatList, Pressable)
import { Card } from "@/components/ui/card";
// UI bileşeni olan Card'ı import ediyoruz
import { Image } from "@/components/ui/image";
// UI bileşeni olan Image'ı import ediyoruz
import { Text } from "@/components/ui/text";
// UI bileşeni olan Text'i import ediyoruz
import { Heading } from "@/components/ui/heading";
// UI bileşeni olan Heading'i import ediyoruz
import { Link } from "expo-router";
// Expo Router'dan Link bileşenini import ediyoruz, sayfa geçişleri için

// Ürün öğesi için fonksiyonel bir bileşen oluşturuyoruz
export default function ProductListItem({ product }) {
    return (
        // Link, kullanıcıyı ürün sayfasına yönlendirecek. Burada `href` ile yönlendirme yolu belirliyoruz.
        <Link href={`/product/${product.id}`} asChild>
            {/* Pressable bileşeni, kullanıcı etkileşimini algılar, dokunulabilir alan yaratır */}
            <Pressable className="flex-1">
                {/* Card bileşeni, ürün öğesini görsel ve bilgilerle sarmalar */}
                <Card className="p-5 rounded-lg max-w-[360px] flex-1">
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
                        {/* Fiyatı başlık olarak gösteriyoruz */}
                    <Heading size="md" className="mb-4">
                        ${product.price}
                    </Heading>
                </Card>
            </Pressable>
        </Link>
    );
}
