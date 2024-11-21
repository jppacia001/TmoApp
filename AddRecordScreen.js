import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Button,
    StyleSheet,
    Alert,
    Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import TextRecognition from 'react-native-text-recognition';
import Constants from 'expo-constants';

const AddRecordScreen = ({ navigation }) => {
    const [driverName, setDriverName] = useState('');
    const [address, setAddress] = useState('');
    const [licenseNo, setLicenseNo] = useState('');
    const [licenseExpiryDate, setLicenseExpiryDate] = useState(new Date());
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [remarks, setRemarks] = useState('');
    const [violationType, setViolationType] = useState('');
    const [violationDate, setViolationDate] = useState(new Date());
    const [violationPlace, setViolationPlace] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [ocrResult, setOcrResult] = useState('');

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [currentDatePicker, setCurrentDatePicker] = useState('');
    const [datePickerMode, setDatePickerMode] = useState('date');

    const handleDatePicker = (field) => {
        setCurrentDatePicker(field);
        setShowDatePicker(true);
    };

    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            if (currentDatePicker === 'licenseExpiryDate') setLicenseExpiryDate(selectedDate);
            else if (currentDatePicker === 'dateOfBirth') setDateOfBirth(selectedDate);
            else if (currentDatePicker === 'violationDate') setViolationDate(selectedDate);
        }
    };

    const captureImage = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Camera access is required to capture images.');
            return;
        }

        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                quality: 1,
            });

            if (!result.cancelled) {
                const uri = result.uri;
                setImageUri(uri);
                performOcr(uri);
            } else {
                Alert.alert('Cancelled', 'Image capture was cancelled.');
            }
        } catch (error) {
            console.error('Error capturing image:', error);
            Alert.alert('Error', 'Failed to capture image.');
        }
    };

    const performOcr = async (imageUri) => {
        try {
            const recognizedText = await TextRecognition.recognize(imageUri);
            setOcrResult(recognizedText.join(' '));
        } catch (error) {
            console.error('Error with OCR:', error);
            Alert.alert('Error', 'Failed to perform OCR.');
        }
    };

    const validateForm = () => {
        if (!driverName.trim()) return 'Driver Name is required.';
        if (!address.trim()) return 'Address is required.';
        if (!licenseNo.trim()) return 'License Number is required.';
        if (!violationType.trim()) return 'Violation Type is required.';
        if (!violationPlace.trim()) return 'Violation Place is required.';
        if (!imageUri) return 'An image is required. Please capture one.';
        return null;
    };

    const handleAddRecord = () => {
        const errorMessage = validateForm();
        if (errorMessage) {
            Alert.alert('Validation Error', errorMessage);
            return;
        }

        Alert.alert('Success', 'Record has been added successfully.');
        // Add your logic here to save the record or navigate
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Add Traffic Violation Record</Text>

            {/* Driver Name */}
            <View style={styles.fieldGroup}>
                <Text style={styles.label}>Driver Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter driver's name"
                    value={driverName}
                    onChangeText={setDriverName}
                />
            </View>

            {/* Address */}
            <View style={styles.fieldGroup}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter address"
                    value={address}
                    onChangeText={setAddress}
                />
            </View>

            {/* License Number */}
            <View style={styles.fieldGroup}>
                <Text style={styles.label}>License Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter license number"
                    value={licenseNo}
                    onChangeText={setLicenseNo}
                />
            </View>

            {/* License Expiry Date */}
            <View style={styles.fieldGroup}>
                <Text style={styles.label}>License Expiry Date</Text>
                <Button
                    title={licenseExpiryDate.toDateString()}
                    onPress={() => handleDatePicker('licenseExpiryDate')}
                />
            </View>

            {/* Date of Birth */}
            <View style={styles.fieldGroup}>
                <Text style={styles.label}>Date of Birth</Text>
                <Button
                    title={dateOfBirth.toDateString()}
                    onPress={() => handleDatePicker('dateOfBirth')}
                />
            </View>

            {/* Remarks */}
            <View style={styles.fieldGroup}>
                <Text style={styles.label}>Remarks</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter remarks"
                    value={remarks}
                    onChangeText={setRemarks}
                />
            </View>

            {/* Violation Type */}
            <View style={styles.fieldGroup}>
                <Text style={styles.label}>Violation Type</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter violation type"
                    value={violationType}
                    onChangeText={setViolationType}
                />
            </View>

            {/* Violation Date */}
            <View style={styles.fieldGroup}>
                <Text style={styles.label}>Violation Date</Text>
                <Button
                    title={violationDate.toDateString()}
                    onPress={() => handleDatePicker('violationDate')}
                />
            </View>

            {/* Violation Place */}
            <View style={styles.fieldGroup}>
                <Text style={styles.label}>Violation Place</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter violation place"
                    value={violationPlace}
                    onChangeText={setViolationPlace}
                />
            </View>

            {/* Image Capture */}
            <View style={styles.fieldGroup}>
                <Button title="Capture Image for OCR" onPress={captureImage} />
                {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
                {ocrResult ? (
                    <View style={styles.ocrResultContainer}>
                        <Text style={styles.label}>OCR Result:</Text>
                        <Text>{ocrResult}</Text>
                    </View>
                ) : null}
            </View>

            {/* Add Record Button */}
            <Button title="Add Record" onPress={handleAddRecord} />

            {/* Date/Time Picker */}
            {showDatePicker && (
                <DateTimePicker
                    value={
                        currentDatePicker === 'licenseExpiryDate'
                            ? licenseExpiryDate
                            : currentDatePicker === 'dateOfBirth'
                            ? dateOfBirth
                            : violationDate
                    }
                    mode={datePickerMode}
                    display="default"
                    onChange={onChangeDate}
                />
            )}
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
    image: {
        width: '100%',
        height: 200,
        marginTop: 10,
        borderRadius: 8,
    },
    ocrResultContainer: {
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
});

export default AddRecordScreen;
