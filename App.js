import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import CameraButton from './my-project/CameraButton';
import UploadModeModal from './my-project/UploadModeModal';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function delay_splash() {
  await SplashScreen.preventAutoHideAsync();
  await sleep(3000);
  await SplashScreen.hideAsync();
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>HomeScreen입니다.</Text>
    </View>
  );
}

function WelcomeScreen({ navigation }) {
  const [uploadModalVisible, setUploadModalVisible] = useState(false);

  const openUploadModal = () => {
    setUploadModalVisible(true);
  };

  const closeUploadModal = () => {
    setUploadModalVisible(false);
  };

  return (
    <ImageBackground source={require('./image/hero.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: '#FF8A00' }]}>ANITIME</Text>
        <TouchableOpacity style={styles.button} onPress={openUploadModal}>
          <Text style={styles.buttonText}>등록하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>조회하기</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
      {uploadModalVisible && (
        <UploadModeModal
          visible={uploadModalVisible}
          onClose={closeUploadModal}
          onLaunchCamera={() => console.log('Launch Camera')}
          onLaunchImageLibrary={() => console.log('Launch Image Library')}
        />
      )}
      <CameraButton />
    </ImageBackground>
  );
}

export default function App() {
  delay_splash();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: 'Welcome' }} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
