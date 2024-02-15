import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const database = require('../../components/Handlers/database.js');


const AddHostsScreen = props => {

    const navigation = useNavigation();

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    

    const onHostsAdd = () => {
        if (!fullname){
            alert('Please enter your fullname.');
            return;
        }
        if (!email){
            alert('Please enter your email.');
            return;
        }
        try {
            database.addHosts(fullname, email);
        } catch (error) {
            console.log('Error adding host ' + error);
        }
        
        alert(fullname + ' Added.');
        // navigation.navigate('Start Shopping!');
    }

  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <TextInput 
                value={fullname}
                onChangeText={value => setFullname(value)}
                style={styles.name}
                placeholder={'Enter Contact Fullname'}
                placeholderTextColor={'grey'}
            />
            <TextInput 
                value={email}
                onChangeText={value => setEmail(value)}
                style={styles.email}
                placeholder={'Enter Contact Email'}
                placeholderTextColor={'grey'}
            />
        </View>
        <View style={styles.bottomContainer}>
            <Pressable style={styles.button} onPress={onHostsAdd}>
                <Text style={styles.buttonText}>Add</Text>
            </Pressable>
        </View>
    </View>
  );
};

export default AddHostsScreen;