import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useRecords } from './RecordsContext';

const SearchRecordsScreen = () => {
  const { records } = useRecords();
  const [filteredRecords, setFilteredRecords] = useState(records);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowerCaseQuery = query.toLowerCase();
    const filtered = records.filter(
      (item) =>
        item.driver_name.toLowerCase().includes(lowerCaseQuery) ||
        item.user_name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredRecords(filtered);
  };

  useEffect(() => {
    setFilteredRecords(records);
  }, [records]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Records</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by driver's name or officer name..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {/* Table for Displaying Records */}
      <ScrollView horizontal>
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeader, styles.cellMedium]}>TMO ID</Text>
            <Text style={[styles.tableHeader, styles.cellMedium]}>Officer Name</Text>
            <Text style={[styles.tableHeader, styles.cellMedium]}>Driver Name</Text>
            <Text style={[styles.tableHeader, styles.cellMedium]}>License No</Text>
            <Text style={[styles.tableHeader, styles.cellMedium]}>Violation Date</Text>
          </View>

          {/* Table Rows */}
          {filteredRecords.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.cellMedium]}>{item.user_tmoid}</Text>
              <Text style={[styles.tableCell, styles.cellMedium]}>{item.user_name}</Text>
              <Text style={[styles.tableCell, styles.cellMedium]}>{item.driver_name}</Text>
              <Text style={[styles.tableCell, styles.cellMedium]}>{item.license_no}</Text>
              <Text style={[styles.tableCell, styles.cellMedium]}>{item.violation_date}</Text>
            </View>
          ))}

          {filteredRecords.length === 0 && (
            <Text style={styles.noDataText}>No records match your search.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  tableHeader: {
    fontWeight: 'bold',
    backgroundColor: '#f1f1f1',
    textAlign: 'center',
    color: '#333',
  },
  tableCell: {
    textAlign: 'center',
    color: '#555',
  },
  cellLarge: {
    width: 150,
  },
  cellMedium: {
    width: 120,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
    marginTop: 10,
  },
});

export default SearchRecordsScreen;
