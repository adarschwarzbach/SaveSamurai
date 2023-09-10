import { Category, SpendEntryWithCategory } from "../../types";
import { CATEGORIES } from "../constants";

export default function generateCategoryGroupedData({
  spendsWithCategories,
}: {
  spendsWithCategories: SpendEntryWithCategory[];
}): { [key in Category]: SpendEntryWithCategory[] | [] } {
  const categoryGroupedData: { [key: string]: SpendEntryWithCategory[] | [] } =
    {};

  // init categories
  for (const category of CATEGORIES) {
    categoryGroupedData[category] = [];
  }

  // Group by category, put in correct array
  for (const spend of spendsWithCategories) {
    const category = spend.category;
    // @ts-ignore -- was yelling at me for having a "never" type... idk
    categoryGroupedData[category as string].push(spend);
  }

  return categoryGroupedData as {
    [key in Category]: SpendEntryWithCategory[] | [];
  };

  // return {
  //   Groceries: [exampleSpendEntryWithCategory("Groceries")],
  //   Restaurant: [exampleSpendEntryWithCategory("Restaurant")],
  //   Utilities: [exampleSpendEntryWithCategory("Utilities")],
  //   Entertainment: [exampleSpendEntryWithCategory("Entertainment")],
  //   Health: [exampleSpendEntryWithCategory("Health")],
  //   Travel: [exampleSpendEntryWithCategory("Travel")],
  //   Shopping: [exampleSpendEntryWithCategory("Shopping")],
  //   Education: [exampleSpendEntryWithCategory("Education")],
  //   Transportation: [exampleSpendEntryWithCategory("Transportation")],
  //   Other: [exampleSpendEntryWithCategory("Other")],
  // };
}
