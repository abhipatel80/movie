import axios from 'axios';

const BASE_URL = "https://api.themoviedb.org/3"

const TOKEN = import.meta.env.VITE_APP_API_TOKEN;

const headers = {
    Authorization: "bearer " + TOKEN,
}

export const fetchData = async (url, params) => {
    try {
        const res = axios.get(BASE_URL + url, {
            headers,
            params
        })
        return res
    } catch (e) {
        console.log(e.message);
    }
}

