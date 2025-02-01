'use client';
import { Box } from '@/components/ui/box';
import { FormControl } from '@/components/ui/form-control';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { createProduct } from './actions';
import { useEdgeStore } from '@/lib/edgestore';
import { SingleImageDropzone } from '@/components/sngle-image-dropzone';


export default function CreateProductPage() {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState<string>(''); // Changed to string type
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('errorMessage');

  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();


  const uploadImage = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }
  
    const res = await edgestore.myPublicImages.upload({
      file,
      input: { type: "post" }, // Eğer `type` parametresi gerekiyorsa
      onProgressChange: (progress) => {
        console.log(`Upload progress: ${progress}%`);
      },
    });
  
    console.log("Uploaded Image:", res);
  
    // **Yükleme başarılı olduysa, image URL'yi sakla**
    if (res?.url) {
      setImageURL(res.url);
    }
  };
  
  const handleSubmit = async () => {
    try {
      if (!file) {
        alert("Please select an image before submitting.");
        return;
      }
  
      // 1. **Önce resmi yükle ve URL'yi al**
      await uploadImage();
  
      // 2. **Yükleme tamamlanana kadar bekle**
      if (!imageURL) {
        alert("Image upload failed. Please try again.");
        return;
      }
  
      // 3. **Tüm alanlar dolu mu kontrol et**
      if (!name || !description || !price) {
        alert("Please fill in all fields.");
        return;
      }
  
      // 4. **Ürünü oluştur**
      const result = await createProduct(name, description, Number(price), imageURL);
      
      if (result.success) {
        window.location.href = "/dashboard/products";
      } else {
        alert(result.error || "Failed to create product");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error creating product");
    }
  };
  

  return (
    <Box className="flex-1 min-h-screen justify-center items-center">
      <FormControl
        isInvalid={!!errorMessage}
        className="p-4 border rounded-lg max-w-[500px] w-full border-outline-300 bg-white m-2"
      >
        <div className='flex flex-col items-center m-6 gap-2'>
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
            onChange={(file)=> {setFile(file)}}
          />

            <Button
              onPress={async () => {
                await uploadImage();
                alert("Image uploaded successfully. Now you can save the product.");
              }}
            >
              <ButtonText>Upload Image</ButtonText>
            </Button>
        </div>
  
        <VStack space="xl">
          <Heading className="text-typography-900 leading-3 pt-3">
            Create product
          </Heading>
          <VStack space="xs">
            <Text className="text-typography-500 leading-1">Name</Text>
            <Input>
              <InputField value={name} onChangeText={setName} type="text" />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500 leading-1">Description</Text>
            <Input>
              <InputField
                value={description}
                onChangeText={setDescription}
                type="text"
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500 leading-1">Price</Text>
            <Input>
              <InputField value={price} onChangeText={setPrice} type="text" />
            </Input>
          </VStack>
          {errorMessage && <Text className="text-red-500">{errorMessage}</Text>}
          <Button
            onPress={handleSubmit}  // Changed from createProduct to handleSubmit
          >
            <ButtonText>Save product</ButtonText>
          </Button>
        </VStack>
      </FormControl>
    </Box>
  );
} // Add this closing brace for the component
