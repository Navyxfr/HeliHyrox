import { describe, expect, it } from "vitest";
import { applicationStatusLabels, applicationStatuses } from "./index";

describe("applicationStatusLabels", () => {
  it("couvre tous les statuts d'application", () => {
    expect(Object.keys(applicationStatusLabels).sort()).toEqual(
      [...applicationStatuses].sort()
    );
  });

  it("expose des libelles non vides", () => {
    for (const status of applicationStatuses) {
      expect(applicationStatusLabels[status].trim().length).toBeGreaterThan(0);
    }
  });
});
