'use server';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createProduct(
  name: string,
  description: string,
  price: number,
  imageUrl: string
) {
  try {
    const token = cookies().get('token')?.value;
    
    if (!token) {
      throw new Error('Authentication required');
    }

    // Log the image URL to verify it's being passed
    console.log('Creating product with image:', imageUrl);
    
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
        'Accept': 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify({
        name,
        description,
        price,
        image: imageUrl.trim(), // Ensure the URL is properly formatted
      }),
    });

    const responseData = await response.json();
    console.log('API Response:', responseData);

    if (!response.ok) {
      throw new Error(responseData.error || 'Failed to create product');
    }

    return { success: true, data: responseData };
  } catch (error: any) {
    console.error('Error with image URL:', imageUrl);
    return { 
      success: false, 
      error: error.message || 'Failed to create product'
    };
  }
}