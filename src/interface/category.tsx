interface CategoryInterface {
    id: number,
    name: string,
    slug: string,
    children: CategoryInterface[]
}