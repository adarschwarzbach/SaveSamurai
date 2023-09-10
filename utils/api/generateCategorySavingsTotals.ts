import { Category, SpendEntryWithCategory } from "../../types";

export default function generateCategorySavingsTotals({
  savingsByCategory,
}: {
  savingsByCategory: { [key in Category]: SpendEntryWithCategory[] | [] };
}): { [key in Category]: number } {
  const categories = Object.keys(savingsByCategory);

  // Initialize totals with all categories set to 0
  const totals: { [key in Category]: number } = categories.reduce(
    (acc, category) => {
      acc[category as Category] = 0.0;
      return acc;
    },
    {} as { [key in Category]: number }
  );

  // Iterate through categoryGroupedData and accumulate the amounts
  for (const category of categories) {
    for (const entry of savingsByCategory[category as Category]) {
      totals[category as Category] += entry?.amount || 0;
    }
  }

  return totals;

  // return {
  //   Groceries: 69.42,
  //   Restaurant: 69.42,
  //   Utilities: 69.42,
  //   Entertainment: 69.42,
  //   Health: 69.42,
  //   Travel: 69.42,
  //   Shopping: 69.42,
  //   Education: 69.42,
  //   Transportation: 69.42,
  //   Other: 69.42,
  // };
}
