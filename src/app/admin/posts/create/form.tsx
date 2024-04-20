import React, { useState } from "react";
import { fetchAdminCategories } from "@/app/api/category/admin";
import { fetchAdminTags } from "@/app/api/tag/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus, ChevronsUpDown, Check } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { storeAdminPost } from "@/app/api/post/admin";
import { useRouter } from "next/navigation";
import { CreateCategory } from "@/components/create-category";
import { CreateTag } from "@/components/create-tag";


const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]


const regex1 = {
    // URL must contain /article/
    regex: /\/article\//,
    message: "URL must contain /article/"
};

const regex2 = {
    // "/article/" must not come after "/nl/"
    regex: /\/nl\/article\//,
    message: "/article/ must not come after /nl/"
};

const regex3 = {
    // “/article/” must not come before any digits
    regex: /\/article\/\d/,
    message: "/article/ must not come before any digits"
}

const FormSchema = z.object({
    category_id: z.string().min(1),
    title: z.string().min(1),
    external_urls: z.array(z.string().min(1).refine(value => regex1.regex.test(value), { message: regex1.message }).refine(value => !regex2.regex.test(value), { message: regex2.message }).refine(value => !regex3.regex.test(value), { message: regex3.message })),
    content: z.string().min(1),
    tags: z.array(z.string().min(1))
});

export default function FormSection() {
    const { data: authSession, status: authStatus } = useSession();
    const { status: categoryStatus, data: categories, error: categoryErrors } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => await fetchAdminCategories(authSession.token) as CategoryInterface[],
    });
    const { status: tagStatus, data: tags, error: tagErrors } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => await fetchAdminTags(authSession.token) as TagInterface[],
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            category_id: "",
            title: "",
            external_urls: [],
            content: "",
            tags: []
        }
    });

    const { errors } = form.formState;

    const [externalUrls, setExternalUrls] = useState<string[]>(form.getValues("external_urls"));
    const [selectTagOpen, setSelectTagOpen] = useState<Boolean>(false);

    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof FormSchema>) => {
            const post = await storeAdminPost(
                authSession.token,
                parseInt(data.category_id),
                data.title,
                data.content,
                data.tags.map(tag => parseInt(tag)),
                data.external_urls
            );

            return post;
        },
        onError: (error) => {
            console.error(error);
        },
        mutationKey: "createPost",
    })

    const addExternalUrl = () => {
        setExternalUrls([...externalUrls, ""]);
        form.setValue("external_urls", [...externalUrls, ""]);
    };

    const removeExternalUrl = (index: number) => {
        const updatedUrls = [...externalUrls];
        updatedUrls.splice(index, 1);
        setExternalUrls(updatedUrls);
        form.setValue("external_urls", updatedUrls);
    };

    const addTag = (tag: string) => {
        if (form.getValues("tags").includes(tag)) return;
        form.setValue("tags", [...form.getValues("tags"), tag]);
    }

    const removeTag = (tag: string) => {
        const updatedTags = form.getValues("tags").filter(t => t !== tag);
        form.setValue("tags", updatedTags);
    }

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        // toast({
        //     title: "You submitted the following values:",
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //         </pre>
        //     ),
        // });
        mutation.mutate(data);

        router.push("/admin/posts");

    };

    return (
        <Card>
            <CardContent className="max-w-screen-md mx-auto py-5">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Goed vlees bevat alle essentiële aminozuren" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col">
                            <FormField
                                control={form.control}
                                name="category_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories?.map(category => (
                                                    <SelectItem key={category.id} value={category.id.toString()}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <CreateCategory />
                        </div>


                        <FormItem className="flex flex-col">
                            <FormLabel>Tags</FormLabel>
                            <div className="flex items-center gap-5">
                                <Popover open={selectTagOpen} onOpenChange={setSelectTagOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={selectTagOpen}
                                            className="w-[200px] border-gray-200 justify-between"
                                        >
                                            Select a Tag...
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search Tag..." />
                                            <CommandEmpty>No Tag found.</CommandEmpty>
                                            <CommandGroup>
                                                {tags?.map((tag) => {
                                                    return (
                                                        <CommandItem
                                                            key={tag.id.toString()}
                                                            value={tag.id.toString()}
                                                            onSelect={(currentValue) => {
                                                                addTag(currentValue)
                                                                setSelectTagOpen(false)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    // value === framework.value ? "opacity-100" : "opacity-0"
                                                                    form.getValues("tags").includes(tag.id.toString()) ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {tag.name}
                                                        </CommandItem>
                                                    )
                                                })}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <CreateTag />
                            </div>


                            <div className="flex flex-wrap gap-2 mt-2">
                                {form.getValues("tags").map((tag, index) => (
                                    <Button key={index} size="sm" variant="outline" onClick={() => removeTag(tag)}>
                                        {tags?.find(t => t.id.toString() === tag)?.name}
                                        <Minus size={20} className="ml-2" />
                                    </Button>
                                ))}
                            </div>
                        </FormItem>

                        <div className="flex flex-col gap-3">
                            <FormLabel>External URLs</FormLabel>
                            {externalUrls.map((url, index) => (
                                <div className="flex flex-col">
                                    <div key={index} className="flex items-center">
                                        <Input
                                            placeholder="https://example.com/de/article/test"
                                            value={url}
                                            onChange={(e) => {
                                                const updatedUrls = [...externalUrls];
                                                updatedUrls[index] = e.target.value;
                                                setExternalUrls(updatedUrls);
                                                form.setValue("external_urls", updatedUrls);
                                            }}
                                        />
                                        <button type="button" onClick={() => removeExternalUrl(index)} className="ml-2">
                                            <Minus size={20} />
                                        </button>
                                    </div>
                                    {errors.external_urls && errors.external_urls[index] && (
                                        <span className="text-red-500 text-sm">{errors.external_urls[index].message}</span>
                                    )}
                                </div>
                            ))}
                            <Button type="button" onClick={addExternalUrl} className="text-xs w-fit" size="sm" variant={"outline"}>
                                Add External URL <Plus size={20} className="ml-2" />
                            </Button>
                        </div>

                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Write something amazing here..." className="resize-y" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card >
    );
}
