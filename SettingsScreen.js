import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useAuth } from './AuthContext'; // Import the useAuth hook

const SettingsScreen = ({ navigation }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentName, setCurrentName] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const { user } = useAuth(); // Access the user from context

    useEffect(() => {
        if (user && user.id) {
            fetchUserDetails(user.id);
        }
    }, [user]);

    const fetchUserDetails = async (userId) => {
        try {
            const response = await fetch(`http://192.168.239.73/etiket/get_user_details.php?id=${userId}`);
            const result = await response.json();

            if (result.success) {
                setCurrentName(result.user.name);
                setCurrentEmail(result.user.email);
            } else {
                Alert.alert('Error', result.message);
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while fetching user details.');
        }
    };

    const handleSave = async () => {
        try {
            const response = await fetch('http://192.168.239.73/etiket/update_profile.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: user.id, // Use the correct user ID from context
                    oldPassword,
                    newPassword,
                    confirmPassword,
                    name,
                    email,
                }),
            });

            const result = await response.json();

            if (result.success) {
                Alert.alert('Success', result.message);
                fetchUserDetails(user.id); // Refresh user details after saving
            } else {
                Alert.alert('Error', result.message);
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while updating your profile.');
        }
    };

    const isSaveButtonEnabled = () => {
        return name && email && oldPassword && newPassword && confirmPassword;
    };

    return (
        <View style={styles.container}>
            <Image source={require('./assets/images/avatar.png')} style={styles.profileImage} />

            <Text style={styles.infoText}>Current Name: {currentName}</Text>
            <Text style={styles.infoText}>Current Email: {currentEmail}</Text>

            <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#A9A9A9"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#A9A9A9"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Old Password"
                placeholderTextColor="#A9A9A9"
                secureTextEntry
                value={oldPassword}
                onChangeText={setOldPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="New Password"
                placeholderTextColor="#A9A9A9"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                placeholderTextColor="#A9A9A9"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: isSaveButtonEnabled() ? '#32CD32' : '#D3D3D3' }]}
                onPress={handleSave}
                disabled={!isSaveButtonEnabled()}
            >
                <Text style={styles.saveButtonText}>SAVE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.logoutButtonText}>LOGOUT</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 30,
    },
    infoText: {
        width: '100%',
        fontSize: 16,
        color: '#333',
        marginVertical: 5,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#D3D3D3',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: '#F5F5F5',
    },
    saveButton: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 10,
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    logoutButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#FF6347',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 10,
    },
    logoutButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SettingsScreen;
