// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// use hook to create database
const mySchedulerDB = openDatabase({name: 'MyScheduler.db'});
const hostsTableName = 'hosts';

module.exports = {
    // declare function that will create the contacts table
    createContactsTable: async function () {
        // declare a transaction that will execute a SQL statement
        (await mySchedulerDB).transaction(txn => {
            // execute the SQL
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${hostsTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    fullname TEXT,
                    email TEXT
                );`,
                // arguments needed when using an SQL prepared statement
                [],
                // callback function to handle results of SQL query
                () => {
                    console.log('Hosts table created successfully');
                },
                error => {
                    console.log('Error creating hosts table ' + error.message);
                },
            );
        });
    },

    // declare function that will insert a row into the contacts table
    addHosts: async function (fullname, email) {
        // declare a transaction that will execute an SQL statement
        (await mySchedulerDB).transaction(txn => {
            // execute the SQL
            txn.executeSql(
                `INSERT INTO ${hostsTableName} (fullname, email) VALUES ("${fullname}", "${email}")`,
                // arguments passed when using SQL prepared statements
                [],
                // callback function to handle results of SQL query
                () => {
                    console.log(fullname + " added successfully");
                },
                error => {
                    console.log('Error adding contact ' + error.message);
                },
            );
        });
    },
};