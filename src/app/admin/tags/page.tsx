"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CreateTag } from '@/components/create-tag';
import TagsTable from './table';
import Loading from '@/components/loading';

const queryClient = new QueryClient()

const DashboardTagsPage: React.FC = () => {
    const { data: session, status } = useSession()
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated') {
            // User is authenticated, allow access
        } else if (status === 'loading') {
            // Session is loading
        } else {
            // User is not authenticated, redirect to login page
            router.push('/auth/login');
        }
    }, [status]);

    if (status === 'loading') {
        return <Loading />;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <div className="container mx-auto py-5">
                <div className='flex items-center justify-between mb-3'>
                    <h1 className="text-3xl font-bold">Tags</h1>

                    <CreateTag />
                </div>

                <div className="w-full flex flex-col gap-5">
                    <Card>
                        <TagsTable />
                    </Card>
                </div>
            </div >
        </QueryClientProvider>
    );
};

export default DashboardTagsPage;
