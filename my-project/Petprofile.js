import { StatusBar } from 'expo-status-bar';

    import React, {useState} from 'react';
    import { StyleSheet, Text, View, TextInput, ScrollView
    , TouchableOpacity, Image, Modal, TouchableWithoutFeedback, Button,} from 'react-native';
    import * as ImagePicker from 'expo-image-picker';
    import {Picker} from '@react-native-picker/picker';


    const genderOptions = [
    { label: '남자', value: '남자' },
    { label: '여자', value: '여자' },
    ];
    const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012,
    2011, 2010, 2009,2008,2007,2006,2005,2004,2003,2002];

    export default function Petrofile({navigation}) {
    const [image, setImage] = useState(null);
    const [text, setText]=useState("");
    const [selectedBreed, setSelectedBreed] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedYear, setSelectedYear] = useState(null);
    const [yearModalVisible, setYearModalVisible] = useState(false);
    const [genderModalVisible, setGenderModalVisible] = useState(false);
    const [selectedGender, setSelectedGender] = useState(null);

    const handleSaveProfile = () => {
        const newProfile = {
        name: text,
        breed: selectedBreed,
        year: selectedYear,
        gender: selectedGender,
        };
        setProfile(newProfile);
    };

    // 네ㅂ ㅣㅣconst onNextPress = () => {};
    const handleGenderValueChange = (gender) => {n
        setSelectedGender(gender);
        setGenderModalVisible(false);
    };

    
    

    const handlePress = () => {
        setModalVisible(true);
    };
    
    const handlePickerValueChange = (value) => {
        setSelectedBreed(value);
        setModalVisible(false);
    };
    
    const handleYearValueChange = (value) => {
        setSelectedYear(value);
    };


    

    const pickImage = async() =>{
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect:[4,3],
        quality: 1,
        });

        console.log(result);

        if(!result.canceled){
        setImage(result.uri);
        }
    };

    const onChangeText = (text) => {
        setText(text);
    };
    const breeds = [
        '치와와',
        '푸들',
        '골든 리트리버',
        '비숑 프리제',
        '시츄',
        '미니어처 핀셔',
        '닥스훈트',
        '요크셔 테리어',
        '보더 콜리',
        '스코티쉬 테리어',
        '웰시 코기',];
    
    return (
        <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.header}>
            <Text style={styles.petprofile}>반려견 프로필</Text>
        </View>
        <TouchableOpacity onPress={pickImage} style={styles.imageUploader}>
            {image ? (
            <Image source={{ uri: image }} style={styles.image} />
            ) : (
            null
            )}
        </TouchableOpacity>
        <View>
            <Text style={styles.title}>반려견 이름</Text>
        </View>
        <View style={styles.inputContainer}>
            <TextInput
            style={styles.Textin}
            onChangeText={onChangeText}
            value={text}
            returnKeyType='done'
            />
        </View>
        <View>
    <Text style={styles.title}>견종</Text>
    <TouchableOpacity onPress={handlePress}>
        <View style={styles.breedPicker}>
        {selectedBreed ?
            <Text style={styles.selectedBreedText}>{selectedBreed}</Text> :
            <Text style={styles.placeholderText}>선택</Text>
        }
        </View>
    </TouchableOpacity>

    <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
    >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContent}>
        <Picker
            selectedValue={selectedBreed}
            onValueChange={handlePickerValueChange}
        >
            <Picker.Item label="선택" value={null} />
            {breeds.map((breed, index) => (
            <Picker.Item key={index} label={breed} value={breed} />
            ))}
        </Picker>
        </View>
    </Modal>
    </View>

    <View>
    <Text style={styles.title}>출생년도</Text>
    <TouchableOpacity onPress={() => setYearModalVisible(true)}>
        <View style={styles.breedPicker}>
        {selectedYear ?
            <Text style={styles.selectedBreedText}>{selectedYear}</Text> :
            <Text style={styles.placeholderText}>선택</Text>
        }
        </View>
    </TouchableOpacity>

    <Modal
        visible={yearModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setYearModalVisible(false)}
    >
        <TouchableWithoutFeedback onPress={() => setYearModalVisible(false)}>
        <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContent}>
        <Picker
            selectedValue={selectedYear}
            onValueChange={handleYearValueChange}
        >
            <Picker.Item label="선택" value={null} />
            {years.map((year, index) => (
            <Picker.Item key={index} label={year.toString()} value={year} />
            ))}
        </Picker>
        </View>
    </Modal>
    </View>



    <View>
    <Text style={styles.title}>성별</Text>
    <TouchableOpacity onPress={() => setGenderModalVisible(true)}>
        <View style={styles.breedPicker}>
        {selectedGender ?
            <Text style={styles.selectedBreedText}>{selectedGender}</Text> :
            <Text style={styles.placeholderText}>선택</Text>
        }
        
    <Modal
    visible={genderModalVisible}
    transparent={true}
    animationType="fade"
    onRequestClose={() => setGenderModalVisible(false)}
    >
    <TouchableWithoutFeedback onPress={() => setGenderModalVisible(false)}>
        <View style={styles.modalOverlay} />
    </TouchableWithoutFeedback>

    <View style={styles.modalContent}>
        <Picker
        selectedValue={selectedGender}
        onValueChange={handleGenderValueChange}
        >
        <Picker.Item label="선택" value={null} />
    {genderOptions.map((option, index) => (
    <Picker.Item key={index} label={option.label} value={option.value} />
    ))}

        </Picker>
    </View>
    </Modal>
        </View>
    </TouchableOpacity>
    </View>
    <Button
            title="다음"
           // onPress={() => navigation.navigate('userprofile')}
        />

        </View>
    );
    };


    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        marginLeft: 30,
        flexDirection: 'row',
        marginTop: 100,
        marginBottom: 30,
    
    },
    petprofile :{
        fontSize: 35,
        fontWeight: "600",
        color:'#FFB74D', 
    },
    image: {
        
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    imageUploader:{
        marginHorizontal:120,
        width:150,
        height:150,
        borderRadius:75,
        borderWidth:3,
        borderColor: '#bbb',
        alignItems:'center',
        justifyContent:'center'
    },
    Textin:{
        padding:10,
        fontSize: 16,
        borderWidth:0,
        borderBottomWidth: 1,
        borderColor:'gray',
        textAlign : 'center',


    },
    inputContainer:{

        marginTop : 10,
        marginLeft : 40,
        width:'80%',
        
    },
    title:{
        marginTop : 10,
        marginLeft: 50,
        fontSize :18,
        color:'#FFB74D',
        fontWeight:'300',
    },
    breedPicker: {
        marginTop: 10,
        width: 200,
        height: 40,
        borderWidth: 0.5,
        borderRadius: 15,
        marginLeft:90,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedBreedText: {
        color: '#333',
        fontSize: 16,
    },
    placeholderText: {
        color: '#999',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    nextButtonText: {
        color: '#FFB74D',
        fontSize: 20,
        marginTop : 50,
        marginLeft : 170,}
    });
