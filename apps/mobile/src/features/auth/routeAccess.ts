import type { DerivedStatus } from "@helihyrox/shared";

export function getTargetPath(status: DerivedStatus) {
  switch (status) {
    case "candidate":
      return "/(candidate)";
    case "pending_member":
      return "/(candidate)/pending";
    case "member_active":
      return "/(member)/(tabs)";
    case "suspended":
      return "/(member)/(tabs)/profile";
    default:
      return "/(public)";
  }
}

export function canAccessPath(
  status: DerivedStatus,
  pathname: string,
  firstSegment?: string
) {
  if (firstSegment === "(public)") {
    return true;
  }

  if (firstSegment === "(auth)") {
    return status === "public";
  }

  if (status === "public") {
    return false;
  }

  if (status === "candidate" || status === "pending_member") {
    return firstSegment === "(candidate)";
  }

  if (status === "member_active") {
    return firstSegment === "(member)";
  }

  if (status === "suspended") {
    return pathname === "/(member)/(tabs)/profile";
  }

  return false;
}
