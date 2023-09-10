import type { NextApiRequest, NextApiResponse } from 'next';
import {
    GenerateInitialReportInput,
    GenerateInitialReportReturn,
    SpendEntryWithCategory
} from '../../types';
import categorizerProcessor from '../../utils/api/categorizerProcessor';
import generateCategoryGroupedData from '../../utils/api/generateCategoryGroupedData';
import generateCategoryTotalsData from '../../utils/api/generateCategoryTotalsData';
import savingsProcessor from '../../utils/api/savingProcessor';
import generateCategorySavingsTotals from '../../utils/api/generateCategorySavingsTotals';
import generateChronologicalData from '../../utils/api/generateChronologicalData';
import generateMainReport from '../../utils/api/generateMainReport';
import { MAX_TRANSACTIONS } from '../../utils/constants';
import graphData from '../../utils/api/graphData';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GenerateInitialReportReturn>
) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    console.log(req.body.body.rawData);

    try {
        const inputData = req.body.body as GenerateInitialReportInput;
        if (!inputData || !inputData.rawData || !inputData?.rawData?.length)
            throw new Error('No input data');

        const rawSpendEntries = inputData.rawData.slice(0, MAX_TRANSACTIONS);

        // check integrity of the data, like in the right format

        // Categorize with GPT
        const spendsWithCategories: SpendEntryWithCategory[] =
            await categorizerProcessor({ rawSpendEntries });

        // Group all of the data and store in object called categoryGroupedData
        // Done, haven't tested
        const categoryGroupedData = generateCategoryGroupedData({
            spendsWithCategories
        });

        // Calclate totals of categoryGroupedData and store in categoryTotalsData
        // Done, did not test yet
        const categoryTotalsData = generateCategoryTotalsData({
            categoryGroupedData
        });

        // Sort by chronological order
        const chronologicalData = generateChronologicalData({
            spendsWithCategories
        });

        // These are all of the transactions that should be removed, i.e. were bad spends
        const savingsByCategory = await savingsProcessor({ chronologicalData });

        // Calculate categorySavingsTotals from savingsByCategory
        // Done, did not test yet
        const categorySavingsTotals = generateCategorySavingsTotals({
            savingsByCategory
        });

        // Run all through giant GPT prompt to generate the report
        // const report = "main report here...";
        const report = await generateMainReport({
            categoryGroupedData,
            categoryTotalsData,
            chronologicalData,
            savingsByCategory,
            categorySavingsTotals
        });

        // Graph formatting code
        const graphs = graphData({
            categoryGroupedData,
            categoryTotalsData,
            chronologicalData,
            savingsByCategory,
            categorySavingsTotals
        });

        return res.status(200).json({
            categoryGroupedData,
            categoryTotalsData,
            chronologicalData,
            savingsByCategory,
            categorySavingsTotals,
            chat: {
                report
            },
            graphs
        });
    } catch (error) {
        console.error('Error parsing request body:', error);
        return res.status(400).json({
            categoryGroupedData: {
                Groceries: [],
                Restaurant: [],
                Utilities: [],
                Entertainment: [],
                Health: [],
                Travel: [],
                Shopping: [],
                Education: [],
                Transportation: [],
                Other: []
            },
            categoryTotalsData: {
                Groceries: 0,
                Restaurant: 0,
                Utilities: 0,
                Entertainment: 0,
                Health: 0,
                Travel: 0,
                Shopping: 0,
                Education: 0,
                Transportation: 0,
                Other: 0
            },
            chronologicalData: [],
            savingsByCategory: {
                Groceries: [],
                Restaurant: [],
                Utilities: [],
                Entertainment: [],
                Health: [],
                Travel: [],
                Shopping: [],
                Education: [],
                Transportation: [],
                Other: []
            },
            categorySavingsTotals: {
                Groceries: 0,
                Restaurant: 0,
                Utilities: 0,
                Entertainment: 0,
                Health: 0,
                Travel: 0,
                Shopping: 0,
                Education: 0,
                Transportation: 0,
                Other: 0
            },
            chat: {
                report: 'Error generating the report :('
            },
            error: {
                valid: true,
                message: 'Invalid request body'
            }
        });
    }
}
