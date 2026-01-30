import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Alert,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ClassementJeu from "../components/ClassementJeu";
import axios from 'axios';

export default function AccueilJeu() {
  const [user, setUser] = useState(null);
  const [openClassement, setOpenClassement] = useState(false);
  const navigation = useNavigation();

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(30)).current;

  // 🔹 Fonction UNIQUE pour charger le user
  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const res = await axios.get(
        'https://one1sur10.onrender.com/api/profile/me',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(res.data);
    } catch (err) {
      console.error('Erreur récupération user:', err);
    }
  };

  // 🔹 Chargement initial
  useEffect(() => {
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

  // 🔥 Recharge à CHAQUE retour sur l’écran (bouton précédent inclus)
  useFocusEffect(
    useCallback(() => {
      loadUser();
    }, [])
  );

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
            await AsyncStorage.multiRemove(['jwtToken', 'userId']);
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          },
        },
      ]
    );
  };

  if (!user) return <Text>Chargement...</Text>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{justifyContent: "center"}}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: translateAnim }],
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Text style={styles.title}>PRONOS PDC 14</Text>

<Text style={styles.welcome}>Bienvenue dans le jeu</Text>
        <Text style={styles.username}>{user.username}</Text>

        <Image
          source={{ uri: user.avatar }}
          style={styles.topAvatar}
        />

        <Text style={styles.points}>{user.points} pts</Text>


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
          onPress={() => setOpenClassement(!openClassement)}
        >
          <Text style={styles.buttonText}>Classement</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        {openClassement && <ClassementJeu />}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    paddingBlock: 40,
    paddingInline: 20
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0c1c6a',
    marginBottom: 10,
    fontFamily: "Kanitalik"
  },
  welcome: {
    fontSize: 18,
    color: '#132741',
    marginTop: 10,
    fontFamily: "Kanito"
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0e3672',
    marginBottom: 15,
    marginTop: 5,
    fontFamily: "Bangers",
    paddingInline: 5
  },
  buttonPrimary: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 15,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: "Kanito"
  },
  buttonSecondary: {
    backgroundColor: '#1e293b',
    paddingVertical: 14,
    borderRadius: 14,
    width: '90%',
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
  topAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 5,
    resizeMode: "contain"
  },
  points: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#c59e00', // doré
  fontFamily: "Kanitt",
  marginBottom: 30
},
});