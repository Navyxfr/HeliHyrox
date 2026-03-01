import { Href, Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme/tokens";
import type { SessionItem } from "@/features/booking/mockData";

type SessionCardProps = {
  session: SessionItem;
  actionLabel?: string;
  href: Href;
};

export function SessionCard({
  session,
  actionLabel = "Voir le détail",
  href
}: SessionCardProps) {
  const isFull = session.bookedCount >= session.capacity;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <Text style={styles.title}>{session.title}</Text>
          <Text style={styles.meta}>
            {session.dateLabel} • {session.startsAtLabel} - {session.endsAtLabel}
          </Text>
          <Text style={styles.meta}>
            {session.location} • Coach {session.coachName}
          </Text>
        </View>
        <View style={[styles.badge, isFull ? styles.badgeFull : undefined]}>
          <Text style={[styles.badgeText, isFull ? styles.badgeTextFull : undefined]}>
            {session.bookedCount}/{session.capacity}
          </Text>
        </View>
      </View>
      <Link href={href} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    gap: 14,
    padding: 18
  },
  header: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between"
  },
  copy: {
    flex: 1,
    gap: 4
  },
  title: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: "700"
  },
  meta: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18
  },
  badge: {
    alignItems: "center",
    backgroundColor: colors.successLight,
    borderRadius: 999,
    height: 34,
    justifyContent: "center",
    minWidth: 62,
    paddingHorizontal: 10
  },
  badgeText: {
    color: colors.success,
    fontSize: 12,
    fontWeight: "700"
  },
  badgeFull: {
    backgroundColor: colors.warningLight
  },
  badgeTextFull: {
    color: colors.warning
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14
  },
  buttonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center"
  }
});
