import { fetchAdminCategories } from "@/app/api/category/admin"
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

export default function CategoriesTable() {
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const
        { data: authSession, status: authStatus }:
            {
                data: AuthSessionInterface | any,
                status: string
            }
            = useSession()


    const { status: categoryStatus, data: categories, error: categoryErrors } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => await fetchAdminCategories(authSession.token) as CategoryInterface[],
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
                {categories && categories?.map((category) => (
                    <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.slug}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}