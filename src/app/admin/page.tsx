"use client";

import Loading from '@/components/loading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const DashboardPage: React.FC = () => {
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
        <div className="container mx-auto py-3">
            <h1>Dashboard</h1>
            <p>
                Welcome, {session?.user?.name}!
            </p>
            {/* Dashboard content */}
        </div>
    );
};

export default DashboardPage;
