import axios from "axios";

export async function fetchAdminTags(
    token: string
) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://laravel.grutto.test/api/v1/admin/tags',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    // response.data.tags

    return axios(config)
        .then(response => {
            return response.data.tags as TagInterface[];
        })
        .catch(error => {
            console.error(error);
        });

}


export async function storeAdminTag(
    {
        token,
        name
    }:
        {
            token: string,
            name: string
        }
) {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://laravel.grutto.test/api/v1/admin/tags',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        data: {
            name: name,
        }
    };

    return axios(config)
        .then(response => {
            return response.data?.tag as TagInterface;
        })
        .catch(error => {
            console.error(error);
        });
}
