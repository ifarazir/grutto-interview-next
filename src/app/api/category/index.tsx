import axios from "axios";

export async function fetchCategories() {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://laravel.grutto.test/api/v1/category',
        headers: {
            'Accept': 'application/json'
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

export async function fetchCategory(
    slug: string
) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://laravel.grutto.test/api/v1/category/' + slug,
        headers: {
            'Accept': 'application/json'
        }
    };

    // response.data.categories

    return axios(config)
        .then(response => {
            return response.data as CategorySingleInterface;
        })
        .catch(error => {
            console.error(error);
        });

}