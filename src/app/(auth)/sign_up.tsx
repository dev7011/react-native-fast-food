import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Link, router } from 'expo-router'

import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import ModalForm from '@/components/ModalForm'

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errorMessage, setErrorMessage] = useState("")
  const isInputInvalid = errorMessage.length > 0

  const setValidationError = (message: string): void => {
    setErrorMessage(message)
  }

  const handleSubmit = () => {
    try {
      if (form.password !== "" && form.password !== form.confirmPassword) {
        setValidationError("Password confirmation does not match.")
        return
      }

      if (!form.name.trim() || !form.email.trim() || !form.password) {
        setValidationError("Please enter your full name, email address, and password.")
        return
      }

      setValidationError("")

      router.replace("/")
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return (
    <View className="gap-8 bg-white p-5 mt-5">
      <ModalForm
        title = "Invalid credentials"
        isOpen={isInputInvalid}
        message= {errorMessage}
        onClose={() => setValidationError("")}
      />

      <CustomInput
        label="Full-name"
        value={form.name}
        onChangeText={(email: string) =>
          setForm((prev) => ({ ...prev, name: email }))
        }
        keyboardType="email-address"
        placeholder="Enter your full name"
      />

      <CustomInput
        label="Email"
        value={form.email}
        onChangeText={(text: string) =>
          setForm((prev) => ({ ...prev, email: text }))
        }
        keyboardType="email-address"
        placeholder="Enter your email"
      />

      <CustomInput
        label="Password"
        secureTextEntry={true}
        value={form.password}
        onChangeText={(text: string) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        placeholder="Enter your password"
      />

      <CustomInput
        label="Confirm password"
        secureTextEntry={true}
        value={form.confirmPassword}
        onChangeText={(text: string) =>
          setForm((prev) => ({ ...prev, confirmPassword: text }))
        }
        placeholder="Enter your password"
      />

      <CustomButton
        title="Sign Up"
        isLoading={false}
        onPress={handleSubmit}
      />

      <View className="flex-center flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Do you have an account?
        </Text>

        <Link href="/sign_in">
          <Text className="base-bold text-primary">
            Sign In
          </Text>
        </Link>
      </View>
    </View>
  )
}

export default SignUp