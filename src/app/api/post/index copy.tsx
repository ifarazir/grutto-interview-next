import axios from "axios";


export async function fetchPost(
    slug: string
) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://laravel.grutto.test/api/v1/article/' + slug,
        headers: {
            'Accept': 'application/json'
        }
    };

    // response.data.categories

    return axios(config)
        .then(response => {
            return response.data.article as PostInterface;
        })
        .catch(error => {
            console.error(error);
        });

}