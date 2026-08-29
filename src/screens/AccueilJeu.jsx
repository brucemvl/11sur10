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
import cdm2026 from "../assets/logoucl.png"


export default function AccueilJeu() {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim2 = useRef(new Animated.Value(1)).current;
  const scaleAnim3 = useRef(new Animated.Value(1)).current;


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
      const token = await AsyncStorage.getItem('jwtToken');

      if (!token) {
        console.log("❌ Aucun token trouvé");
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        return;
      }

      const res = await axios.get(
        'https://one1sur10.onrender.com/api/profile/me',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('USER rafraîchi:', res.data);
      setUser(res.data);
      await AsyncStorage.setItem('userCache', JSON.stringify(res.data));

    } catch (err) {
      console.error('❌ Erreur rafraîchissement user:', err);

      if (err.response?.status === 401) {
        console.log("⚠️ Token expiré → déconnexion");
        await AsyncStorage.multiRemove(['jwtToken', 'userId', 'userCache']);
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      }
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} >
       <Animated.View style={[styles.page, { opacity: fadeAnim, transform: [{ translateY: translateAnim }], },]} >
         {/* HEADER */}
          <View style={styles.header}> 
            <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate("MonProfil")} activeOpacity={0.8} >
               <Text style={styles.profileIcon}>👤</Text>
                <Text style={styles.profileText}>Profil</Text>
                 </TouchableOpacity>
                  </View>
                   {/* HERO */} 
                  <View style={styles.heroCard}>
                     <Text style={styles.title}> PRONOS </Text> 
                     <Text style={styles.competitionTitle}> LIGUE DES CHAMPIONS </Text>
                        <Image source={cdm2026} style={styles.competitionLogo} />
                         <Text style={styles.heroSubtitle}>Pronostique les matchs.{"\n"}Grimpe au classement.</Text> 
                         </View>
                          {/* PLAYER CARD */}
                           <View style={styles.playerCard}> 
                            <View style={styles.playerInfo}> 
                              <Image source={getAvatarSource(user.avatar)} style={styles.topAvatar} defaultSource={require("../../backend/uploads/avatars/default-avatar.png")} />
                               <View style={styles.playerIdentity}>
                                  <Text style={styles.username}> {user.username} </Text> 
                                  <View style={styles.pointsBadge}> <Text style={styles.points}>
                                     {user.points} </Text> <Text style={styles.pointsLabel}> POINTS </Text>
                                      </View> 
                                      </View>
                                       </View>
                                        </View>

                                         {/* MAIN ACTION */}
                                          <TouchableOpacity 
                                          style={styles.playCard} 
                                          activeOpacity={0.85} 
                                          onPress={() => { Animated.sequence([Animated.timing(scaleAnim, { toValue: 0.96, duration: 100, useNativeDriver: true, }), Animated.timing(scaleAnim, { toValue: 1, duration: 120, useNativeDriver: true, }),]).start(); navigation.navigate("Jeu");
                                         }} >
                                           <Animated.View style={[styles.playInner, { transform: [{ scale: scaleAnim }], },]} >
                                             <View>
                                               <Text style={styles.playEyebrow}> PRÊT À JOUER ? </Text>
                                                <Text style={styles.playTitle}> Faire mes pronos </Text>
                                                 <Text style={styles.playSubtitle}> Choisis tes scores et gagne des points </Text>
                                                  </View>
                                                   <View style={styles.playArrow}> 
                                                    <Text style={styles.arrowText}>→</Text>
                                                     </View> </Animated.View> 
                                                     </TouchableOpacity>
                                                     
                                                      {/* SECONDARY ACTIONS */} <View style={styles.secondaryGrid}> <TouchableOpacity style={styles.menuCard} activeOpacity={0.8} onPress={() => { Animated.sequence([Animated.timing(scaleAnim2, { toValue: 0.96, duration: 100, useNativeDriver: true, }), Animated.timing(scaleAnim2, { toValue: 1, duration: 120, useNativeDriver: true, }),]).start(); navigation.navigate("ClassementJeu"); }} > <Animated.View style={[styles.menuCardInner, { transform: [{ scale: scaleAnim2 }], },]} > <Text style={styles.menuIcon}> 🏆 </Text> <Text style={styles.menuTitle}> Classement </Text> <Text style={styles.menuSubtitle}> Voir ma position </Text> </Animated.View> </TouchableOpacity> <TouchableOpacity style={styles.menuCard} activeOpacity={0.8} onPress={() => { Animated.sequence([Animated.timing(scaleAnim3, { toValue: 0.96, duration: 100, useNativeDriver: true, }), Animated.timing(scaleAnim3, { toValue: 1, duration: 120, useNativeDriver: true, }),]).start(); navigation.navigate("HistoriquePronos"); }} > <Animated.View style={[styles.menuCardInner, { transform: [{ scale: scaleAnim3 }], },]} > <Text style={styles.menuIcon}> 📋 </Text> <Text style={styles.menuTitle}> Mes pronos </Text> <Text style={styles.menuSubtitle}> Voir mon historique </Text> </Animated.View> </TouchableOpacity> </View> {/* SEPARATOR */} <View style={styles.separator} /> {/* LOGOUT */} <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.7} > <Text style={styles.logoutIcon}> ↪ </Text> <Text style={styles.logoutText}> Se déconnecter </Text> </TouchableOpacity> <Text style={styles.footer}> Bonne chance et que le meilleur pronostiqueur gagne 🏆 </Text> </Animated.View> </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f5f7",
    paddingBottom: 200
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 150,
  },

  page: {
    width: "100%",
    alignItems: "center",
  },
  /* ========================= HEADER ========================= */
  header: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 8,
  },

  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#172033",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },

  profileIcon: {
    fontSize: 13,
  },

  profileText: {
    color: "#fff",
    fontFamily: "Kanito",
    fontSize: 12,
  },

  /* ========================= HERO ========================= */
  heroCard: {
    width: "100%",
    backgroundColor: "#101827",
    borderRadius: 28,
    paddingTop: 24,
    paddingBottom: 22,
    paddingHorizontal: 20,
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8, },
    elevation: 7,
  },

  

  competitionLabel: {
    color: "#c59e00",
    fontFamily: "Kanitt",
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 3,
  },

  title: {
    fontFamily: "Kanitalik",
    color: "#fff",
    fontSize: 32,
    lineHeight: 35,
    letterSpacing: 1,
  },

  competitionTitle: {
    color: "#ffffff",
    fontFamily: "Kanitblack",
    fontSize: 17,
    letterSpacing: 0.8,
    textAlign: "center",
    marginTop: 2,
  },

  competitionLogo: {
    width: 56,
    height: 56,
    resizeMode: "contain",
    marginTop: 10
  },

  heroSubtitle: {
    textAlign: "center",
    color: "#cbd2dc",
    fontFamily: "Kanitus",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 14,
  },

  /* ========================= PLAYER CARD ========================= */

  playerCard: {
    width: "100%",
    backgroundColor: "#101827",
    borderRadius: 22,
    paddingBlock: 14,
    paddingInline: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4, },
    elevation: 3,
  },

  playerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },

  topAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    resizeMode: "cover",
    borderWidth: 3,
    borderColor: "#dcdcdc",
    
  },

  playerIdentity: {
    marginLeft: 13,
    flex: 1,
  },

  playerLabel: {
    fontFamily: "Kanito",
    color: "#9ca3af",
    fontSize: 9,
    letterSpacing: 1.5,
    marginBottom: 1,
  },

  username: {
    fontFamily: "Bangers",
    color: "#dcdcdc",
    fontSize: 26,
    letterSpacing: 0.4,
  },

  pointsBadge: {
    flexDirection: "row",
    alignItems: "baseline",
    alignSelf: "flex-start",
    backgroundColor: "#f7edc8",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 3,
  },

  points: {
    color: "#9a7600",
    fontFamily: "Kanitblack",
    fontSize: 17,
  },

  pointsLabel: {
    color: "#9a7600",
    fontFamily: "Kanitt",
    fontSize: 9,
    marginLeft: 4,
  },

  /* ========================= PLAY ========================= */

  playCard: {
    width: "100%",
    backgroundColor: "#22c55e",
    borderRadius: 24,
    marginBottom: 14,
    shadowColor: "#22c55e",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5, },
    elevation: 5,
  },

  playInner: {
    minHeight: 105,
    paddingHorizontal: 20,
    paddingVertical: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  playEyebrow: {
    color: "rgba(255,255,255,0.8)",
    fontFamily: "Kanitt",
    fontSize: 10,
    letterSpacing: 1.5,
    marginBottom: 2,
  },

  playTitle: {
    color: "#fff",
    fontFamily: "Kanitblack",
    fontSize: 25,
    letterSpacing: 0.2,
  },

  playSubtitle: {
    color: "rgba(255,255,255,0.9)",
    fontFamily: "Kanitus",
    fontSize: 11,
    marginTop: 2,
    maxWidth: 210,
  },

  playArrow: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  arrowText: {
    color: "#fff",
    fontSize: 27,
    fontFamily: "Kanitt",
  },

  /* ========================= SECONDARY MENU ========================= */

  secondaryGrid: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
  },

  menuCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 22,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 4, },
    elevation: 3,
  },

  menuCardInner: {
    minHeight: 125,
    padding: 16,
    justifyContent: "center",
  },

  menuIcon: {
    fontSize: 26,
    marginBottom: 7,
  },

  menuTitle: {
    color: "#172033",
    fontFamily: "Kanitblack",
    fontSize: 17,
  },

  menuSubtitle: {
    color: "#8a919c",
    fontFamily: "Kanitus",
    fontSize: 10,
    marginTop: 2,
  },
  /* ========================= LOGOUT ========================= */
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#e1e3e7",
    marginTop: 28,
    marginBottom: 15,
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  logoutIcon: {
    color: "#ef4444",
    fontSize: 19,
    marginRight: 7,
  },

  logoutText: {
    color: "#ef4444",
    fontFamily: "Kanito",
    fontSize: 13,
  },

  footer: {
    color: "#a0a5ad",
    fontFamily: "Kanitus",
    fontSize: 10,
    textAlign: "center",
    marginTop: 18,
  },
});