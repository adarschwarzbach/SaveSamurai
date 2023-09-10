import { Category, SpendEntryWithCategory } from "../../types";
import { exampleSpendEntryWithCategory } from "./exampleData";

export default function graphData({
  categoryGroupedData,
  categoryTotalsData,
  chronologicalData,
  savingsByCategory,
  categorySavingsTotals,
}: {
  categoryGroupedData: { [key in Category]: SpendEntryWithCategory[] | [] };
  categoryTotalsData: {
    [key in Category]: number;
  };
  chronologicalData: SpendEntryWithCategory[] | [];
  savingsByCategory: {
    [key in Category]: SpendEntryWithCategory[] | [];
  };
  categorySavingsTotals: {
    [key in Category]: number;
  };
}): {
  radar: {
    category: Category;
    totalSpending: number;
    reducedSpending: number;
  }[];
  xy: {
    date: Date; // "2022-01-01";
    totalSpend: number;
    decreasedSpend: number;
  }[];
} {
  // const radar = [
  //   {
  //     category: "Other" as Category,
  //     totalSpending: 100,
  //     reducedSpending: 130,
  //   },
  // ];

  const radar = Object.keys(categoryTotalsData).map((category, idx) => {
    return {
      category: category as Category,
      totalSpending: categoryTotalsData[category as Category],
      reducedSpending:
        categoryTotalsData[category as Category] -
        categorySavingsTotals[category as Category],
    };
  });

  // const xy = [
  //   {
  //     date: new Date(),
  //     totalSpend: 100,
  //     decreasedSpend: 90,
  //   },
  // ];

  const xy: {
    date: Date;
    totalSpend: number;
    decreasedSpend: number;
  }[] = [];

  const serializedDateToRealDate: { [key: string]: Date } = {};
  const dateToTotalSpend: { [key: string]: number } = {};
  const dateToDecreasedSpend: { [key: string]: number } = {};

  function mapDateToNumber(date: Date) {
    // Extract year, month, and day from the date
    const a = typeof date == "string" ? new Date(date) : date;
    const year = a.getFullYear();
    const month = a.getMonth();
    const day = a.getDate();

    // Create a unique key for the date (format: "YYYY-MM-DD")
    const dateKey = `${year}-${month}-${day}`;

    return dateKey;
  }

  // Add all transaction values to their days
  for (const spend of chronologicalData) {
    const date = new Date(spend.date);
    const dateKey = mapDateToNumber(date);

    // Keep track of the serialization from dateKey to real date object
    serializedDateToRealDate[dateKey] = date;

    // Add all transactions to the dateToTotalSpend map
    if (!dateToTotalSpend[dateKey]) {
      dateToTotalSpend[dateKey] = spend.amount;
    } else dateToTotalSpend[dateKey] += spend.amount;

    // Add all transactions to the dateToDecreasedSpend map
    if (!dateToDecreasedSpend[dateKey]) {
      dateToDecreasedSpend[dateKey] = spend.amount;
    } else dateToDecreasedSpend[dateKey] += spend.amount;
  }

  // Subtract savings from the decreased mapping
  for (const extraneousSpends of Object.values(savingsByCategory)) {
    for (const spend of extraneousSpends) {
      const dateKey = mapDateToNumber(spend.date);

      // subtract amount, we already populated the map so it'll have the date
      dateToDecreasedSpend[dateKey] -= spend.amount;
    }
  }

  // populate the xy array
  for (const dateKey of Object.keys(dateToTotalSpend)) {
    const date = serializedDateToRealDate[dateKey];
    const totalSpend = dateToTotalSpend[dateKey];
    const decreasedSpend = Math.max(0, dateToDecreasedSpend[dateKey]); // sometimes the float subtraction made it super slightly negative

    xy.push({ date, totalSpend, decreasedSpend });
  }

  return { radar, xy };
}
