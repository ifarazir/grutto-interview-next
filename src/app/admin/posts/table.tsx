import { deleteAdminPost, fetchAdminPosts, updateAdminPost } from "@/app/api/post/admin"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Toast } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Star, StarOff, Trash } from "lucide-react"
import { useSession } from "next-auth/react"
import { useQuery, useQueryClient } from "react-query"

export default function PostsTable() {
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const
        { data: authSession, status: authStatus }:
            {
                data: AuthSessionInterface | any,
                status: string
            }
            = useSession()


    const { status: queryStatus, data: posts, error: queryErrors } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => await fetchAdminPosts(authSession.token) as PostInterface[]
    })

    async function toggleFeatured(post: PostInterface) {
        const postResponse = await updateAdminPost({
            token: authSession.token,
            id: post.id,
            author_id: post.author.id,
            slug: post.slug,
            category_id: post.category.id,
            title: post.title,
            content: post.content,
            tags: post.tags.map(tag => tag.id),
            external_urls: post.external_urls,
            category_default: !post.category_default,
        });

        if (postResponse) {
            queryClient.invalidateQueries('posts');
        }
    }

    async function deletePost(post: PostInterface) {
        const postResponse = await deleteAdminPost({
            token: authSession.token,
            id: post.id,
        });

        if (postResponse) {
            toast({
                title: 'Success!',
                description: 'Post deleted successfully',
                variant: 'default'
            });
            
            queryClient.invalidateQueries('posts');

        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="min-w-fit">Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {posts && posts?.length > 0 && posts.map((post) => (
                    <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>{post.slug}</TableCell>
                        <TableCell>
                            {post.tags.map((tag) => (
                                <span key={tag.id} className="text-xs bg-gray-200 text-gray-600 rounded-full px-2 py-1 mr-1">{tag.name}</span>
                            ))}
                        </TableCell>
                        <TableCell>{post.category.name}</TableCell>
                        <TableCell>
                            {post.category_default ?
                                (<Star className="w-5 h-5 cursor-pointer text-yellow-600" onClick={() => toggleFeatured(post)} />) :
                                (<StarOff className="w-5 h-5 cursor-pointer text-gray-400" onClick={() => toggleFeatured(post)} />)
                            }
                        </TableCell>
                        <TableCell className="flex justify-end">
                            <Button variant="ghost" size={"icon"} onClick={() => deletePost(post)}>
                                <Trash className="w-5 h-5 cursor-pointer text-red-600" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}