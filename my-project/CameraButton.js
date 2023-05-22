// CameraButton.js
import React, { useState } from "react";
import { View, Pressable, Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import UploadModeModal from "./UploadModeModal";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";

const imagePickerOption = {
  mediaType: "photo",
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === "android",
};

function CameraButton() {
  const [modalVisible, setModalVisible] = useState(false);

  const onPickImage = (res) => {
    if (res.didCancel || !res) {
      return;
    }
    console.log("PickImage", res);
  };

  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
    setModalVisible(false);
  };

  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
    setModalVisible(false);
  };

  const modalOpen = () => {
    setModalVisible(true);
  };

  return (
    <>
      <View>
        <Pressable onPress={modalOpen}>
          <Icon name="camera-alt" color="white" size={24} />
        </Pressable>
      </View>
      <UploadModeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onLaunchCamera={onLaunchCamera}
        onLaunchImageLibrary={onLaunchImageLibrary}
      />
    </>
  );
}

export default CameraButton;
