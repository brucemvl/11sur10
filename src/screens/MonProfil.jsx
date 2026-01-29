import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';

export default function MonProfil() {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [avatar, setAvatar] = useState(null);

  const getToken = async () => {
    return await AsyncStorage.getItem('jwtToken');
  };

  /* 🔤 USERNAME */
  const updateUsername = async () => {
    if (!username) return Alert.alert('Erreur', 'Username requis');

    try {
      const token = await getToken();
      await axios.put(
        'https://one1sur10.onrender.com/api/profile/username',
        { username },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert('✅ Succès', 'Username mis à jour');
      setUsername('');
    } catch (err) {
      Alert.alert(
        'Erreur',
        err.response?.data?.error || 'Impossible de modifier'
      );
    }
  };

  /* 🔐 PASSWORD */
  const updatePassword = async () => {
    if (!oldPassword || !newPassword) {
      return Alert.alert('Erreur', 'Tous les champs sont requis');
    }

    try {
      const token = await getToken();
      await axios.put(
        'https://one1sur10.onrender.com/api/profile/password',
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert('✅ Succès', 'Mot de passe modifié');
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      Alert.alert(
        'Erreur',
        err.response?.data?.error || 'Erreur modification mot de passe'
      );
    }
  };

  // AVATAR 

  const pickAvatar = async () => {
  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    Alert.alert(
      'Permission refusée',
      'Accès à la galerie requis'
    );
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });

  if (result.canceled) return;

  try {
    const token = await getToken();
    const uri = result.assets[0].uri;

    const formData = new FormData();
    formData.append('avatar', {
      uri,
      name: 'avatar.jpg',
      type: 'image/jpeg',
    });

    const res = await axios.post(
      'https://one1sur10.onrender.com/api/profile/avatar',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    setAvatar(res.data.avatar);
    Alert.alert('✅ Succès', 'Avatar mis à jour');
  } catch (err) {
    console.error(err);
    Alert.alert(
      'Erreur',
      err.response?.data?.error || 'Upload impossible'
    );
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Mon profil</Text>

      {/* USERNAME */}
      <Text style={styles.section}>Changer le username</Text>
      <TextInput
        style={styles.input}
        placeholder="Nouveau username"
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity style={styles.button} onPress={updateUsername}>
        <Text style={styles.buttonText}>Modifier</Text>
      </TouchableOpacity>

      {/* PASSWORD */}
      <Text style={styles.section}>Changer le mot de passe</Text>
      <TextInput
        style={styles.input}
        placeholder="Ancien mot de passe"
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Nouveau mot de passe"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#2563eb' }]}
        onPress={updatePassword}
      >
        <Text style={styles.buttonText}>Changer le mot de passe</Text>
      </TouchableOpacity>

      {/* AVATAR (placeholder UI) */}
      <Text style={styles.section}>Avatar</Text>

<TouchableOpacity style={styles.avatarButton} onPress={pickAvatar}>
  {avatar ? (
    <Image
  source={{ uri: `https://one1sur10.onrender.com${user.avatar}` }}
  style={styles.avatar}
/>
  ) : (
    <Text>📷 Choisir une photo</Text>
  )}
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f4f6',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginTop: 25,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#22c55e',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  avatarButton: {
    marginTop: 10,
    backgroundColor: '#e5e7eb',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  avatar: {
  width: 100,
  height: 100,
  borderRadius: 50,
},
});