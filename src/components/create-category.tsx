import { fetchAdminCategories, storeAdminCategory } from "@/app/api/category/admin"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { useState } from "react"

const FormSchema2 = z.object({
    name: z.string().min(3),
});

export function CreateCategory() {
    const { data: authSession, status: authStatus } = useSession();

    const [open, setOpen] = useState(false);

    const form2 = useForm<z.infer<typeof FormSchema2>>({
        resolver: zodResolver(FormSchema2),
    });

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof FormSchema2>) => {
            const post = await storeAdminCategory(
                {
                    token: authSession.token,
                    name: data.name,
                }
            );

            return post;
        },
        onError: (error) => {
            console.error(error);
        },
        mutationKey: "createCategory",
    })

    const onSubmitCategory = (data: z.infer<typeof FormSchema2>) => {
        try {
            mutation.mutate(data);

            queryClient.invalidateQueries('categories').then(() => {
                setOpen(false);
                form2.reset();
            });

            const { status: categoryStatus, data: categories, error: categoryErrors } = useQuery({
                queryKey: ['categories'],
                queryFn: async () => await fetchAdminCategories(authSession.token) as CategoryInterface[],
            });
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-fit mt-2" variant={'outline'} size={'sm'} onClick={() => setOpen(true)}>Create Category</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form2}>
                    <div className="space-y-6">
                        <DialogHeader>
                            <DialogTitle>Create Category</DialogTitle>
                            <DialogDescription>
                                Fill out the form below to create a new category.
                            </DialogDescription>
                        </DialogHeader>
                        <FormField
                            control={form2.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Goed vlees bevat alle essentiële aminozuren" {...field} required />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button onClick={form2.handleSubmit(onSubmitCategory)}>Create</Button>
                        </DialogFooter>
                    </div>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
