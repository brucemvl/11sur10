import AsyncStorage from "@react-native-async-storage/async-storage";
import Rate, { AndroidMarket } from "react-native-rate";

// Nombre d'ouvertures avant d'afficher la demande
const OPEN_COUNT_FOR_RATING = 5;

export const initRatingSystem = async () => {
  try {
    const hasRated = await AsyncStorage.getItem("hasRated");

    // Si déjà noté → ne PLUS JAMAIS afficher
    if (hasRated === "true") return;

    // Récupérer le nombre d'ouvertures
    const countStr = await AsyncStorage.getItem("openCount");
    const count = countStr ? parseInt(countStr) : 0;

    const newCount = count + 1;

    // Sauvegarde du compteur
    await AsyncStorage.setItem("openCount", newCount.toString());

    // Si le seuil est atteint → on montre la demande
    if (newCount >= OPEN_COUNT_FOR_RATING) {
      requestAppRating();
    }
  } catch (e) {
    console.log("Erreur rating :", e);
  }
};

const requestAppRating = () => {
  const options = {
    AppleAppID: "6739251747",           // exemple : "1234567890"
    GooglePackageName: "com.onzesur10.app",  // exemple : "com.monnom.app"
    preferredAndroidMarket: AndroidMarket.Google,
    preferInApp: true,
    openAppStoreIfInAppFails: true,
  };

  Rate.rate(options, async (success) => {
    if (success) {
      // ⛔ L'utilisateur a NOTÉ → plus jamais réafficher
      await AsyncStorage.setItem("hasRated", "true");
    } else {
      // L'utilisateur ferme la pop-up sans noter
      // Tu peux ré-afficher plus tard si tu veux → laisser comme ça
    }
  });
};

// Pour déclencher manuellement (ex: bouton "Noter l'app")
export const manualRateApp = () => {
  requestAppRating();
};