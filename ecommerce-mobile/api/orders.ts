import { useAuth } from "@/store/authStore";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function createOrder(items:any [] ){
    const token = useAuth.getState().token;
    const res = await fetch(`${API_URL}/orders`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':token,
        },
        body:JSON.stringify({
            order:{},
            items
        })
    });
    const data = await res.json();

    if(!res.ok){
        console.log(data);
        throw new Error ('Error')
    }
    
    return data;
}
export async function fetchOrderById(orderId: number) {
    const token = useAuth.getState().token;
  
    const res = await fetch(`${API_URL}/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  
    const data = await res.json();
    console.log('Raw order response:', data);

    if (!res.ok) {
      console.log('Error response:', data);
      throw new Error("Sipariş bulunamadı veya bir hata oluştu.");
    }

    // Direkt gelen veriyi kullan
    return {
      ...data,
      items: data.items.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      }))
    };
}
  export async function fetchOrders() {
      const { token, user } = useAuth.getState();
      
      if (!token || !user) {
          throw new Error("Authentication token is missing");
      }
  
      const res = await fetch(`${API_URL}/orders?userId=${user.id}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": token
          }
      });
  
      const data = await res.json();
      console.log('Current user orders:', data); // Debug için
  
      if (!res.ok) {
          console.error("API Error Response:", data);
          throw new Error(data.error || "Failed to fetch orders");
      }
  
      return data;
  }