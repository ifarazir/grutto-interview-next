"use client";
import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast()
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true while processing login

        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
        };
        const email = target.email.value;
        const password = target.password.value;

        const res = await signIn('credentials', { redirect: false, email, password });

        // Show success message
        if(res?.ok) {
            toast({
                title: 'Success!',
                description: 'You have successfully logged in.',
                variant: 'default'
            });

            // Redirect user to admin panel
            router.push('/admin');
        } else {
            toast({
                title: 'Error!',
                description: res?.error,
                variant: 'destructive'
            });
        }
        

        // Reset loading state after login attempt completes
        setLoading(false);
    };

    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-dvh">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center mb-3">
                        <Link href="/">
                            <img src="https://www.grutto.com/static/media/grutto-new-logo.2222fbee19ce71dc3ace.svg" className="h-16 mx-auto" alt="Grutto" />
                        </Link>
                    </div>
                    <form className="grid gap-4" onSubmit={handleSubmit}>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input id="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Loading...' : 'Login'}
                        </Button>
                    </form>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="https://www.grutto.com/storage/landing-pages/arie/grutto-arie-boomsma-6.webp"
                    alt="Grutto Cover"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}