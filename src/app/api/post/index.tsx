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