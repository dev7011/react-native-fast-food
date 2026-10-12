interface CustomInputProps  {
  label: string
  value: string
  secureTextEntry: boolean,
  keyboardType?: "default"|"email-address"|"numeric"|"phone-pad"
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
