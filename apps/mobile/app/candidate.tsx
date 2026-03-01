import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function CandidateDashboardScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>CandidateDashboard</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dossier de saison</Text>
        <Text style={styles.copy}>
          Ecran de base pour le parcours candidat. Les blocs a brancher ensuite sont:
          profil, certificat, reglement, paiement et suivi du statut.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F7FB",
    padding: 24
  },
  title: {
    color: "#00205B",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 24
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    gap: 8
  },
  cardTitle: {
    color: "#00205B",
    fontSize: 18,
    fontWeight: "700"
  },
  copy: {
    color: "#465B75",
    fontSize: 15,
    lineHeight: 22
  }
});

