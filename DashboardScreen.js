import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { useRecords } from './RecordsContext';

const DashboardScreen = () => {
  const { records, setAllRecords } = useRecords();
  const [violationsPerType, setViolationsPerType] = useState([]);
  const [violationsPerLocation, setViolationsPerLocation] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch('http://192.168.239.73/etiket/get_records.php');
        const data = await response.json();
        if (Array.isArray(data)) {
          setAllRecords(data);
          processChartData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const processChartData = (data) => {
      // Calculate violations per type
      const typeCounts = {};
      const locationCounts = {};

      data.forEach((item) => {
        if (item.violation_type) {
          typeCounts[item.violation_type] = (typeCounts[item.violation_type] || 0) + 1;
        }
        if (item.location) {
          locationCounts[item.location] = (locationCounts[item.location] || 0) + 1;
        }
      });

      setViolationsPerType(
        Object.keys(typeCounts).map((key) => ({
          name: key,
          count: typeCounts[key],
          color: getRandomColor(),
          legendFontColor: '#333',
          legendFontSize: 12,
        }))
      );

      setViolationsPerLocation(Object.keys(locationCounts).map((key) => ({
        location: key,
        count: locationCounts[key],
      })));
    };

    fetchRecords();
  }, [setAllRecords]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      {records.length > 0 ? (
        <>
          {/* Pie Chart for Violations Per Type */}
          <Text style={styles.chartTitle}>Violations by Type</Text>
          <PieChart
            data={violationsPerType}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="count"
            backgroundColor="transparent"
            paddingLeft="15"
            center={[10, 0]}
          />

          {/* Bar Chart for Violations Per Location */}
          <Text style={styles.chartTitle}>Violations by Location</Text>
          <BarChart
            data={{
              labels: violationsPerLocation.map((item) => item.location),
              datasets: [
                {
                  data: violationsPerLocation.map((item) => item.count),
                },
              ],
            }}
            width={Dimensions.get('window').width - 40}
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            verticalLabelRotation={30}
          />
        </>
      ) : (
        <Text style={styles.noDataText}>No records available.</Text>
      )}
    </ScrollView>
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
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#555',
  },
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#999',
  },
});

export default DashboardScreen;
