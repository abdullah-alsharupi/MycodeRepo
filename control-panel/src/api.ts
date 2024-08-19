import axios from "axios";
const url='http://localhost:8080/api';
export const apifetch=axios.create({
    baseURL:url
});