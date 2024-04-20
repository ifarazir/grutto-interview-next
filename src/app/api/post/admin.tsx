import axios from "axios";

export async function fetchAdminPosts(
    token: string
) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://laravel.grutto.test/api/v1/admin/articles',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    // response.data.articles

    return axios(config)
        .then(response => {
            return response.data.articles;
        })
        .catch(error => {
            console.error(error);
        });

}

export async function storeAdminPost(
    token: string,
    category_id: number,
    title: string,
    content: string,
    tags: number[],
    external_urls: string[],
    category_default = false
) {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://laravel.grutto.test/api/v1/admin/articles',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        data: {
            category_id: category_id,
            category_default: category_default,
            title: title,
            content: content,
            tags: tags,
            external_urls: external_urls
        }
    };

    return axios(config)
        .then(response => {
            return response.data?.article;
        })
        .catch(error => {
            console.error(error);
        });
}


// curl--location--request PATCH 'http://laravel.grutto.test/api/v1/admin/articles/4' \
// --header 'Accept: application/json' \
// --header 'Content-Type: application/json' \
// --header 'Authorization: Bearer 4|M6Ylx3BSwPb785JAqrVtPK7T7wKUoKVC3vu9bMLjc09d5561' \
// --data '{
// "category_id": 5,
//     "title": "test title store article",
//         "slug": "slug-test123",
//             "content": "content test",
//                 "tags": [
//                     4,
//                     5
//                 ],
//                     "category_default": false
// }'

export async function updateAdminPost(
    {
        token,
        id,
        category_id,
        title,
        slug,
        content,
        tags,
        external_urls,
        category_default,
        author_id
    }: {
        token: string,
        id: number,
        category_id: number,
        title: string,
        slug: string,
        content: string,
        tags: number[],
        external_urls: string[],
        category_default: boolean,
        author_id: number
    }
) {
    let config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `http://laravel.grutto.test/api/v1/admin/articles/${id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        data: {
            category_id: category_id,
            title: title,
            slug: slug,
            content: content,
            tags: tags,
            external_urls: external_urls,
            category_default: category_default,
            author_id: author_id
        }
    };

    return axios(config)
        .then(response => {
            return response.data?.article;
        })
        .catch(error => {
            console.error(error);
        });
}

export async function deleteAdminPost(
    {
        token,
        id
    }: {
        token: string,
        id: number
    }
) {
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `http://laravel.grutto.test/api/v1/admin/articles/${id}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    return axios(config)
        .then(response => {
            return response.data?.article;
        })
        .catch(error => {
            console.error(error);
        });
}