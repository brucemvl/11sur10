import React, { useRef } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

function Precedent() {
  const navigation = useNavigation();

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(scaleAnim, {
      toValue: 1.3, 
      useNativeDriver: true,
      friction: 4,
      tension: 100,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Retour à la taille normale
      useNativeDriver: true,
      friction: 4,
      tension: 100,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
    accessible
  accessibilityRole="button"
  accessibilityLabel="Precedent"
  accessibilityHint="Retourner à l'ecran precedent"
      onPress={() => navigation.goBack()}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: scaleAnim }] }]}>
        <LinearGradient colors={["rgba(120, 169, 234, 0.95)", 'rgb(0, 0, 0)']} style={styles.button}>
          <Text style={styles.text}>{"<"}  Précédent</Text>
        </LinearGradient>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  buttonWrapper: {
    position: "absolute",
    left: 8,
    top: 5,
    zIndex: 999,
    shadowColor: '#f0f0f0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 0
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: 105,
    height: 48,
    borderWidth: 1,
    borderColor: "white"
  },
  text: {
    color: "white",
    fontFamily: "Kanitt",
    textAlign: "center",
  },
});

export default Precedent;