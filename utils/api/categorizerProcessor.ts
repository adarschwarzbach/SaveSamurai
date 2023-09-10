import { Category, SpendEntry, SpendEntryWithCategory } from '../../types';
import { openai } from '../openai';
import { CATEGORIES } from '../constants';
import { formatTransactionForGPT } from '../formatting';

export default async function categorizerProcessor({
    rawSpendEntries
}: {
    rawSpendEntries: SpendEntry[];
}): Promise<SpendEntryWithCategory[]> {
    // rawSpendEntries are guaranteed to have length

    const prompt = formatCategorizerProcessorPrompt({ rawSpendEntries });

    // feed into openai
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4'
    });

    try {
        if (!completion?.choices?.[0]?.['message']?.['content'])
            throw 'No response from GPT4 for categorizerProcessor';
        const outputArray = JSON.parse(
            completion.choices[0]['message']['content']
        ) as Category[];

        // This was erroring too much
        // if (outputArray.length !== rawSpendEntries.length)
        //     throw 'Incorrect length returned from Categorizer Processor';

        const validCategories = new Set(CATEGORIES);

        // @ts-ignore
        const spendsWithCategories: SpendEntryWithCategory[] =
            rawSpendEntries.map((entry, i) => {
                return {
                    ...entry,
                    category: 'Other' as Category // init to Other, and change later on
                };
            });

        // append categories to the original list
        for (let i = 0; i < outputArray.length; i++) {
            const generatedCategory = outputArray[i];
            if (validCategories.has(generatedCategory)) {
                spendsWithCategories[i].category = generatedCategory;
            }
            // if it errored and the generated category is not an actual category, then the above init to Other will catch that and make it an "Other"
        }

        return spendsWithCategories;
    } catch (error) {
        console.error(error);

        // If there's an error above, return them all as "Other"
        return rawSpendEntries.map((entry, i) => {
            return {
                ...entry,
                category: 'Other' as Category // init to Other, and change later on
            };
        });
    }
}

const formatCategorizerProcessorPrompt = ({
    rawSpendEntries
}: {
    rawSpendEntries: SpendEntry[];
}): string => {
    const prompt = `You are a helpful assistant. Below is a list of credit card transactions:

${rawSpendEntries.map((transaction, i) =>
    formatTransactionForGPT({ i, transaction })
)}

Your job is to categorize each transaction into one of the given categories. 

Categories: [${CATEGORIES.join(', ')}]

You will respond in only a JSON array with the category names of each of the transactions. Match the index of the category to the index of the transaction as seen above.

Example: 
Input: 0) TITLE: home Depot, AMOUNT: $42.25
1) TITLE: Uber, AMOUNT: $13.02
2) TITLE: Harris Teeters, AMOUNT: $92.01
etc...

Output: ["Shopping", "Transportation", "Groceries", etc...]

You must ensure that the output array length matches the input credit card transactions length.

Output JSON array only:
`;

    return prompt;
};
