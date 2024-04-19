import axios from "axios";

export async function fetchAdminCategories(
    token: string
) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://laravel.grutto.test/api/v1/admin/categories',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    // response.data.categories

    return axios(config)
        .then(response => {
            return response.data.categories as CategoryInterface[];
        })
        .catch(error => {
            console.error(error);
        });

}