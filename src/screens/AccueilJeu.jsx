import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert, // ✅ IMPORT MANQUANT
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ClassementJeu from "../components/ClassementJeu"

export default function AccueilJeu() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [openClassement, setOpenClassement] = useState(false)

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    const loadUser = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) setUsername(storedUsername);
    };

    loadUser();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // 🔹 Déconnexion
  const handleLogout = async () => {
    Alert.alert(
      'Déconnexion',
      'Voulez-vous vraiment vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Se déconnecter',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.multiRemove([
              'jwtToken',
              'userId',
              'username',
            ]);

            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }], // ✅ retour Home
            });
          },
        },
      ]
    );
  };

  const openclassement = ()=>{
    setOpenClassement(!openClassement)
  }
  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: translateAnim }],
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Text style={styles.title}>⚽ 11 sur 10</Text>

        <Text style={styles.welcome}>Bienvenue dans le jeu</Text>
        {username ? <Text style={styles.username}>{username}</Text> : null}

        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate('Jeu')}
        >
          <Text style={styles.buttonText}>🎮 Lancer une partie</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate('MonProfil')}
        >
          <Text style={styles.buttonSecondaryText}>👤 Mon profil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={openclassement}
        >
          <Text style={styles.buttonText}>Classement</Text>
        </TouchableOpacity>

        {/* 🔴 Déconnexion */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        {openclassement && <ClassementJeu />}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  welcome: {
    fontSize: 18,
    color: '#cbd5e1',
    marginTop: 10,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#22c55e',
    marginBottom: 40,
    marginTop: 5,
  },
  buttonPrimary: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    backgroundColor: '#1e293b',
    paddingVertical: 14,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonSecondaryText: {
    color: '#e5e7eb',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 10,
    paddingVertical: 12,
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: 'bold',
  },
});