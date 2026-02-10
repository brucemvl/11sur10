import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import getAvatarSource from '../../backend/utils/getAvatarSource';
import { useFonts } from "expo-font";


export default function AccueilJeu() {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
      "Kanitblack": require("../assets/fonts/Kanit/Kanit-Black.ttf"), 
      "Bangers": require("../assets/fonts/Bangers/Bangers-Regular.ttf"), 
      "Kanitt": require("../assets/fonts/Kanit/Kanit-SemiBold.ttf"), 
      "Kanito": require("../assets/fonts/Kanit/Kanit-Medium.ttf"), 
      "Kanitus": require("../assets/fonts/Kanit/Kanit-Light.ttf"), 
      "Kanitalic": require("../assets/fonts/Kanit/Kanit-MediumItalic.ttf"), 
      "Kanitalik": require("../assets/fonts/Kanit/Kanit-ExtraBoldItalic.ttf"), 
      "Permanent": require("../assets/fonts/Permanent_Marker/PermanentMarker-Regular.ttf"), 
      "Carter": require("../assets/fonts/Carter_One/CarterOne-Regular.ttf"), 
      "Londrina": require("../assets/fonts/Londrina/LondrinaSolid-Light.ttf"), 
      "Londrinak": require("../assets/fonts/Londrina/LondrinaSolid-Regular.ttf"), 
      "Bella": require("../assets/fonts/Bella/Belanosima-Regular.ttf"), 
      "Bellak": require("../assets/fonts/Bella/Belanosima-Bold.ttf"),
    });

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(30)).current;

  // 🔹 Fonction pour nettoyer le cache et recharger l'utilisateur
  const refreshUser = async () => {
    try {
      await AsyncStorage.removeItem('userCache');
      console.log('✅ Cache utilisateur supprimé');

      const token = await AsyncStorage.getItem('jwtToken');
      const res = await axios.get(
        'https://one1sur10.onrender.com/api/profile/me',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('USER rafraîchi:', res.data);
      setUser(res.data);
      // Sauvegarde locale optionnelle
      await AsyncStorage.setItem('userCache', JSON.stringify(res.data));
    } catch (err) {
      console.error('❌ Erreur rafraîchissement user:', err);
    }
  };

  // 🔹 Chargement initial
  useEffect(() => {
    refreshUser();

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

  // 🔥 Recharge à CHAQUE retour sur l’écran
  useFocusEffect(
    useCallback(() => {
      refreshUser();
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
            await AsyncStorage.multiRemove(['jwtToken', 'userId', 'userCache']);
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          },
        },
      ]
    );
  };
if (!fontsLoaded) return null;
  if (!user) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center' }}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: translateAnim }],
          width: '100%',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate('MonProfil')}
        >
          <Text style={styles.buttonSecondaryText}>👤 Mon profil</Text>
        </TouchableOpacity>

        <Text style={styles.title}>PRONOS PDC 14</Text>
        <Text style={styles.welcome}>Bienvenue dans le jeu</Text>
        <Text style={styles.username}>{user.username}</Text>

<Image
          source={getAvatarSource(user.avatar)}
          style={styles.topAvatar}
          defaultSource={require('../../backend/uploads/avatars/facteur.jpg')} // iOS fallback
        />
        <Text style={styles.points}>{user.points} pts</Text>


        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate('Jeu')}
        >
          <Text style={styles.buttonText}>Jouer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate('ClassementJeu')}
        >
          <Text style={styles.buttonText}>Classement</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate('HistoriquePronos')}
        >
          <Text style={styles.buttonText}>Mes pronos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f3f3', paddingTop: 10, paddingHorizontal: 20 },
  title: { fontSize: 36, fontWeight: 'bold', color: '#0c1c6a', marginBottom: 10, fontFamily: 'Kanitalik' },
  welcome: { fontSize: 18, color: '#132741', marginTop: 10, fontFamily: 'Kanito' },
  username: { fontSize: 22, fontWeight: 'bold', color: '#0e3672', marginBottom: 15, marginTop: 5, fontFamily: 'Bangers', paddingHorizontal: 5 },
  buttonPrimary: { backgroundColor: '#22c55e', paddingVertical: 12, borderRadius: 14, marginBottom: 15, width: '90%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', fontFamily: 'Kanito' },
  buttonSecondary: { backgroundColor: '#1e293b', paddingVertical: 8, borderRadius: 12, width: '20%', alignItems: 'center', marginBottom: 10, alignSelf: 'flex-end' },
  buttonSecondaryText: { color: '#e5e7eb', fontSize: 10, fontFamily: 'Kanitus' },
  logoutButton: { paddingVertical: 12 },
  logoutText: { color: '#ef4444', fontSize: 14, fontFamily: 'Kanito' },
  topAvatar: { width: 100, height: 100, borderRadius: 50, marginVertical: 5, resizeMode: 'cover' },
  points: { fontSize: 18, fontWeight: 'bold', color: '#c59e00', fontFamily: 'Kanitt', marginBottom: 10 },
  statsContainer: { marginBottom: 20 },
  statText: { fontSize: 16, color: '#0c1c6a', fontFamily: 'Kanito', marginVertical: 2 }
});