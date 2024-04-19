"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import PostsTable from './table';
import { Card } from '@/components/ui/card';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const queryClient = new QueryClient()

const DashboardPostsPage: React.FC = () => {
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
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto py-5">
            <div className='flex items-center justify-between mb-3'>
                <h1 className="text-3xl font-bold">Posts</h1>

                <Link href="/admin/posts/create">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Post
                    </Button>
                </Link>
            </div>

            <div className="w-full flex flex-col gap-5">
                <QueryClientProvider client={queryClient}>
                    <Card>
                        <PostsTable />
                    </Card>
                </QueryClientProvider>
            </div>
        </div >
    );
};

export default DashboardPostsPage;
