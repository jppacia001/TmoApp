import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    StyleSheet,
    ScrollView
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const AccidentReportScreen = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [marker, setMarker] = useState(null);

    // Fetch current location of the user
    const fetchUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Location access is required to show the map.');
            return;
        }

        let userLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = userLocation.coords;
        setLocation({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
        setMarker({ latitude, longitude });
    };

    // Handle the map press to add a marker
    const handleMapPress = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setMarker({ latitude, longitude });
        setAddress(''); // Clear address if manually selecting location
    };

    // Search for a location by address using Nominatim API (OSM)
    const searchLocation = async () => {
        if (!address.trim()) {
            Alert.alert('Error', 'Please enter an address to search.');
            return;
        }

        try {
            console.log(`Searching for address: ${address}`);

            // Add a User-Agent header to prevent Nominatim from rejecting the request
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=json&addressdetails=1`, {
                headers: {
                    'User-Agent': 'AccidentReportApp/1.0'  // You can change this to any string
                }
            });

            const data = await response.json();

            console.log("Nominatim response:", data);  // Check the response structure

            if (data.length > 0) {
                const { lat, lon } = data[0]; // Get the first result
                const newLocation = {
                    latitude: parseFloat(lat),
                    longitude: parseFloat(lon),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                };
                setLocation(newLocation);  // Update the map region
                setMarker({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
            } else {
                Alert.alert('No results', 'Location not found.');
            }
        } catch (error) {
            console.error("Error:", error);
            Alert.alert('Error', 'Failed to fetch location.');
        }
    };

    const handleReportSubmit = () => {
        if (!marker || !description.trim()) {
            Alert.alert('Validation Error', 'Please select a location and provide a description.');
            return;
        }

        const payload = {
            location: `${marker.latitude}, ${marker.longitude}`, // Format location as latitude,longitude
            address,
            description,
        };

        // Make a POST request to your XAMPP server
        fetch('http://192.168.239.73/etiket/submit_report.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'success') {
                    Alert.alert('Success', 'Accident report submitted successfully.');
                    navigation.goBack(); // Navigate back to the previous screen
                } else {
                    Alert.alert('Error', data.message);
                }
            })
            .catch((error) => {
                console.error('Error submitting report:', error);
                Alert.alert('Error', 'Failed to submit the report.');
            });
    };

    useEffect(() => {
        fetchUserLocation(); // Fetch the user's location when the screen loads
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Accident Report</Text>

            {/* Map Section */}
            <View style={styles.mapContainer}>
                {location ? (
                    <MapView
                        style={styles.map}
                        region={location}  // Dynamically update region
                        onPress={handleMapPress} // Handle the map press event to set the marker
                    >
                        {marker && <Marker coordinate={marker} title="Selected Location" />}
                    </MapView>
                ) : (
                    <Text>Loading map...</Text>
                )}
            </View>

            {/* Address Input */}
            <View style={styles.fieldGroup}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter address to search"
                    value={address}
                    onChangeText={setAddress}
                />
                <Button title="Search Location" onPress={searchLocation} />
            </View>

            {/* Description Input */}
            <View style={styles.fieldGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Describe the accident"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />
            </View>

            {/* Submit Button */}
            <Button title="Submit Report" onPress={handleReportSubmit} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    mapContainer: {
        height: 300,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    map: {
        flex: 1,
    },
    fieldGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
    },
});

export default AccidentReportScreen;
