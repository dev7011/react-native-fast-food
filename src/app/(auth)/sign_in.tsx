import React, {useState} from 'react';
import {View, Text} from 'react-native';
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {Link} from "expo-router";
import "@/constants"

interface FormProps{
  email: string,
  password: string
}


const SignIn = () => {
  const [email, setEmail] = useState('');

  return (

    <View className={"gap-16 bg-white p-5 mt-5"}>
      <CustomInput
        label= "Email"
        secureTextEntry= {false}
        value={email}
        onChangeText= {(text) => setEmail(text)}
        onPress={() => {}}
        keyboardType={"email-address"}
        placeholder={"Enter your email"}
      />

      <CustomButton
        title={"Sign In"}
        isLoading={false}
        onPress={() => {}}
      />

      <View className={"flex-center flex-row gap-2"}>
        <Text className={"base-regular text-gray-100"}> Don't have an account? </Text>
        <Link href= "/sign_up" className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>

  );
};

export default SignIn;