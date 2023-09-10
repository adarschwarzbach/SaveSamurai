import React, { useCallback, useState } from 'react';
import { FileInput } from '@blueprintjs/core';
import Papa from 'papaparse';
import axios from 'axios';
import { useSetGlobalState, useGlobalState } from '../../contexts/GlobalState';
import { GenerateInitialReportReturn } from '../../types';

const UserUpload: React.FC = () => {
    const [error, setError] = useState(false);
    const setGlobalState = useSetGlobalState();
    const state = useGlobalState();

    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files && e.target.files[0];
            setError(false);

            if (file) {
                Papa.parse(file, {
                    header: true, // Set to true if your CSV has headers
                    dynamicTyping: true, // Parse numbers and booleans
                    skipEmptyLines: true, // Skip empty lines
                    complete: async (result) => {
                        // check if it has the right column headers

                        // @ts-ignore
                        const headers = Object.keys(result.data[0]);

                        const correctHeaders = new Set([
                            'title',
                            'amount',
                            'date'
                        ]);
                        for (const header of headers) {
                            if (!correctHeaders.has(header)) {
                                setError(true);
                                return;
                            }
                        }

                        setGlobalState({ ...state, loading: true });

                        const rawData = result.data;

                        await axios
                            .post('/api/generateInitialReport', {
                                body: {
                                    rawData
                                }
                            })
                            .then((res) => {
                                const report: GenerateInitialReportReturn =
                                    res.data;
                                setGlobalState({
                                    ...state,
                                    loading: false,
                                    report: report,
                                    chatHistory: [
                                        {
                                            role: 'assistant',
                                            content: report.chat.report
                                        }
                                    ]
                                });

                                console.log('AXIOS RESPONSE:', res.data);
                            })
                            .catch((error) => {
                                setGlobalState({
                                    ...state,
                                    loading: false,
                                    report: null,
                                    chatHistory: []
                                });
                                console.log(error);
                            });
                    },
                    error: (error) => {
                        console.error('CSV parsing error:', error.message);
                        setError(true);
                    }
                });
            }
        },
        []
    );

    return (
        <>
            <FileInput
                text="CSV of your spending..."
                buttonText="Upload"
                onInputChange={handleFileChange}
                inputProps={{
                    accept: '.csv',
                    style: { width: '300px', fontSize: '16px' }
                }}
            />
            {error && (
                <p className="text-sm text-red-500 pt-4">
                    Error uploading CSV. Please ensure you have these headers:
                    title, amount, date.
                </p>
            )}
        </>
    );
};

export default UserUpload;
