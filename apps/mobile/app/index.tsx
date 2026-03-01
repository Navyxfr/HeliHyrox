import { Link } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function PublicHomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.kicker}>AIRBUS HELICOPTERS / SECTION SPORTIVE</Text>
        <Text style={styles.title}>HeliHyrox</Text>
        <Text style={styles.subtitle}>
          Parcours public, adhesion de saison, espace membre, coach et admin.
        </Text>
      </View>

      <View style={styles.actions}>
        <Link href="/candidate" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Demarrer une adhesion</Text>
          </Pressable>
        </Link>
        <Link href="/member" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Voir la base membre</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F7FB",
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: "space-between"
  },
  hero: {
    gap: 12,
    paddingTop: 32
  },
  kicker: {
    color: "#5F718A",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1
  },
  title: {
    color: "#00205B",
    fontSize: 40,
    fontWeight: "800"
  },
  subtitle: {
    color: "#32465E",
    fontSize: 16,
    lineHeight: 24
  },
  actions: {
    gap: 12
  },
  primaryButton: {
    backgroundColor: "#FFED00",
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  primaryButtonText: {
    color: "#00205B",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D6DFEA",
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  secondaryButtonText: {
    color: "#00205B",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
  }
});
