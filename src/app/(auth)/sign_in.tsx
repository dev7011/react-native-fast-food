import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Link, router } from 'expo-router';

import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import ModalForm from '@/components/ModalForm';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [invalidAuth, setInvalidAuth] = useState(false);

  const handleSubmit = () => {
    if (!form.email.trim() || !form.password) {
      setInvalidAuth(true);
      return;
    }

    setInvalidAuth(false);
    router.replace('/');
  };

  return (
    <View className="gap-16 bg-white p-5 mt-5">
      <ModalForm
        title = "Invalid credentials"
        isOpen={invalidAuth}
        message="Enter your email and password, please."
        onClose={() => setInvalidAuth(false)}
      />

      <CustomInput
        label="Email"
        secureTextEntry={false}
        value={form.email}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, email: text }))
        }
        keyboardType="email-address"
        placeholder="Enter your email"
      />

      <CustomInput
        label="Password"
        secureTextEntry
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
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
  );
};

export default SignIn;