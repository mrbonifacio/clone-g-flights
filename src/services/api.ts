import axios from 'axios';

const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST;
const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

export const api = axios.create({
    baseURL: `https://${API_HOST}`,
    headers: {
        'X-RapidAPI-Host': API_HOST,
        'X-RapidAPI-Key': API_KEY,
    },
});
