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
import { fetchAdminTags, storeAdminTag } from "@/app/api/tag/admin"

const FormSchema2 = z.object({
    name: z.string().min(3),
});

export function CreateTag() {
    const { data: authSession, status: authStatus } = useSession();

    const [open, setOpen] = useState(false);

    const form2 = useForm<z.infer<typeof FormSchema2>>({
        resolver: zodResolver(FormSchema2),
    });

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof FormSchema2>) => {
            const post = await storeAdminTag(
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
        mutationKey: "createTag",
    })

    const onSubmitTag = (data: z.infer<typeof FormSchema2>) => {
        try {
            mutation.mutate(data);

            queryClient.invalidateQueries('tags').then(() => {
                setOpen(false);
                form2.reset();
            });

            const { status: tagStatus, data: tags, error: tagErrors } = useQuery({
                queryKey: ['tags'],
                queryFn: async () => await fetchAdminTags(authSession.token) as TagInterface[],
            });
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-fit" variant={'outline'} size={'sm'} onClick={() => setOpen(true)}>Create Tag</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form2}>
                    <div className="space-y-6">
                        <DialogHeader>
                            <DialogTitle>Create Tag</DialogTitle>
                            <DialogDescription>
                                Fill out the form below to create a new Tag.
                            </DialogDescription>
                        </DialogHeader>
                        <FormField
                            control={form2.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="force" {...field} required />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button onClick={form2.handleSubmit(onSubmitTag)}>Create</Button>
                        </DialogFooter>
                    </div>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
