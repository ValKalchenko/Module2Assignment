import React, { useState, useEffect } from 'react';
import styles from './styles';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Host from '../../components/Host';

// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// use hook to create database
const mySchedulerDB = openDatabase({name: 'MyScheduler.db'});
const hostsTableName = 'hosts';

const HostsScreen = props => {

  const navigation = useNavigation();

  const [hosts, setHosts] = useState([]);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      // declare empty array that will store results of SELECT
      let results = [];
      // declare transaction that will execute SELECT
      mySchedulerDB.transaction(txn => {
        // execute SELECT
        txn.executeSql(
          `SELECT * FROM ${hostsTableName}`,
          [],
          // callback function to handle results from SELECT
          (_, res) => {
            // get the number of rows selected 
            let len = res.rows.length;
            console.log('Number of rows: ' + len);
            

            // if more than one row of data was selected
            if ( len > 0){
              // loop through the rows of data
              for (let i = 0; i < len; i++){
                // push a row of data at a time onto results array
                let item = res.rows.item(i);

                results.push({
                  id: item.id,
                  fullname: item.fullname,
                  email: item.email,
                });
              }
              // assign results array to lists state variable
              setHosts(results);
            } else {
              // if no rows of data were selected
              // assign empty array to lists state variable
              setHosts([]);
            }
          },
          error => {
            console.log('Error getting lists ' + error.message);
          },
        )
      });
    });
    return listener;
  });

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={hosts}
          renderItem={({item}) => <Host post={item} />}
        />
      </View>
        <View style={styles.bottom}>
            <TouchableOpacity
                style={styles.button}
                onPress={ () => navigation.navigate('Add Host')}>
                <Text style={styles.buttonText}>Add Host</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default HostsScreen;