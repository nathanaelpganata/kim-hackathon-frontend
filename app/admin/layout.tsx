'use client';

import {
    QueryClient,
    QueryClientProvider,
    QueryOptions,
} from '@tanstack/react-query';
import React from 'react';

import axios from '@/lib/axios';

const defaultQueryFn = async ({ queryKey }: QueryOptions) => {
    const res = await axios.get(`${queryKey?.[0]}`);
    return res.data;
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryFn: defaultQueryFn,
        },
    },
});

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </div>
    );
};

export default AdminLayout;
