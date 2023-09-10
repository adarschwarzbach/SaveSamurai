export type Category =
    | 'Groceries'
    | 'Restaurant'
    | 'Utilities'
    | 'Entertainment'
    | 'Health'
    | 'Travel'
    | 'Shopping'
    | 'Education'
    | 'Transportation'
    | 'Other';

export type SpendEntry = { title: string; amount: number; date: Date };
export type SpendEntryWithCategory = SpendEntry & { category: Category };

export type GenerateInitialReportInput = {
    rawData: SpendEntry[]; // the raw parsed csv data
};

export type ChatResponse = { message: string };
export type ChatInput = {
    chatHistory: { role: string; content: string }[];
    message: string;
    categoryGroupedData: {
        [key in Category]: SpendEntryWithCategory[] | [];
    };

    // might not use the ones below, made them optional just in case
    categoryTotalsData?: {
        [key in Category]: number;
    };
    chronologicalData?: SpendEntryWithCategory[] | [];
    savingsByCategory?: {
        [key in Category]: SpendEntryWithCategory[] | [];
    };
    categorySavingsTotals?: {
        [key in Category]: number;
    };
};

export type GenerateInitialReportReturn = {
    categoryGroupedData: {
        [key in Category]: SpendEntryWithCategory[] | [];
    };
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
    chat: {
        report: string;
    };
    graphs?: {
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
    };
    error?: {
        valid: boolean;
        message: string;
    };
};
