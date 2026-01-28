import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function RatingModal({ visible, onChoice }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.box}>
        <Text style={styles.title}>Tu apprécies l’application ?</Text>
        <Text style={styles.text}>
          Ton avis nous aide énormément à améliorer l’expérience ⚽
        </Text>

        <TouchableOpacity
          style={styles.primary}
          onPress={() => onChoice("yes")}
        >
          <Text style={styles.primaryText}>Oui, j’adore</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onChoice("later")}>
          <Text style={styles.link}>Plus tard</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onChoice("no")}>
          <Text style={styles.link}>Non merci</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  box: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    width: "85%",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: "#444",
    marginBottom: 20,
  },
  primary: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryText: {
    color: "white",
    fontWeight: "600",
  },
  link: {
    textAlign: "center",
    color: "#666",
    marginTop: 8,
  },
});