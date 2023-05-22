import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

import UploadModeModal from './UploadModeModal';

const choice = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleLaunchCamera = () => {
    // 카메라 촬영 실행
  };

  const handleLaunchImageLibrary = () => {
    // 사진 라이브러리 실행
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Modal Example</Text>
      <Button title="Open Modal" onPress={handleOpenModal} />
      <UploadModeModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onLaunchCamera={handleLaunchCamera}
        onLaunchImageLibrary={handleLaunchImageLibrary}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default choice;