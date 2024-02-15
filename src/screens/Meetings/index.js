import React from 'react';
import styles from './styles';
import { View, TouchableOpacity, Text } from 'react-native';

const MeetingsScreen = props => {

  return (
    <View style={styles.container}>
        <View style={styles.bottom}>
            <TouchableOpacity
                style={styles.button}
                onPress={ () => console.log('Meeting Added!')}>
                <Text style={styles.buttonText}>Add Meeting</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default MeetingsScreen;