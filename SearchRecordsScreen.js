import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const SearchRecordsScreen = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch('http:///192.168.236.73/etiket/fetch_records.php')
      .then(response => response.json())
      .then(data => setRecords(data))
      .catch(error => console.error('Error fetching records:', error));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Traffic Violation Records</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Violation</Text>
          <Text style={styles.headerCell}>Date</Text>
          <Text style={styles.headerCell}>Location</Text>
        </View>
        {records.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.violation_type}</Text>
            <Text style={styles.cell}>{item.date}</Text>
            <Text style={styles.cell}>{item.location}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#5d6063',
    padding: 10,
  },
  headerCell: {
    flex: 1,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    flexWrap: 'wrap',
    maxWidth: 100,  // Adjust as needed
  },
});

export default SearchRecordsScreen;
