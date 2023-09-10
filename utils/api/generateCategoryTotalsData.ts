import { Category, SpendEntryWithCategory } from "../../types";

export default function generateCategoryTotalsData({
  categoryGroupedData,
}: {
  categoryGroupedData: { [key in Category]: SpendEntryWithCategory[] | [] };
}): { [key in Category]: number } {
  const categories = Object.keys(categoryGroupedData);

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
    for (const entry of categoryGroupedData[category as Category]) {
      totals[category as Category] += entry?.amount || 0;
    }
  }

  return totals;

  /* 
  return {
    Groceries: 140.23,
    Restaurant: 140.23,
    Utilities: 140.23,
    Entertainment: 140.23,
    Health: 140.23,
    Travel: 140.23,
    Shopping: 140.23,
    Education: 140.23,
    Transportation: 140.23,
    Other: 140.23,
  };
  */
}
