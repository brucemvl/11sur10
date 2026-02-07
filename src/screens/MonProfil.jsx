import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import Precedent from '../components/Precedent';

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

      Alert.alert('✅ Succès', 'Pseudo mis à jour');
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
  try {
    // 1️⃣ Demander la permission
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return Alert.alert('Permission refusée', 'Accès à la galerie requis');
    }

    // 2️⃣ Ouvrir la galerie
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (result.canceled) return;

    let uri = result.assets[0].uri;

    // 3️⃣ Sur iOS, enlever le "file://"
    if (uri.startsWith('file://')) {
      uri = uri.replace('file://', '');
    }

    // 4️⃣ Préparer le FormData
    const formData = new FormData();
    formData.append('avatar', {
      uri,
      name: `avatar.jpg`, // tu peux mettre un nom unique si tu veux
      type: 'image/jpeg',
    });

    // 5️⃣ Récupérer le token
    const token = await AsyncStorage.getItem('jwtToken');

    // 6️⃣ Envoyer au backend avec fetch (plus fiable pour Expo)
    const response = await fetch(
  'https://one1sur10.onrender.com/api/profile/avatar',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      // 🔥 PAS DE 'Content-Type' ici, fetch le gère automatiquement pour FormData
    },
    body: formData,
  }
);

if (!response.ok) {
  const text = await response.text(); // pour debug
  console.error('Erreur upload avatar :', text);
  throw new Error('Impossible de charger l’avatar');
}

const data = await response.json(); // maintenant ça devrait marcher

    // 7️⃣ Mettre à jour l'avatar affiché
    await AsyncStorage.setItem('avatar', data.avatar);
    setAvatar(data.avatar);

    Alert.alert('✅ Succès', 'Avatar mis à jour');
  } catch (err) {
    console.error(err);
    Alert.alert('Erreur', err.message || 'Impossible de charger l’avatar');
  }
};

const removeAvatar = async () => {
  Alert.alert(
    'Supprimer l’avatar',
    'Revenir à l’avatar par défaut ?',
    [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('jwtToken');

            await axios.delete(
              'https://one1sur10.onrender.com/api/profile/avatar',
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            // reset local
            await AsyncStorage.removeItem('avatar');
            setAvatar(null);

            Alert.alert('✅ Succès', 'Avatar supprimé');
          } catch (err) {
            Alert.alert('Erreur', 'Impossible de supprimer l’avatar');
          }
        },
      },
    ]
  );
};

  return (
    <View  style={styles.container}>
        <Precedent />
            <ScrollView contentContainerStyle={{paddingBottom: 100, paddingInline: 20, paddingTop: 20}}>

      <Text style={styles.title}>👤 Mon profil</Text>

      {/* USERNAME */}
      <View style={styles.bloc}>
      <Text style={styles.section}>Changer le pseudo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nouveau pseudo"
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity style={styles.button} onPress={updateUsername}>
        <Text style={styles.buttonText}>Modifier</Text>
      </TouchableOpacity>
      </View>

      {/* PASSWORD */}
            <View style={styles.bloc}>

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
      </View>

      {/* AVATAR (placeholder UI) */}
            <View style={styles.bloc}>

      <Text style={styles.section}>Avatar</Text>

<TouchableOpacity style={styles.avatarButton} onPress={pickAvatar}>
  {avatar ? (
    <Image
  source={{ uri: `https://one1sur10.onrender.com${avatar}` }}
  style={styles.avatar}
/>
  ) : (
    <Text style={{fontFamily: "Kanitus"}}>📷 Choisir une photo</Text>
  )}
</TouchableOpacity>
  <TouchableOpacity
    style={styles.deleteAvatar}
    onPress={removeAvatar}
  >
    <Text style={styles.deleteText}>Supprimer la photo</Text>
  </TouchableOpacity>
</View>
</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#f3f4f6',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    marginTop: 50,
    fontFamily: "Kanitt"
  },
  bloc: {
backgroundColor: "#abd8e7",
padding: 10,
borderRadius: 10,
marginBlock: 8
  },
  section: {
    marginTop: 15,
    marginBottom: 8,
    fontFamily: "Kanito"
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#22c55e',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: "Kanito"
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
deleteAvatar: {
  marginTop: 10,
  backgroundColor: '#d92a2a',
  padding: 10,
  borderRadius: 10,
  alignItems: 'center',
},
deleteText: {
  color: '#ffffff',
  fontFamily: 'Kanito',
},
});