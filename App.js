import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null); // cameraRef 추가

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo);
      setIsPreview(true);
    }
  };

  const savePhoto = async () => {
    if (capturedImage) {
      await MediaLibrary.saveToLibraryAsync(capturedImage.uri);
      setIsPreview(false);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {isPreview ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={{ uri: capturedImage.uri }} style={{ width: '100%', height: '80%' }} />
          <TouchableOpacity onPress={savePhoto} style={{ backgroundColor: 'white', padding: 10 }}>
            <Text style={{ color: 'black' }}>사진 저장</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Camera style={{ flex: 1 }} type={cameraType} ref={cameraRef}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={handleCameraType}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> 카메라 전환 </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.9,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={takePicture}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> 촬영 </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}
