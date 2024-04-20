interface CategoryInterface {
    id: number,
    name: string,
    slug: string,
    children: CategoryInterface[]
}
interface CategorySingleInterface {
    category: CategoryInterface,
    top_articles: PostInterface[],
    articles: PostInterface[]
}