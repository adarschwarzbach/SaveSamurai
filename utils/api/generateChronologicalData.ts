import { SpendEntryWithCategory } from "../../types";

export default function generateChronologicalData({
  spendsWithCategories,
}: {
  spendsWithCategories: SpendEntryWithCategory[];
}): SpendEntryWithCategory[] {
  return spendsWithCategories.sort(
    // @ts-ignore
    (a, b) => new Date(a.date) - new Date(b.date)
  );
}
