import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import cn from "clsx"
import {CustomInputProps} from "../../interfaces";

const CustomInput = ({
   label,
   value,
   secureTextEntry= false ,
   keyboardType= "default",
   placeholder,
   onChangeText,
}: CustomInputProps) => {

  const [isFocused, seIsFocused] = useState(false)

  return (
    <View className="w-full">
      <Text className={"label"}>{label}</Text>

      <TextInput
        autoCapitalize= "none"
        autoCorrect= {false}

        className={cn('input', isFocused ? 'border-primary' : 'border-gray-300')}
        value={value}
        secureTextEntry= {secureTextEntry}
        keyboardType= {keyboardType}
        placeholder={placeholder}
        placeholderTextColor={"#888"}
        onChangeText={onChangeText}
        onFocus={() => seIsFocused(true)}
        onBlur={() => seIsFocused(false)}
      />
    </View>
  );
};

export default CustomInput;


