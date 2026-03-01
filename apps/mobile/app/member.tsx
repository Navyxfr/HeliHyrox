import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function MemberHomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>MemberHome</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Fondation mobile</Text>
        <Text style={styles.copy}>
          Point d'entree membre provisoire avant l'implementation des tabs Planning,
          News, Profile et CoachSessions.
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

