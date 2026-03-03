import { Link, type Href } from "expo-router";
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
  actionLabel = "Voir le detail",
  href
}: SessionCardProps) {
  const isFull = session.bookedCount >= session.capacity;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.copy}>
          <Text style={styles.kicker}>{session.sessionType}</Text>
          <Text style={styles.title}>{session.title}</Text>
          <Text style={styles.meta}>
            {session.dateLabel} • {session.startsAtLabel} - {session.endsAtLabel}
          </Text>
          <Text style={styles.meta}>
            {session.location} • Coach {session.coachName}
          </Text>
        </View>
        <View style={[styles.badge, isFull ? styles.badgeFull : null]}>
          <Text style={[styles.badgeText, isFull ? styles.badgeTextFull : null]}>
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
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
    borderRadius: 18,
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
  kicker: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.6,
    textTransform: "uppercase"
  },
  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "800"
  },
  meta: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18
  },
  badge: {
    alignItems: "center",
    backgroundColor: colors.successLight,
    borderColor: colors.success,
    borderRadius: 999,
    borderWidth: 1,
    height: 34,
    justifyContent: "center",
    minWidth: 62,
    paddingHorizontal: 10
  },
  badgeText: {
    color: colors.success,
    fontSize: 11,
    fontWeight: "800"
  },
  badgeFull: {
    backgroundColor: colors.warningLight,
    borderColor: colors.warning
  },
  badgeTextFull: {
    color: colors.warning
  },
  button: {
    backgroundColor: colors.surfaceSoft,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 13
  },
  buttonText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.4,
    textAlign: "center"
  }
});
