import React, {useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import { Link, router } from 'expo-router'
import {deleteToken, saveToken} from "@/services/auth_storage";
import { loginApi } from "@/services/auth_api"

import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import ModalForm from '@/components/ModalForm'
import {SafeAreaView} from "react-native-safe-area-context";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async () => {
    const {email, password } = formData
    try {
      if (!email.trim() || !password) {
        setErrorMessage("Please enter your email and password")
        return
      }

      const response = await loginApi(email, password)
      const token = response.data?.token;

      if (!token) {
        throw new Error("Login response contains no token");
      }

      await saveToken(token);
      setErrorMessage("")

      router.replace("/");

    } catch (error) {
      console.log(error)
      setErrorMessage("Login failed: unauthorized")
    }
  }

  return (
    <SafeAreaView>
    <View className="gap-16 bg-white p-5 mt-5">
      { errorMessage && <ModalForm
          title = "Invalid credentials"
          isOpen={true}
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      }

      <CustomInput
        label="Email"
        value={formData.email}
        onChangeText={(text: string) => setFormData((prev) => ({ ...prev, email: text }))}
        keyboardType="email-address"
        placeholder="Enter your email"
      />

      <CustomInput
        label="Password"
        secureTextEntry= {true}
        value= {formData.password}
        onChangeText={(text: string) => setFormData((prev) => ({ ...prev, password: text }))}
        placeholder="Enter your password"
      />

      <CustomButton
        title="Sign In"
        isLoading={false}
        onPress={handleSubmit}
      />

      <View className="flex-center flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Don't have an account?
        </Text>

        <Link href="/sign_up">
          <Text className="base-bold text-primary">
            Sign Up
          </Text>
        </Link>
      </View>
    </View>
    </SafeAreaView>
  )
}

export default SignIn