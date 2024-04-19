"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Loading from '@/components/loading';
import FormSection from './form';

const queryClient = new QueryClient()

const DashboardPostsCreatePage: React.FC = () => {
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
        <div className="container mx-auto py-5">
            <div className='flex items-center justify-between mb-3'>
                <h1 className="text-2xl"><span className="font-bold text-3xl">Post |</span> Create</h1>
            </div>

            <div className="w-full flex flex-col gap-5">
                <QueryClientProvider client={queryClient}>
                    <FormSection />
                </QueryClientProvider>
            </div>
        </div>
    );
};

export default DashboardPostsCreatePage;
