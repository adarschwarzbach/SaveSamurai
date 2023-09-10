import { Category, SpendEntryWithCategory } from "../../types";

export const exampleSpendEntry = {
  title: "test",
  amount: 69.42,
  date: new Date(),
};

export const exampleSpendEntryWithCategory = (category: Category) => {
  const ret: SpendEntryWithCategory = { ...exampleSpendEntry, category };
  return ret;
};
