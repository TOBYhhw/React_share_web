import axios from "axios";

export function myAxios(axiosConfig) {
    const service = axios.create({
        baseURL: "/api", // 设置统一的请求前缀
        timeout: 10000 // 设置统一的超时时长
    });

    return service(axiosConfig);
}

export function myAxios2(axiosConfig) {
    const service = axios.create({
        baseURL: "/api", // 设置统一的请求前缀
        timeout: 10000, // 设置统一的超时时长
        headers: {
            token: window.sessionStorage.getItem("token")
        }
    });

    return service(axiosConfig);
}


