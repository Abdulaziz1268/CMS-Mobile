import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';  // Corrected import
import axios from 'axios';

const ComplaintList = () => {

  const [data, setData] = useState([]);  // Corrected initial state

    useEffect(() => {
        axios.get('https://cms-hwdq.onrender.com/complaintList')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);  // Added error handling
            });
    }, []);

  return (
    <View style={styles.complaintContainer}>
      <Text style={styles.header} >Complaint List</Text>
      <FlatList 
        keyExtractor={item => item._id}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItems} >
            <Text style={styles.item} >Department : {item.department}</Text>
            <Text style={styles.item} >Severity : {item.severity}</Text>
            <Text style={styles.item} >Description : {item.description}</Text>
          </TouchableOpacity>
        )} 
      />
    </View>
  )
}

export default ComplaintList;


const styles = StyleSheet.create({
  complaintContainer: {
    // marginTop: 30,
    height: 'auto',
    width: 'auto',
    padding: 10,
    paddingBottom: 70
  },
  header: {
    textAlign: 'center',
    marginVertical: 15,
    fontSize: 30,
    color: '#005ccc'
  },
  listItems: {
    padding: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'lightgray',
    marginVertical: 5,
    marginHorizontal: 5,
    textAlign: 'center',
    backgroundColor: '#005ccc'
  },
  item: {
    marginBottom: 5,
    color: 'white'
  }
})