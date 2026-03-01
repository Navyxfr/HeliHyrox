export type RecordEntry = {
  id: string;
  movement: string;
  valueLabel: string;
  performedOnLabel: string;
};

export const mockRecords: RecordEntry[] = [
  {
    id: "record-ski",
    movement: "SkiErg 1000m",
    valueLabel: "3:18",
    performedOnLabel: "14 fev 2026"
  },
  {
    id: "record-row",
    movement: "Row 1000m",
    valueLabel: "3:28",
    performedOnLabel: "12 fev 2026"
  },
  {
    id: "record-wallballs",
    movement: "Wall Balls",
    valueLabel: "84 reps",
    performedOnLabel: "22 fev 2026"
  }
];
