import axios from "axios";
export const http = axios.create({
    baseURL: "http://statamic-inertia.test/api/",
    headers: { Accept: "application/json" },
});

export default http;
