import axios from "axios";

const instance = axios.create({
    baseURL: `https://${process.env.React_App_Server}/pst`,
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem("jwtoken");

    return config;
});

export default instance;
