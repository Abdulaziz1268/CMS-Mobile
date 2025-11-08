import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';  // Corrected import
import axios from 'axios';
import moment from 'moment'

const ComplaintList = () => {

  const [data, setData] = useState([]);  // Corrected initial state

    useEffect(() => {
        axios.get('https://cms-hwdq.onrender.com/complaintList')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);  
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
            <Text style={styles.item} >Solution : {item.solution}</Text>
            <Text style={styles.dateItem} >{moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</Text>

          </TouchableOpacity>
        )} 
      />
    </View>
  )
}

export default ComplaintList;


const styles = StyleSheet.create({
  complaintContainer: {
    marginTop: 30,
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
    backgroundColor: 'white',
    elevation: 7,
    shadowColor: '#005ccc',
    // shadowOffset: {width: 0, height: 5},
    // shadowOpacity: 0.9,
    // shadowRadius: 10
  },
  item: {
    marginBottom: 5,
    // color: 'white'
  },
  dateItem: {
    marginBottom: 5,
    color: '#005ccc',
    fontSize: 12
  }
})