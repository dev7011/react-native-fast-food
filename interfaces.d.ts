import { type TextInputProps,
} from "react-native";

interface CustomInputProps  {
  label: string
  value: string
  secureTextEntry?: boolean,
  keyboardType?: TextInputProps["keyboardType"];
  placeholder: string,
  onChangeText?: (text: string) => void
  onPress?: () => void
}

interface CustomButtonProps {
  onPress?: () => void
  title: string
  isLoading: boolean
  style?: StyleSheet
  leftIcon?: boolen
}


export interface User {
  name: string;
  email: string;
  avatar: string;
}

interface TabBarIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}