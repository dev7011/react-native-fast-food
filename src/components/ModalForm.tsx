import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
} from 'react-native';

interface ModalFormProps {
  title: string
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const ModalForm = ({
  title,
  isOpen,
  message,
  onClose,
}: ModalFormProps) => {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50 px-5">
        <View className="w-full rounded-xl bg-danger p-6 gap-4">
          <Text className="text-lg font-bold text-white">
            {title}
          </Text>

          <Text className="text-white">
            {message}
          </Text>

          <Pressable
            onPress={onClose}
            className="items-center rounded-lg bg-primary p-3"
          >
            <Text className="font-bold text-white">
              OK
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ModalForm;
