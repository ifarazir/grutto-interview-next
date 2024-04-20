// {
//     "id": 1,
//         "title": "some title",
//             "slug": "some-title",
//                 "content": "some content",
//                     "category_default": false,
//                         "external_urls": [
//                             "https://example.com/de/article/test"
//                         ],
//                             "author": {
//         "id": 1,
//             "name": "faraz sadri",
//                 "email": "ifarazir@gmail.com",
//                     "created_at": "2024-04-19T20:59:15.000000Z",
//                         "updated_at": "2024-04-19T20:59:15.000000Z"
//     },
//     "category": {
//         "id": 1,
//             "name": "tests1",
//                 "slug": "tests1",
//                     "parent_id": null,
//                         "created_at": "2024-04-19T21:03:37.000000Z"
//     },
//     "tags": [
//         {
//             "id": 1,
//             "name": "testsa",
//             "slug": "testsa",
//             "created_at": "2024-04-19T21:03:42.000000Z"
//         },
//         {
//             "id": 2,
//             "name": "tag2",
//             "slug": "tag2",
//             "created_at": "2024-04-20T06:28:14.000000Z"
//         }
//     ],
//         "created_at": "2024-04-20T06:54:20.000000Z"
// }

interface PostInterface {
    id: number,
    title: string,
    slug: string,
    content: string,
    category_default: boolean,
    external_urls: string[],
    category: CategoryInterface,
    tags: TagInterface[],
    author: AuthorInterface
}