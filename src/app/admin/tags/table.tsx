import { fetchAdminCategories } from "@/app/api/category/admin"
import { deleteAdminPost, fetchAdminPosts, updateAdminPost } from "@/app/api/post/admin"
import { fetchAdminTags } from "@/app/api/tag/admin"
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

export default function TagsTable() {
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const
        { data: authSession, status: authStatus }:
            {
                data: AuthSessionInterface | any,
                status: string
            }
            = useSession()


    const { status: tagStatus, data: tags, error: tagErrors } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => await fetchAdminTags(authSession.token) as TagInterface[],
    });

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="min-w-fit">Name</TableHead>
                    <TableHead>Slug</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tags && tags?.map((tag) => (
                    <TableRow key={tag.id}>
                        <TableCell className="font-medium">{tag.name}</TableCell>
                        <TableCell>{tag.slug}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}