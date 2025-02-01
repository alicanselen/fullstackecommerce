const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function login(email:string , pasword:string) {

  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, pasword }), // pasword -> password düzeltildi
});

const data = await res.json();

if (!res.ok) {
    console.log("Login Error:", data);
    throw new Error(data.error || "Giriş yapma başarısız");
}

if (!data.token) {
    throw new Error("Token bulunamadı");
}

return data;
}

export async function signup(email: string, pasword: string) {
   
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, pasword }),
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      console.log("Response Error:", data); // Hata durumunda gelen yanıtı yazdırır.
      throw new Error("Giris Yapma Basarisiz");
    }
  
    return data;
  }
  