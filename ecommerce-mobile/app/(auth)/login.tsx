import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button , ButtonText } from "@/components/ui/button";
import { useState } from "react";
import { FormControl } from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";

export default function Loginscreen() {
    const [showPassword, setShowPassword] = useState(false);

    const handleState = () => {
      setShowPassword((showState) => {
        return !showState;
      });
    };

    return (
      <FormControl
        className='p-4 border rounded-lg max-w-[560px] border-outline-300 bg-white m-2'
      >
        <VStack space='xl'>
          <Heading className='text-typography-900 leading-3 pt-3'>
            Login
          </Heading>
          <VStack space='xs'>
            <Text className='text-typography-500 leading-1'>
              Email
            </Text>
            <Input>
              <InputField
                type="text"
              />
            </Input>
          </VStack>
          <VStack space='xs'>
            <Text className='text-typography-500 leading-1'>
              Password
            </Text>
            <Input className='text-center'>
              <InputField
                type={showPassword ? 'text' : 'password'}
              />
              <InputSlot className='pr-3' onPress={handleState}>
                {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} className='text-darkBlue-500' />
              </InputSlot>
            </Input>
          </VStack>
          <HStack space="sm">
          <Button className='flex-1' variant="outline">
            <ButtonText >
              Ailemize Katil
            </ButtonText>
          </Button>

          <Button className='flex-1'>
            <ButtonText className='text-typography-0'>
              Satin Almaya Basla
            </ButtonText>
          </Button>
          </HStack>
        </VStack>
      </FormControl>
    );
  }
