import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import cn from "clsx"
import {CustomButtonProps} from "~/interfaces";


const CustomButton = ({onPress, title, isLoading, style}: CustomButtonProps) => {
    return (
      <TouchableOpacity
        className={ cn("custom-btn", style) }
        onPress={onPress}
      >
        { isLoading
          ? <ActivityIndicator size="large" color="#00ff00" />
          : (
            <Text className={"text-white paragraph-semibold"}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  };

export default CustomButton;

