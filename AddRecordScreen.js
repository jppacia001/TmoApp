import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { useAuth } from './AuthContext';
import MapView, { Marker } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';

const AddRecordScreen = ({ navigation }) => {
  const { user } = useAuth(); // Get logged-in user details

  // Initial form data
  const initialFormData = {
    driverName: '',
    address: '',
    licenseNo: '',
    licenseExpiryDate: null,
    dateOfBirth: null,
    remarks: '',
    violationType: '',
    violationDate: null,
    violationPlace: '',
    phoneNumber: '+639',  // Pre-fill with +639
    email: '',
    selectedLocation: null,
  };

  const [formData, setFormData] = useState(initialFormData); // Set initial state
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [showMap, setShowMap] = useState(false);

  // Function to handle license number input with formatting
  const handleLicenseNoChange = (text) => {
    // Remove non-alphanumeric characters
    let cleaned = text.replace(/[^a-zA-Z0-9]/g, '');

    // Ensure the first character is a letter
    if (cleaned.length > 0) {
      cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1).replace(/[^0-9]/g, '');
    }

    // Limit to a maximum of 11 characters (1 letter + 10 numbers)
    let formatted = cleaned.slice(0, 11);

    // Apply formatting
    if (formatted.length > 1 && formatted.length <= 3) {
      formatted = `${formatted.charAt(0)}${formatted.slice(1, 3)}`;
    }
    if (formatted.length > 3 && formatted.length <= 5) {
      formatted = `${formatted.charAt(0)}${formatted.slice(1, 3)}-${formatted.slice(3, 5)}`;
    }
    if (formatted.length > 5) {
      formatted = `${formatted.charAt(0)}${formatted.slice(1, 3)}-${formatted.slice(3, 5)}-${formatted.slice(5, 11)}`;
    }

    setFormData({ ...formData, licenseNo: formatted });
  };

  // Function to handle phone number input with +639 prefix
  const handlePhoneNumberChange = (text) => {
    // Ensure the phone number starts with '+639'
    if (text.startsWith('+639')) {
      // Allow only 9 digits after '+639'
      const formatted = '+639' + text.slice(4).replace(/[^0-9]/g, '').slice(0, 9);
      setFormData({ ...formData, phoneNumber: formatted });
    } else {
      // If user deletes the '+639' part, we reset it to '+639'
      setFormData({ ...formData, phoneNumber: '+639' });
    }
  };

  const validateForm = () => {
    if (!formData.driverName || !formData.address || !formData.licenseNo || !formData.violationType || !formData.violationPlace) {
      return 'Please fill in all required fields.';
    }
    if (!/^[A-Z]\d{2}-\d{2}-\d{6}$/.test(formData.licenseNo)) {
      return 'License number must follow the format D12-12-121212.';
    }
    if (formData.phoneNumber && !/^\+639\d{9}$/.test(formData.phoneNumber)) {  // Strictly +639 followed by 9 digits
      return 'Phone number must follow the format +639123456789.';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return 'Invalid email format.';
    }
    return '';
  };

  const handleAddRecord = async () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      Alert.alert('Validation Error', errorMessage);
      return;
    }

    const formatDate = (date) => {
      if (!date) return null;
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const newRecord = {
      user_id: user.id,
      driver_name: formData.driverName,
      address: formData.address,
      license_no: formData.licenseNo,
      license_expiry_date: formatDate(formData.licenseExpiryDate),
      date_of_birth: formatDate(formData.dateOfBirth),
      remarks: formData.remarks,
      violation_type: formData.violationType,
      violation_date: formatDate(formData.violationDate),
      violation_place: formData.violationPlace,
      violation_latitude: formData.selectedLocation?.latitude || null,
      violation_longitude: formData.selectedLocation?.longitude || null,
      phone_number: formData.phoneNumber,
      email: formData.email,
      time_of_submission: new Date().toISOString(),
    };

    try {
      const response = await axios.post('http://192.168.239.73/etiket/add_record.php', newRecord);
      if (response.data.success) {
        Alert.alert('Success', 'Record has been added successfully.');
        navigation.goBack();
        setFormData(initialFormData); // Clear all the fields after submitting
      } else {
        Alert.alert('Error', response.data.message || 'Failed to add record.');
      }
    } catch (error) {
      Alert.alert('Error', `Network error: ${error.message}`);
      console.error(error);
    }
  };

  const showDatePickerHandler = (type) => setShowDatePicker(type);

  const onDateChange = (event, selectedDate) => {
    if (showDatePicker === 'licenseExpiry') setFormData({ ...formData, licenseExpiryDate: selectedDate });
    if (showDatePicker === 'dateOfBirth') setFormData({ ...formData, dateOfBirth: selectedDate });
    if (showDatePicker === 'violationDate') setFormData({ ...formData, violationDate: selectedDate });
    setShowDatePicker(null);
  };

  const handleMapSelect = (event) => {
    const { coordinate } = event.nativeEvent;
    setFormData({
      ...formData,
      selectedLocation: coordinate,
      violationPlace: `Lat: ${coordinate.latitude}, Lon: ${coordinate.longitude}`,
    });
    setShowMap(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Record</Text>

      {/* Driver Name */}
      <TextInput
        style={styles.input}
        placeholder="Driver's Name"
        value={formData.driverName}
        onChangeText={(value) => setFormData({ ...formData, driverName: value })}
      />

      {/* Address */}
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={formData.address}
        onChangeText={(value) => setFormData({ ...formData, address: value })}
      />

      {/* License Number */}
      <TextInput
        style={styles.input}
        placeholder="License Number (D12-12-121212)"
        value={formData.licenseNo}
        onChangeText={handleLicenseNoChange}  // Call formatting function here
      />

      {/* License Expiry Date */}
      <TouchableOpacity style={styles.dateInput} onPress={() => showDatePickerHandler('licenseExpiry')}>
        <Text style={styles.dateText}>
          {formData.licenseExpiryDate
            ? `License Expiry: ${formData.licenseExpiryDate.toLocaleDateString()}`
            : 'Select License Expiry Date'}
        </Text>
      </TouchableOpacity>

      {/* Date of Birth */}
      <TouchableOpacity style={styles.dateInput} onPress={() => showDatePickerHandler('dateOfBirth')}>
        <Text style={styles.dateText}>
          {formData.dateOfBirth
            ? `Date of Birth: ${formData.dateOfBirth.toLocaleDateString()}`
            : 'Select Date of Birth'}
        </Text>
      </TouchableOpacity>

      {/* Violation Type */}
      <Picker
        selectedValue={formData.violationType}
        onValueChange={(value) => setFormData({ ...formData, violationType: value })}
      >
        <Picker.Item label="Select Violation Type" value="" />
        <Picker.Item label="Speeding" value="speeding" />
        <Picker.Item label="Parking" value="parking" />
      </Picker>

      {/* Violation Date */}
      <TouchableOpacity style={styles.dateInput} onPress={() => showDatePickerHandler('violationDate')}>
        <Text style={styles.dateText}>
          {formData.violationDate
            ? `Violation Date: ${formData.violationDate.toLocaleDateString()}`
            : 'Select Violation Date'}
        </Text>
      </TouchableOpacity>

      {/* Violation Place */}
      <TouchableOpacity style={styles.dateInput} onPress={() => setShowMap(true)}>
        <Text style={styles.dateText}>
          {formData.violationPlace || 'Select Violation Place on Map'}
        </Text>
      </TouchableOpacity>

      {showMap && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 14.5995,
            longitude: 120.9842,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={handleMapSelect}
        >
          {formData.selectedLocation && <Marker coordinate={formData.selectedLocation} />}
        </MapView>
      )}

      {/* Phone Number */}
      <TextInput
        style={styles.input}
        placeholder="Phone Number (+639123456789)"
        value={formData.phoneNumber}
        onChangeText={handlePhoneNumberChange}  // Apply formatting function
      />

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={formData.email}
        onChangeText={(value) => setFormData({ ...formData, email: value })}
      />

      {/* Remarks */}
      <TextInput
        style={styles.input}
        placeholder="Remarks"
        value={formData.remarks}
        onChangeText={(value) => setFormData({ ...formData, remarks: value })}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleAddRecord}>
        <Text style={styles.buttonText}>Add Record</Text>
      </TouchableOpacity>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={formData[showDatePicker] || new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: '#F5F5F5',
  },
  dateInput: {
    height: 50,
    justifyContent: 'center',
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: '#F5F5F5',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#008CBA',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  map: {
    height: 300,
    marginBottom: 15,
  },
});

export default AddRecordScreen;
