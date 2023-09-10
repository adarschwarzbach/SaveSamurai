import { SpendEntry, SpendEntryWithCategory } from "../types";

export function formatTransactionForGPT({
  i,
  transaction,
}: {
  i: number;
  transaction: SpendEntry | SpendEntryWithCategory;
}): string {
  return (
    "" +
    i +
    ") " +
    "TITLE: " +
    transaction.title +
    ", " +
    "AMOUNT: $" +
    transaction.amount +
    "\n"
  );
}
